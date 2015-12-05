package puzzleactivity

import (
	. "../common"
	. "github.com/fishedee/language"
	"time"
)

type PuzzleActivityAoModel struct {
}

var PuzzleActivityAo = &PuzzleActivityAoModel{}

func (this *PuzzleActivityAoModel) Search(puzzleActivity ContentPuzzleActivity, page CommonPage) PuzzleActivitys {
	return PuzzleActivityDb.Search(puzzleActivity, page)
}

func (this *PuzzleActivityAoModel) Get(id int) ContentPuzzleActivity {
	return PuzzleActivityDb.Get(id)
}

func (this *PuzzleActivityAoModel) Add(puzzleActivity ContentPuzzleActivity) {
	this.checkInput(puzzleActivity)

	PuzzleActivityDb.Add(puzzleActivity)
}

func (this *PuzzleActivityAoModel) Mod(id int, puzzleActivity ContentPuzzleActivity) {
	this.checkInput(puzzleActivity)

	PuzzleActivityDb.Mod(id, puzzleActivity)
}

func (this *PuzzleActivityAoModel) Del(id int) {
	PuzzleActivityDb.Del(id)
	//Throw(1, "u can not delete the activity now! ")
}

func (this *PuzzleActivityAoModel) GetComponentInfo(contentId int, clientId int, loginClientId int) PuzzleActivityComponentInfo {
	return PuzzleActivityComponentAo.Get(contentId, clientId, loginClientId)
}

func (this *PuzzleActivityAoModel) SetComponentTitle(contentId int, loginClientId int, titleId int) {
	this.checkJoinTime(contentId)

	PuzzleActivityComponentAo.SetTitle(contentId, loginClientId, titleId)
}

func (this *PuzzleActivityAoModel) AddComponentPuzzle(contentId int, clientId int, loginClientId int) {
	this.checkJoinTime(contentId)

	PuzzleActivityComponentAo.AddPuzzle(contentId, clientId, loginClientId)
}

func (this *PuzzleActivityAoModel) SetComponentAddress(contentId int, clientId int, data ContentPuzzleActivityComponentAddress) {
	PuzzleActivityComponentAo.SetAddress(contentId, clientId, data)
}

func (this *PuzzleActivityAoModel) GetFinishComponent(contentId int, limit CommonPage) []ContentPuzzleActivityComponent {
	return PuzzleActivityComponentAo.GetByFinish(contentId, limit)
}

func (this *PuzzleActivityAoModel) checkJoinTime(contentId int) {
	activity := this.Get(contentId)
	t := time.Now().Unix()
	beginTime, err := time.Parse("2015-01-01 00:00:00", activity.BeginTime)
	if err != nil {
		panic(err)
	}
	endTime, err := time.Parse("2015-01-01 00:00:00", activity.EndTime)
	if err != nil {
		panic(err)
	}
	if beginTime.Unix() > t {
		Throw(1, "活动未开始！")
	}
	if endTime.Unix() < t {
		Throw(1, "活动已结束！")
	}
}

func (this *PuzzleActivityAoModel) checkInput(data ContentPuzzleActivity) {
	if data.Title == "" {
		Throw(1, "标题不能为空！")
	}
}
