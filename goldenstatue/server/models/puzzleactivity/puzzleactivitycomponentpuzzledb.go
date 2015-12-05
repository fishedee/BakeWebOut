package puzzleactivity

import (
	//. "github.com/fishedee/language"
	. "github.com/fishedee/web"
	"math/rand"
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

func (this *ContentPuzzleActivityComponentPuzzleDbModel) Add(data ContentPuzzleActivityComponentPuzzle) ContentPuzzleActivityComponentPuzzle {
	db := DB.NewSession()
	defer db.Close()

	db.Begin()
	data.PuzzleId = this.makePuzzle()

	_, err := db.Insert(&data)
	if err != nil {
		db.Rollback()
		panic(err)
	}

	if data.Type == 1 {
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
	return data
}

func (this *ContentPuzzleActivityComponentPuzzleDbModel) makePuzzle() int {
	var result int
	num := rand.Intn(6)
	switch num {
	case 0:
		result = 1
	case 1:
		result = 2
	case 2:
		result = 3
	case 3:
		result = 4
	case 4:
		result = 5
	case 5:
		result = 6
	}
	return result
}

/*
	//生成拼图
	puzzleId := this.makePuzzle()

	//检查拼图是否已存在
	var valid int
	isFirst := this.checkFirstPuzzle(componentId, puzzleId)
	if isFirst == true {
		valid = PuzzleActivityComponentPuzzleEnum.SUCCESS
	} else {
		valid = PuzzleActivityComponentPuzzleEnum.FAIL
	}

	//检查是否已完成, 完成则切换状态
	isFinish := false
	if valid == PuzzleActivityComponentPuzzleEnum.SUCCESS {
		isFinish = this.checkFinish(componentId)
	}

	//记录拼图
	data := ContentPuzzleActivityComponentPuzzle{
		ContentPuzzleActivityComponentId: componentId,
		PuzzleClientId:                   loginClientId,
		PuzzleId:                         puzzleId,
		Type:                             valid,
	}
	PuzzleActivityComponentPuzzleDb.Add(data, isFinish)




func (this *ContentPuzzleActivityComponentPuzzleDbModel) checkFirstPuzzle(componentId int, puzzleId int) bool {
	puzzleInfo := PuzzleActivityComponentPuzzleDb.GetByComponentIdAndPuzzleId(componentId, puzzleId)
	if len(puzzleInfo) == 0 {
		return true
	}
	return false
}

func (this *ContentPuzzleActivityComponentPuzzleDbModel) checkFinish(componentId int) bool {
	successInfo := PuzzleActivityComponentPuzzleDb.GetSuccessByComponentId(componentId)
	if len(successInfo) == 5 {
		return true
	}
	return false
}
*/
