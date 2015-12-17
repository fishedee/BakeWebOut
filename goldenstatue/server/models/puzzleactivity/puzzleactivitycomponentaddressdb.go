package puzzleactivity

import (
	. "github.com/fishedee/language"
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

func (this *PuzzleActivityComponentAddressDbModel) GetByComponentIds(componentIds []int) []ContentPuzzleActivityComponentAddress {
	if len(componentIds) == 0{
		return []ContentPuzzleActivityComponentAddress{}
	}
	var results []ContentPuzzleActivityComponentAddress
	err := DB.In("contentPuzzleActivityComponentId", componentIds).Find(&results)
	if err != nil {
		panic(err)
	}
	return results
}

func (this *PuzzleActivityComponentAddressDbModel) GetByComponentId(componentId int) ContentPuzzleActivityComponentAddress {
	var results []ContentPuzzleActivityComponentAddress
	err := DB.Where("contentPuzzleActivityComponentId = ?", componentId).Find(&results)
	if err != nil {
		panic(err)
	}
	if len(results) == 0 {
		Throw(1, "该用户未填写收货地址！")
	}
	return results[0]
}

func (this *PuzzleActivityComponentAddressDbModel) DelByComponentId(componentId int) {
	var address ContentPuzzleActivityComponentAddress
	_, err := DB.Where("contentPuzzleActivityComponentId = ?", componentId).Delete(&address)
	if err != nil {
		panic(err)
	}
}
