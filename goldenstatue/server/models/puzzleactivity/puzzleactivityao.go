package puzzleactivity

import (
	. "github.com/fishedee/language"
	. "goldenstatue/models/common"
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
	Throw(1, "删除活动十分危险，如需使用请联系开发人员")

	PuzzleActivityDb.Del(id)

	PuzzleActivityComponentAo.DelByContentId(id)
}

func (this *PuzzleActivityAoModel) SearchComponent(where ContentPuzzleActivityComponent, limit CommonPage) PuzzleActivityComponentWithClientInfos {
	return PuzzleActivityComponentAo.Search(where, limit)
}

func (this *PuzzleActivityAoModel) GetComponentAddress(componentId int) ContentPuzzleActivityComponentAddress {
	return PuzzleActivityComponentAo.GetAddress(componentId)
}

func (this *PuzzleActivityAoModel) SearchComponentPuzzle(where ContentPuzzleActivityComponentPuzzle, limit CommonPage) PuzzleActivityComponentPuzzleWithClientInfos {
	return PuzzleActivityComponentAo.SearchPuzzle(where, limit)
}

func (this *PuzzleActivityAoModel) GetComponentInfo(contentId int, clientId int, loginClientId int) PuzzleActivityComponentInfo {
	return PuzzleActivityComponentAo.Get(contentId, clientId, loginClientId)
}

func (this *PuzzleActivityAoModel) SetComponentTitle(contentId int, loginClientId int, titleId int) {
	this.checkJoinTime(contentId)

	PuzzleActivityComponentAo.SetTitle(contentId, loginClientId, titleId)
}

func (this *PuzzleActivityAoModel) AddComponentPuzzle(contentId int, clientId int, loginClientId int, inPuzzleId int) ContentPuzzleActivityComponentPuzzle {
	this.checkJoinTime(contentId)
	return PuzzleActivityComponentAo.AddPuzzle(contentId, clientId, loginClientId, inPuzzleId)
}

func (this *PuzzleActivityAoModel) SetComponentAddress(contentId int, clientId int, data ContentPuzzleActivityComponentAddress) {
	PuzzleActivityComponentAo.SetAddress(contentId, clientId, data)
}

func (this *PuzzleActivityAoModel) GetFinishComponent(contentId int, limit CommonPage) []ContentPuzzleActivityComponentWithClientInfo {
	return PuzzleActivityComponentAo.GetByFinish(contentId, limit)
}

func (this *PuzzleActivityAoModel) checkJoinTime(contentId int) {
	activity := this.Get(contentId)
	if activity.BeginTime.IsZero() ||
		activity.BeginTime.IsZero() {
		return
	}
	now := time.Now()

	if now.Before(activity.BeginTime) {
		Throw(1, "活动未开始！")
	}
	if now.After(activity.EndTime) {
		Throw(1, "活动已结束！")
	}
}

func (this *PuzzleActivityAoModel) checkInput(data ContentPuzzleActivity) {
	if data.Title == "" {
		Throw(1, "标题不能为空！")
	}
}
