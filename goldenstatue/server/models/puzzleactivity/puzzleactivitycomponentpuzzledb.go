package puzzleactivity

import (
	//. "github.com/fishedee/language"
	. "github.com/fishedee/web"
	. "goldenstatue/models/common"
	"strconv"
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

func (this *ContentPuzzleActivityComponentPuzzleDbModel) Add(data ContentPuzzleActivityComponentPuzzle) ContentPuzzleActivityComponentPuzzle {
	db := DB.NewSession()
	defer db.Close()

	db.Begin()
	componentId := data.ContentPuzzleActivityComponentId
	puzzleId := data.PuzzleId

	//判断是否是第一块材料
	var isSuccess int
	oneSql := "select * from t_content_puzzle_activity_component_puzzle where contentPuzzleActivityComponentId = " + strconv.Itoa(componentId) + " for update "
	results, err := db.Query(oneSql)
	if err != nil {
		db.Rollback()
		panic(err)
	}
	if len(results) == 0 {
		component := ContentPuzzleActivityComponent{
			State: PuzzleActivityComponentStateEnum.HAVE_BEGIN,
		}
		_, err := db.Where("contentPuzzleActivityComponentId =?", data.ContentPuzzleActivityComponentId).Update(&component)
		if err != nil {
			db.Rollback()
			panic(err)
		}
		isSuccess = PuzzleActivityComponentPuzzleEnum.SUCCESS
	} else {
		//判断是否已有该材料
		firstSql := "select * from t_content_puzzle_activity_component_puzzle where contentPuzzleActivityComponentId = " + strconv.Itoa(componentId) + " and puzzleId = " + strconv.Itoa(puzzleId) + " for update "
		results, err = db.Query(firstSql)
		if err != nil {
			db.Rollback()
			panic(err)
		}
		if len(results) != 0 {
			isSuccess = PuzzleActivityComponentPuzzleEnum.FAIL
		} else {
			isSuccess = PuzzleActivityComponentPuzzleEnum.SUCCESS
		}
	}
	data.Type = isSuccess

	//插入该材料记录
	_, err = db.Insert(&data)
	if err != nil {
		db.Rollback()
		panic(err)
	}

	if data.Type == PuzzleActivityComponentPuzzleEnum.SUCCESS {
		//判断是否已收集齐全
		finishSql := "select * from t_content_puzzle_activity_component_puzzle where contentPuzzleActivityComponentId = " + strconv.Itoa(componentId) + " and type = " + strconv.Itoa(PuzzleActivityComponentPuzzleEnum.SUCCESS) + " for update"
		results, err = db.Query(finishSql)
		if err != nil {
			db.Rollback()
			panic(err)
		}
		if len(results) == 6 {
			component := ContentPuzzleActivityComponent{
				State: PuzzleActivityComponentStateEnum.FINISH_NO_ADDRESS,
			}
			_, err := db.Where("contentPuzzleActivityComponentId =?", data.ContentPuzzleActivityComponentId).Update(&component)
			if err != nil {
				db.Rollback()
				panic(err)
			}
		}
	}
	err = db.Commit()
	if err != nil {
		panic(err)
	}
	return data
}
