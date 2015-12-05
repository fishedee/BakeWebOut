package puzzleactivity

import (
	//. "github.com/fishedee/language"
	. "github.com/fishedee/web"
)

type ContentPuzzleActivityComponentPuzzleDbModel struct {
}

var PuzzleActivityComponentPuzzleDb = &ContentPuzzleActivityComponentPuzzleDbModel{}

func (this *ContentPuzzleActivityComponentPuzzleDbModel) GetByComponentIdAndClientId(componentId int, clientId int) []ContentPuzzleActivityComponentPuzzle {
	var puzzleActivityComponentPuzzles []ContentPuzzleActivityComponentPuzzle
	err := DB.Where("contentPuzzleActivityComponentId =? and puzzleClientId =?", componentId, clientId).Find(&puzzleActivityComponentPuzzles)
	if err != nil {
		panic(err)
	}
	return puzzleActivityComponentPuzzles
}

func (this *ContentPuzzleActivityComponentPuzzleDbModel) GetSuccessByComponentId(componentId int) []ContentPuzzleActivityComponentPuzzle {
	var puzzleActivityComponentPuzzles []ContentPuzzleActivityComponentPuzzle
	err := DB.Where("contentPuzzleActivityComponentId =? and type = ?", componentId, 1).Find(&puzzleActivityComponentPuzzles)
	if err != nil {
		panic(err)
	}
	return puzzleActivityComponentPuzzles
}

func (this *ContentPuzzleActivityComponentPuzzleDbModel) GetByComponentIdWithoutClientId(componentId int, clientId int) []ContentPuzzleActivityComponentPuzzle {
	var puzzleActivityComponentPuzzles []ContentPuzzleActivityComponentPuzzle
	err := DB.Where("contentPuzzleActivityComponentId=? and puzzleClientId != ?", componentId, clientId).Find(&puzzleActivityComponentPuzzles)
	if err != nil {
		panic(err)
	}
	return puzzleActivityComponentPuzzles
}

func (this *ContentPuzzleActivityComponentPuzzleDbModel) GetByComponentIdAndPuzzleId(componentId int, puzzleId int) []ContentPuzzleActivityComponentPuzzle {
	var puzzleActivityComponentPuzzles []ContentPuzzleActivityComponentPuzzle
	err := DB.Where("contentPuzzleActivityComponentId=? and puzzleId=?", componentId, puzzleId).Find(&puzzleActivityComponentPuzzles)
	if err != nil {
		panic(err)
	}
	return puzzleActivityComponentPuzzles
}

func (this *ContentPuzzleActivityComponentPuzzleDbModel) Add(data ContentPuzzleActivityComponentPuzzle, isFinish bool) {
	db := DB.NewSession()
	defer db.Close()

	db.Begin()
	_, err := db.Insert(&data)
	if err != nil {
		db.Rollback()
		panic(err)
	}

	if data.Type == 1 && isFinish == true {
		component := ContentPuzzleActivityComponent{
			State: PuzzleActivityComponentStateEnum.FINISH_NO_ADDRESS,
		}
		_, err := db.Where("contentPuzzleActivityComponentId =?", data.ContentPuzzleActivityComponentId).Update(&component)
		if err != nil {
			db.Rollback()
			panic(err)
		}
		err = db.Commit()
		if err != nil {
			panic(err)
		}
	} else {
		component := ContentPuzzleActivityComponent{
			State: PuzzleActivityComponentStateEnum.HAVE_BEGIN,
		}
		_, err := db.Where("contentPuzzleActivityComponentId =?", data.ContentPuzzleActivityComponentId).Update(&component)
		if err != nil {
			db.Rollback()
			panic(err)
		}
		err = db.Commit()
		if err != nil {
			panic(err)
		}
	}
}
