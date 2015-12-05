package puzzleactivity

import (
	. "github.com/fishedee/web"
)

type PuzzleActivityComponentAddressDbModel struct {
}

var PuzzleActivityComponentAddressDb = &PuzzleActivityComponentAddressDbModel{}

func (this *PuzzleActivityComponentAddressDbModel) Add(data ContentPuzzleActivityComponentAddress) {
	db := DB.NewSession()
	defer db.Close()

	db.Begin()
	_, err := db.Insert(&data)
	if err != nil {
		db.Rollback()
		panic(err)
	}

	component := ContentPuzzleActivityComponent{
		State: PuzzleActivityComponentStateEnum.FINISH_HAS_ADDRESS,
	}
	_, err = db.Where("contentPuzzleActivityComponentId = ?", data.ContentPuzzleActivityComponentId).Update(&component)
	if err != nil {
		db.Rollback()
		panic(err)
	}
	err = db.Commit()
	if err != nil {
		panic(err)
	}
}
