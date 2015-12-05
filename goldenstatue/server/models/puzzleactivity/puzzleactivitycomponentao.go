package puzzleactivity

import (
	. "../client"
	. "../common"
	. "github.com/fishedee/language"
	"math/rand"
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

	//参赛信息
	componentInfo := PuzzleActivityComponentDb.GetByContentIdAndClientId(contentId, clientId)
	if len(componentInfo) == 0 {
		return result
	}
	componentId := componentInfo[0].ContentPuzzleActivityComponentId
	result.Component = componentInfo[0]

	//登录用户是否为参赛用户点亮
	var isPuzzle bool
	clientPuzzleInfo := PuzzleActivityComponentPuzzleDb.GetByComponentIdAndClientId(componentId, loginClientId)
	if len(clientPuzzleInfo) == 0 {
		isPuzzle = false
	} else {
		isPuzzle = true
	}
	result.IsPuzzle = isPuzzle

	//用户信息
	client := ClientAo.Get(clientId)
	result.ClientName = client.Name
	result.ClientImage = client.Image

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
	this.checkJoinClient(contentId, clientId)

	//参加
	puzzleActivityComponent := ContentPuzzleActivityComponent{
		ContentId: contentId,
		ClientId:  clientId,
		TitleId:   titleId,
		State:     PuzzleActivityComponentStateEnum.NO_BEGIN,
	}
	PuzzleActivityComponentDb.Add(puzzleActivityComponent)
}

func (this *PuzzleActivityComponentAoModel) checkJoinClient(contentId int, clientId int) {
	componentInfo := PuzzleActivityComponentDb.GetByContentIdAndClientId(contentId, clientId)
	if len(componentInfo) != 0 {
		Throw(1, "你已参加该活动！")
	}
}

func (this *PuzzleActivityComponentAoModel) AddPuzzle(contentId int, clientId int, loginClientId int) {
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
}

func (this *PuzzleActivityComponentAoModel) getComponent(contentId int, clientId int) ContentPuzzleActivityComponent {
	componentInfo := PuzzleActivityComponentDb.GetByContentIdAndClientId(contentId, clientId)
	if len(componentInfo) == 0 {
		panic("该用户未参加活动!")
	}
	return componentInfo[0]
}

func (this *PuzzleActivityComponentAoModel) makePuzzle() int {
	var result int
	num := rand.Intn(5)
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

func (this *PuzzleActivityComponentAoModel) checkFirstPuzzle(componentId int, puzzleId int) bool {
	puzzleInfo := PuzzleActivityComponentPuzzleDb.GetByComponentIdAndPuzzleId(componentId, puzzleId)
	if len(puzzleInfo) == 0 {
		return true
	}
	return false
}

func (this *PuzzleActivityComponentAoModel) checkFinish(componentId int) bool {
	successInfo := PuzzleActivityComponentPuzzleDb.GetSuccessByComponentId(componentId)
	if len(successInfo) == 5 {
		return true
	}
	return false
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
