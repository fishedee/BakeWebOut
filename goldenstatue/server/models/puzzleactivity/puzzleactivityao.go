package puzzleactivity

import (
	. "github.com/fishedee/language"
	. "goldenstatue/models/common"
	"time"
)

type PuzzleActivityAoModel struct {
	BaseModel
	PuzzleActivityDb          ContentPuzzleActivityDbModel
	PuzzleActivityComponentAo PuzzleActivityComponentAoModel
}

func (this *PuzzleActivityAoModel) Search(puzzleActivity ContentPuzzleActivity, page CommonPage) PuzzleActivitys {
	return this.PuzzleActivityDb.Search(puzzleActivity, page)
}

func (this *PuzzleActivityAoModel) Get(id int) ContentPuzzleActivity {
	return this.PuzzleActivityDb.Get(id)
}

func (this *PuzzleActivityAoModel) Add(puzzleActivity ContentPuzzleActivity) {
	this.checkInput(puzzleActivity)

	this.PuzzleActivityDb.Add(puzzleActivity)
}

func (this *PuzzleActivityAoModel) Mod(id int, puzzleActivity ContentPuzzleActivity) {
	this.checkInput(puzzleActivity)

	this.PuzzleActivityDb.Mod(id, puzzleActivity)
}

func (this *PuzzleActivityAoModel) Del(id int) {
	Throw(1, "删除活动十分危险，如需使用请联系开发人员")

	this.PuzzleActivityDb.Del(id)

	this.PuzzleActivityComponentAo.DelByContentId(id)
}

func (this *PuzzleActivityAoModel) SearchComponent(where ContentPuzzleActivityComponent, limit CommonPage) PuzzleActivityComponentWithClientInfos {
	return this.PuzzleActivityComponentAo.Search(where, limit)
}

func (this *PuzzleActivityAoModel) GetComponentAddress(componentId int) ContentPuzzleActivityComponentAddress {
	return this.PuzzleActivityComponentAo.GetAddress(componentId)
}

func (this *PuzzleActivityAoModel) SearchComponentPuzzle(where ContentPuzzleActivityComponentPuzzle, limit CommonPage) PuzzleActivityComponentPuzzleWithClientInfos {
	return this.PuzzleActivityComponentAo.SearchPuzzle(where, limit)
}

func (this *PuzzleActivityAoModel) GetComponentInfo(contentId int, clientId int, loginClientId int) PuzzleActivityComponentInfo {
	result := this.PuzzleActivityComponentAo.Get(contentId, clientId, loginClientId)

	result.Activity = this.Get(contentId)

	return result
}

func (this *PuzzleActivityAoModel) SetComponentTitle(contentId int, loginClientId int, titleId int) {
	this.checkJoinTime(contentId)

	this.PuzzleActivityComponentAo.SetTitle(contentId, loginClientId, titleId)
}

func (this *PuzzleActivityAoModel) AddComponentPuzzle(contentId int, clientId int, loginClientId int, inPuzzleId int) ContentPuzzleActivityComponentPuzzle {
	this.checkJoinTime(contentId)
	return this.PuzzleActivityComponentAo.AddPuzzle(contentId, clientId, loginClientId, inPuzzleId)
}

func (this *PuzzleActivityAoModel) SetComponentAddress(contentId int, clientId int, data ContentPuzzleActivityComponentAddress) {
	this.PuzzleActivityComponentAo.SetAddress(contentId, clientId, data)
}

func (this *PuzzleActivityAoModel) GetFinishComponent(contentId int, limit CommonPage) []ContentPuzzleActivityComponentWithClientInfo {
	return this.PuzzleActivityComponentAo.GetByFinish(contentId, limit)
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
