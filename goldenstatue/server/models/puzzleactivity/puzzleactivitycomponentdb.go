package puzzleactivity

import (
	. "../common"
	. "github.com/fishedee/language"
	. "github.com/fishedee/web"
	"strconv"
)

type PuzzleActivityComponentDbModel struct {
}

var PuzzleActivityComponentDb = &PuzzleActivityComponentDbModel{}

func (this *PuzzleActivityComponentDbModel) Get(id int) ContentPuzzleActivityComponent {
	var puzzleActivityComponents []ContentPuzzleActivityComponent
	err := DB.Where("contentPuzzleActivityComponentId = ?", id).Find(&puzzleActivityComponents)
	if err != nil {
		panic(err)
	}
	if len(puzzleActivityComponents) == 0 {
		Throw(1, "不存在该数据"+strconv.Itoa(id))
	}
	return puzzleActivityComponents[0]
}

func (this *PuzzleActivityComponentDbModel) GetByContentIdAndClientId(contentId int, clientId int) []ContentPuzzleActivityComponent {
	var puzzleActivityComponents []ContentPuzzleActivityComponent
	err := DB.Where("contentId=? and clientId = ?", contentId, clientId).Find(&puzzleActivityComponents)
	if err != nil {
		panic(err)
	}
	return puzzleActivityComponents
}

func (this *PuzzleActivityComponentDbModel) GetFinishByContentId(contentId int, limit CommonPage) []ContentPuzzleActivityComponent {
	db := DB.NewSession()

	var puzzleActivityComponents []ContentPuzzleActivityComponent
	db = db.Where("contentId = ? and state = ? or state = ?", contentId, 3, 4)
	err := db.OrderBy("createTime desc").Limit(limit.PageSize, limit.PageIndex).Find(puzzleActivityComponents)
	if err != nil {
		panic(err)
	}
	return puzzleActivityComponents
}

func (this *PuzzleActivityComponentDbModel) Add(puzzleActivityComponent ContentPuzzleActivityComponent) {
	_, err := DB.Insert(&puzzleActivityComponent)
	if err != nil {
		panic(err)
	}
}

func (this *PuzzleActivityComponentDbModel) Mod(id int, puzzleActivityComponent ContentPuzzleActivityComponent) {
	_, err := DB.Where("contentPuzzleActivityComponentId=?", id).Update(&puzzleActivityComponent)
	if err != nil {
		panic(err)
	}
}
