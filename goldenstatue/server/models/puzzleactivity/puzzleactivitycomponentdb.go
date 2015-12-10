package puzzleactivity

import (
	. "github.com/fishedee/language"
	. "github.com/fishedee/web"
	"github.com/go-xorm/xorm"
	. "goldenstatue/models/common"
	"strconv"
)

type PuzzleActivityComponentDbModel struct {
}

var PuzzleActivityComponentDb = &PuzzleActivityComponentDbModel{}

func (this *PuzzleActivityComponentDbModel) Search(where ContentPuzzleActivityComponent, limit CommonPage) PuzzleActivityComponents {
	db := DB.NewSession()
	defer db.Close()

	if limit.PageSize == 0 && limit.PageIndex == 0 {
		return PuzzleActivityComponents{
			Count: 0,
			Data:  []ContentPuzzleActivityComponent{},
		}
	}

	if where.ContentId != 0 {
		db = db.And("contentId = ?", where.ContentId)
	}
	if where.ClientId != 0 {
		db = db.And("clientId = ?", where.ClientId)
	}
	if where.TitleId != 0 {
		db = db.And("titleId = ?", where.TitleId)
	}
	if where.State != 0 {
		db = db.And("state = ?", where.State)
	}

	data := []ContentPuzzleActivityComponent{}
	var err error
	err = db.OrderBy("createTime desc").Limit(limit.PageSize, limit.PageIndex).Find(&data)
	if err != nil {
		panic(err)
	}

	count, err := db.Count(&where)
	if err != nil {
		panic(err)
	}

	return PuzzleActivityComponents{
		Data:  data,
		Count: int(count),
	}
}

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
	db = db.Where("contentId = ? and (state = ?  or state = ?)", contentId, PuzzleActivityComponentStateEnum.FINISH_NO_ADDRESS, PuzzleActivityComponentStateEnum.FINISH_HAS_ADDRESS)
	err := db.OrderBy("createTime desc").Limit(limit.PageSize, limit.PageIndex).Find(&puzzleActivityComponents)
	if err != nil {
		panic(err)
	}
	return puzzleActivityComponents
}

func (this *PuzzleActivityComponentDbModel) Add(puzzleActivityComponent ContentPuzzleActivityComponent) ContentPuzzleActivityComponent {
	_, err := DB.Insert(&puzzleActivityComponent)
	if err != nil {
		panic(err)
	}
	return puzzleActivityComponent
}

func (this *PuzzleActivityComponentDbModel) Mod(id int, puzzleActivityComponent ContentPuzzleActivityComponent) {
	_, err := DB.Where("contentPuzzleActivityComponentId=?", id).Update(&puzzleActivityComponent)
	if err != nil {
		panic(err)
	}
}

func (this *PuzzleActivityComponentDbModel) GetByContentIdAndClientIdForTrans(sess *xorm.Session, contentId int, clientId int) []ContentPuzzleActivityComponent {
	result := []ContentPuzzleActivityComponent{}
	err := sess.Sql("select * from t_content_puzzle_activity_component where contentId = ? and clientId = ? for update", contentId, clientId).Find(&result)
	if err != nil {
		panic(err)
	}
	return result
}

func (this *PuzzleActivityComponentDbModel) SetStateForTrans(sess *xorm.Session, componentId int, state int) {
	data := ContentPuzzleActivityComponent{
		State: state,
	}
	_, err := sess.Where("contentPuzzleActivityComponentId=?", componentId).Update(&data)
	if err != nil {
		panic(err)
	}
}

func (this *PuzzleActivityComponentDbModel) DelByContentId(contentId int) {
	var component ContentPuzzleActivityComponent
	_, err := DB.Where("contentId = ?", contentId).Delete(&component)
	if err != nil {
		panic(err)
	}
}

func (this *PuzzleActivityComponentDbModel) GetByContentId(contentId int) []ContentPuzzleActivityComponent {
	var components []ContentPuzzleActivityComponent
	err := DB.Where("contentId = ?", contentId).Find(&components)
	if err != nil {
		panic(err)
	}
	return components
}
