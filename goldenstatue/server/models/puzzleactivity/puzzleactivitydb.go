package puzzleactivity

import (
	. "github.com/fishedee/language"
	. "github.com/fishedee/web"
	. "goldenstatue/models/common"
	"strconv"
)

type ContentPuzzleActivityDbModel struct {
}

var PuzzleActivityDb = &ContentPuzzleActivityDbModel{}

func (this *ContentPuzzleActivityDbModel) Search(puzzleActivity ContentPuzzleActivity, limit CommonPage) PuzzleActivitys {
	db := DB.NewSession()
	defer db.Close()

	if limit.PageSize == 0 && limit.PageIndex == 0 {
		return PuzzleActivitys{
			Count: 0,
			Data:  []ContentPuzzleActivity{},
		}
	}

	if puzzleActivity.Title != "" {
		db = db.And("title like ?", "%"+puzzleActivity.Title+"%")
	}
	if puzzleActivity.BeginTime.IsZero() == false {
		db = db.And("beginTime >= ?", puzzleActivity.BeginTime)
	}
	if puzzleActivity.EndTime.IsZero() == false {
		db = db.And("endTime <= ?", puzzleActivity.EndTime)
	}

	data := []ContentPuzzleActivity{}
	var err error
	err = db.OrderBy("createTime desc").Limit(limit.PageSize, limit.PageIndex).Find(&data)
	if err != nil {
		panic(err)
	}

	count, err := db.Count(&puzzleActivity)
	if err != nil {
		panic(err)
	}

	return PuzzleActivitys{
		Data:  data,
		Count: int(count),
	}
}

func (this *ContentPuzzleActivityDbModel) Get(id int) ContentPuzzleActivity {
	var puzzleActivitys []ContentPuzzleActivity
	err := DB.Where("contentId = ?", id).Find(&puzzleActivitys)
	if err != nil {
		panic(err)
	}
	if len(puzzleActivitys) == 0 {
		Throw(1, "不存在该数据"+strconv.Itoa(id))
	}
	return puzzleActivitys[0]
}

func (this *ContentPuzzleActivityDbModel) Add(puzzleActivity ContentPuzzleActivity) {
	_, err := DB.Insert(&puzzleActivity)
	if err != nil {
		panic(err)
	}
}

func (this *ContentPuzzleActivityDbModel) Mod(id int, puzzleActivity ContentPuzzleActivity) {
	_, err := DB.Where("contentId=?", id).Update(&puzzleActivity)
	if err != nil {
		panic(err)
	}
}

func (this *ContentPuzzleActivityDbModel) Del(id int) {
	var puzzleActivity ContentPuzzleActivity
	_, err := DB.Where("contentId = ?", id).Delete(&puzzleActivity)
	if err != nil {
		panic(err)
	}
}
