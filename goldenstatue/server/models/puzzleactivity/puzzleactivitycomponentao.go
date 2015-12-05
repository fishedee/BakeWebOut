package puzzleactivity

import (
	. "github.com/fishedee/language"
	. "goldenstatue/models/client"
	. "goldenstatue/models/common"
)

type PuzzleActivityComponentAoModel struct {
}

type PuzzleActivityComponentInfo struct {
	Component   ContentPuzzleActivityComponent
	IsPuzzle    bool
	ClientImage string
	ClientName  string
	Puzzle      [6]bool
	AllPuzzle   []PuzzleActivityComponentPuzzleWithClientInfo
}

type PuzzleActivityComponentPuzzleWithClientInfo struct {
	ContentPuzzleActivityComponentPuzzle
	ClientName  string
	ClientImage string
}

var PuzzleActivityComponentAo = &PuzzleActivityComponentAoModel{}

func (this *PuzzleActivityComponentAoModel) Get(contentId int, clientId int, loginClientId int) PuzzleActivityComponentInfo {
	result := PuzzleActivityComponentInfo{}

	//用户信息
	client := ClientAo.Get(clientId)
	result.ClientName = client.Name
	result.ClientImage = client.Image

	//参赛信息
	componentInfo := PuzzleActivityComponentDb.GetByContentIdAndClientId(contentId, clientId)
	if len(componentInfo) == 0 {
		data := ContentPuzzleActivityComponent{
			ContentId: contentId,
			ClientId:  clientId,
			TitleId:   0,
			State:     PuzzleActivityComponentStateEnum.WALK,
		}
		data = PuzzleActivityComponentDb.Add(data)
		result.Component = data
		result.IsPuzzle = false
		return result
	}
	componentId := componentInfo[0].ContentPuzzleActivityComponentId
	result.Component = componentInfo[0]

	//登录用户是否为参赛用户点亮
	isPuzzle := this.checkPuzzle(componentId, loginClientId)
	result.IsPuzzle = isPuzzle

	//参赛者已成功获得的材料
	var puzzle [6]bool
	successPuzzleInfo := PuzzleActivityComponentPuzzleDb.GetSuccessByComponentId(componentId)
	for _, value := range successPuzzleInfo {
		switch value.PuzzleId {
		case 1:
			puzzle[0] = true
		case 2:
			puzzle[1] = true
		case 3:
			puzzle[2] = true
		case 4:
			puzzle[3] = true
		case 5:
			puzzle[4] = true
		case 6:
			puzzle[5] = true
		}
	}
	result.Puzzle = puzzle

	//参赛者到目前为止所有点亮记录
	var allPuzzleWithClientInfo []PuzzleActivityComponentPuzzleWithClientInfo
	allPuzzle := PuzzleActivityComponentPuzzleDb.GetByComponentIdWithoutClientId(componentId, clientId)
	for key, value := range allPuzzle {
		singleClient := ClientAo.Get(value.PuzzleClientId)
		allPuzzleWithClientInfo[key] = PuzzleActivityComponentPuzzleWithClientInfo{
			ContentPuzzleActivityComponentPuzzle: value,
			ClientName:                           singleClient.Name,
			ClientImage:                          singleClient.Image,
		}
	}
	result.AllPuzzle = allPuzzleWithClientInfo

	return result
}

func (this *PuzzleActivityComponentAoModel) SetTitle(contentId int, clientId int, titleId int) {
	//检查是否已参加
	componentInfo := PuzzleActivityComponentDb.GetByContentIdAndClientId(contentId, clientId)
	if len(componentInfo) == 0 {
		Throw(1, "该用户未参与活动")
	}
	singleComponentInfo := componentInfo[0]
	componentId := singleComponentInfo.ContentPuzzleActivityComponentId

	//参加
	puzzleActivityComponent := ContentPuzzleActivityComponent{
		TitleId: titleId,
		State:   PuzzleActivityComponentStateEnum.NO_BEGIN,
	}
	PuzzleActivityComponentDb.Mod(componentId, puzzleActivityComponent)
}

func (this *PuzzleActivityComponentAoModel) AddPuzzle(contentId int, clientId int, loginClientId int) ContentPuzzleActivityComponentPuzzle {
	//检查状态
	componentInfo := this.getComponent(contentId, clientId)
	componentId := componentInfo.ContentPuzzleActivityComponentId
	state := componentInfo.State

	if clientId != loginClientId {
		if state != PuzzleActivityComponentStateEnum.HAVE_BEGIN {
			Throw(1, "现在不能为该用户点亮！")
		}
	} else {
		if state != PuzzleActivityComponentStateEnum.NO_BEGIN {
			Throw(1, "你已为自己点亮过了！")
		}
	}

	//检查是否已点亮
	isPuzzle := this.checkPuzzle(componentId, loginClientId)
	if isPuzzle == true {
		Throw(1, "你已为该用户点亮过了！")
	}

	data := ContentPuzzleActivityComponentPuzzle{
		ContentPuzzleActivityComponentId: componentId,
		PuzzleClientId:                   loginClientId,
	}
	return PuzzleActivityComponentPuzzleDb.Add(data)
}

func (this *PuzzleActivityComponentAoModel) checkPuzzle(componentId int, clientId int) bool {
	data := PuzzleActivityComponentPuzzleDb.GetByComponentIdAndClientId(componentId, clientId)
	if len(data) != 0 {
		return true
	}
	return false
}

func (this *PuzzleActivityComponentAoModel) getComponent(contentId int, clientId int) ContentPuzzleActivityComponent {
	componentInfo := PuzzleActivityComponentDb.GetByContentIdAndClientId(contentId, clientId)
	if len(componentInfo) == 0 {
		panic("该用户未参加活动!")
	}
	return componentInfo[0]
}

func (this *PuzzleActivityComponentAoModel) SetAddress(contentId int, clientId int, data ContentPuzzleActivityComponentAddress) {
	//参赛作品信息
	componentInfo := this.getComponent(contentId, clientId)
	componentId := componentInfo.ContentPuzzleActivityComponentId

	//检查是否已完成
	if componentInfo.State != PuzzleActivityComponentStateEnum.FINISH_NO_ADDRESS {
		Throw(1, "尚未收集完6块材料，请继续加油哦～～")
	}

	//添加地址信息
	data.ContentPuzzleActivityComponentId = componentId
	PuzzleActivityComponentAddressDb.Add(data)
}

func (this *PuzzleActivityComponentAoModel) GetByFinish(contentId int, limit CommonPage) []ContentPuzzleActivityComponent {
	var result []ContentPuzzleActivityComponent
	result = PuzzleActivityComponentDb.GetFinishByContentId(contentId, limit)
	return result
}
