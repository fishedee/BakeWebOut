package puzzleactivity

import (
	. "github.com/fishedee/web"
	"github.com/go-xorm/xorm"
	. "goldenstatue/models/common"
)

type ContentPuzzleActivityComponentPuzzleDbModel struct {
}

var PuzzleActivityComponentPuzzleDb = &ContentPuzzleActivityComponentPuzzleDbModel{}

func (this *ContentPuzzleActivityComponentPuzzleDbModel) Search(where ContentPuzzleActivityComponentPuzzle, limit CommonPage) PuzzleActivityComponentPuzzles {
	db := DB.NewSession()
	defer db.Close()

	if limit.PageSize == 0 && limit.PageIndex == 0 {
		return PuzzleActivityComponentPuzzles{
			Count: 0,
			Data:  []ContentPuzzleActivityComponentPuzzle{},
		}
	}

	if where.ContentPuzzleActivityComponentId != 0 {
		db = db.And("contentPuzzleActivityComponentId = ?", where.ContentPuzzleActivityComponentId)
	}
	if where.PuzzleClientId != 0 {
		db = db.And("puzzleClientId = ?", where.PuzzleClientId)
	}
	if where.PuzzleId != 0 {
		db = db.And("puzzleId = ?", where.PuzzleId)
	}
	if where.Type != 0 {
		db = db.And("type = ?", where.Type)
	}

	data := []ContentPuzzleActivityComponentPuzzle{}
	var err error
	err = db.OrderBy("createTime desc").Limit(limit.PageSize, limit.PageIndex).Find(&data)
	if err != nil {
		panic(err)
	}

	count, err := db.Count(&where)
	if err != nil {
		panic(err)
	}

	return PuzzleActivityComponentPuzzles{
		Data:  data,
		Count: int(count),
	}
}

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

func (this *ContentPuzzleActivityComponentPuzzleDbModel) GetByComponentId(componentId int) []ContentPuzzleActivityComponentPuzzle {
	var puzzleActivityComponentPuzzles []ContentPuzzleActivityComponentPuzzle
	err := DB.Where("contentPuzzleActivityComponentId=?", componentId).Find(&puzzleActivityComponentPuzzles)
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

func (this *ContentPuzzleActivityComponentPuzzleDbModel) GetByComponentIdForTrans(sess *xorm.Session, componentId int) []ContentPuzzleActivityComponentPuzzle {
	var puzzles []ContentPuzzleActivityComponentPuzzle
	err := sess.Where("contentPuzzleActivityComponentId = ?", componentId).Find(&puzzles)
	if err != nil {
		panic(err)
	}
	return puzzles
}

func (this *ContentPuzzleActivityComponentPuzzleDbModel) Add(data ContentPuzzleActivityComponentPuzzle) ContentPuzzleActivityComponentPuzzle {
	_, err := DB.Insert(&data)
	if err != nil {
		panic(err)
	}
	return data
}

func (this *ContentPuzzleActivityComponentPuzzleDbModel) AddForTrans(sess *xorm.Session, data ContentPuzzleActivityComponentPuzzle) ContentPuzzleActivityComponentPuzzle {
	_, err := sess.Insert(&data)
	if err != nil {
		panic(err)
	}
	return data
}
