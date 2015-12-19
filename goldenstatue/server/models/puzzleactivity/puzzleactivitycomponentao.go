package puzzleactivity

import (
	. "github.com/fishedee/language"
	. "github.com/fishedee/web"
	"github.com/go-xorm/xorm"
	. "goldenstatue/models/client"
	. "goldenstatue/models/common"
	"math/rand"
	"strconv"
	"time"
)

type PuzzleActivityComponentAoModel struct {
}

var PuzzleActivityComponentAo = &PuzzleActivityComponentAoModel{}

func (this *PuzzleActivityComponentAoModel) Search(where ContentPuzzleActivityComponent, limit CommonPage) PuzzleActivityComponentWithClientInfos {
	data := PuzzleActivityComponentDb.Search(where, limit)

	//提取addressId
	componentIds := ArrayColumnKey(data.Data,"ContentPuzzleActivityComponentId").([]int)
	addresses := PuzzleActivityComponentAddressDb.GetByComponentIds(componentIds)
	mapIdToAddress := ArrayColumnMap(addresses,"ContentPuzzleActivityComponentId").(map[int]ContentPuzzleActivityComponentAddress)

	//提取clientId
	clientIds := ArrayColumnKey(data.Data,"ClientId").([]int)
	clients := ClientAo.GetByIds(clientIds)
	mapIdToClient := ArrayColumnMap(clients,"ClientId").(map[int]Client)
	
	//合并信息
	result := PuzzleActivityComponentWithClientInfos{}
	result.Count = data.Count
	for _, value := range data.Data {
		singleClient,_ := mapIdToClient[value.ClientId]
		address,_ := mapIdToAddress[value.ContentPuzzleActivityComponentId]
		result.Data = append(
			result.Data,
			ContentPuzzleActivityComponentWithClientInfo{
				address,
				value,
				address.ModifyTime,
				singleClient.Name,
				singleClient.Image,
			},
		)
	}
	return result
}

func (this *PuzzleActivityComponentAoModel) GetAddress(componentId int) ContentPuzzleActivityComponentAddress {
	return PuzzleActivityComponentAddressDb.GetByComponentId(componentId)
}

func (this *PuzzleActivityComponentAoModel) SearchPuzzle(where ContentPuzzleActivityComponentPuzzle, limit CommonPage) PuzzleActivityComponentPuzzleWithClientInfos {
	result := PuzzleActivityComponentPuzzleWithClientInfos{}
	data := PuzzleActivityComponentPuzzleDb.Search(where, limit)
	result.Count = data.Count
	for _, value := range data.Data {
		singleClient := ClientAo.Get(value.PuzzleClientId)
		result.Data = append(
			result.Data,
			ContentPuzzleActivityComponentPuzzleWithClientInfo{
				value,
				singleClient.Name,
				singleClient.Image,
			},
		)
	}

	return result
}

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
	allPuzzleWithClientInfo := []PuzzleActivityComponentPuzzleWithClientInfo{}
	allPuzzle := PuzzleActivityComponentPuzzleDb.GetByComponentId(componentId)
	for _, value := range allPuzzle {
		singleClient := ClientAo.Get(value.PuzzleClientId)
		allPuzzleWithClientInfo = append(
			allPuzzleWithClientInfo,
			PuzzleActivityComponentPuzzleWithClientInfo{
				value,
				singleClient.Name,
				singleClient.Image,
			},
		)
		//设置已读
		if clientId == loginClientId {
			this.setPuzzleHaveRead(value.ContentPuzzleActivityComponentPuzzleId)
		}
	}
	result.AllPuzzle = allPuzzleWithClientInfo

	return result
}

func (this *PuzzleActivityComponentAoModel) setPuzzleHaveRead(componentPuzzleId int) {
	puzzle := ContentPuzzleActivityComponentPuzzle{
		IsRead: PuzzleActivityComponentPuzzleStateEnum.HAVE_READ,
	}
	PuzzleActivityComponentPuzzleDb.Mod(componentPuzzleId, puzzle)
}

func (this *PuzzleActivityComponentAoModel) SetTitle(contentId int, clientId int, titleId int) {
	//检查是否已参加
	componentInfo := this.getComponent(contentId, clientId)
	componentId := componentInfo.ContentPuzzleActivityComponentId
	if componentInfo.State != PuzzleActivityComponentStateEnum.WALK {
		Throw(1, "你已设置了头衔！")
	}

	//参加
	puzzleActivityComponent := ContentPuzzleActivityComponent{
		TitleId: titleId,
		State:   PuzzleActivityComponentStateEnum.NO_BEGIN,
	}
	PuzzleActivityComponentDb.Mod(componentId, puzzleActivityComponent)
}

func (this *PuzzleActivityComponentAoModel) AddPuzzle(contentId int, clientId int, loginClientId int, inPuzzleId int) ContentPuzzleActivityComponentPuzzle {
	sess := DB.NewSession()
	defer sess.Close()
	sess.Begin()

	//检查状态
	componentInfo := this.getComponentState(sess, contentId, clientId)

	state := componentInfo.State
	if clientId != loginClientId {
		if state != PuzzleActivityComponentStateEnum.HAVE_BEGIN {
			Throw(1, "用户尚未开始！")
		}
	} else {
		if state != PuzzleActivityComponentStateEnum.NO_BEGIN {
			Throw(1, "你已为自己点亮过了！")
		}
	}

	//检查是否已点亮
	componentId := componentInfo.ContentPuzzleActivityComponentId
	puzzles := this.getComponentPuzzle(sess, componentId)
	puzzleIds := []int{}
	isPuzzle := false
	isSuccessPuzzle := false
	for _, value := range puzzles {
		if value.Type == PuzzleActivityComponentPuzzleEnum.SUCCESS {
			if value.PuzzleId == inPuzzleId {
				isSuccessPuzzle = true
			}
			puzzleIds = append(
				puzzleIds,
				value.PuzzleId,
			)
		}
		if value.PuzzleClientId == loginClientId {
			isPuzzle = true
		}
	}
	if isPuzzle == true {
		Throw(1, "你已为TA点亮过了！")
	}

	puzzleId, isSuccess := this.makePuzzle(clientId,loginClientId,puzzleIds)
	if inPuzzleId != 0 &&
		isSuccessPuzzle != true &&
		isSuccess == PuzzleActivityComponentPuzzleEnum.SUCCESS {
		puzzleId = inPuzzleId
	}
	data := ContentPuzzleActivityComponentPuzzle{
		ContentPuzzleActivityComponentId: componentId,
		PuzzleClientId:                   loginClientId,
		PuzzleId:                         puzzleId,
		Type:                             isSuccess,
		IsRead:                           PuzzleActivityComponentPuzzleStateEnum.NO_READ,
	}
	result := PuzzleActivityComponentPuzzleDb.AddForTrans(sess, data)

	//扭转状态
	if len(puzzles) == 0 {
		state = PuzzleActivityComponentStateEnum.HAVE_BEGIN
		this.setComponentState(sess, componentId, state)
	} else if len(puzzleIds) == 5 && isSuccess == PuzzleActivityComponentPuzzleEnum.SUCCESS {
		state = PuzzleActivityComponentStateEnum.FINISH_NO_ADDRESS
		this.setComponentState(sess, componentId, state)
	}

	sess.Commit()
	return result
}

func (this *PuzzleActivityComponentAoModel) setComponentState(sess *xorm.Session, componentId int, state int) {
	PuzzleActivityComponentDb.SetStateForTrans(sess, componentId, state)
}

func (this *PuzzleActivityComponentAoModel) getComponentPuzzle(sess *xorm.Session, componentId int) []ContentPuzzleActivityComponentPuzzle {
	return PuzzleActivityComponentPuzzleDb.GetByComponentIdForTrans(sess, componentId)
}

func (this *PuzzleActivityComponentAoModel) getRate(num int) float64 {
	var result float64
	switch num {
	case 1:
		result = 1
	case 2:
		result = 0.8
	case 3:
		result = 0.7
	case 4:
		result = 0.6
	case 5:
		result = 0.5
	case 6:
		result = 0.4
	}
	return result
}

func (this *PuzzleActivityComponentAoModel) makePuzzle(clientId int,loginClientId int,puzzleIds []int) (int, int) {
	var result int
	isSuccess := PuzzleActivityComponentPuzzleEnum.FAIL
	failPuzzleIds := []int{}
	allPuzzles := []int{1, 2, 3, 4, 5, 6}

	successNum := len(puzzleIds)
	for i := 0; i < 6; i++ {
		isFail := false
		for j := 0; j < successNum; j++ {
			if puzzleIds[j] == allPuzzles[i] {
				isFail = true
			}
		}
		if isFail == false {
			failPuzzleIds = append(
				failPuzzleIds,
				allPuzzles[i],
			)
		}
	}

	nextRate := this.getRate(successNum + 1)
	var rate float64

	if clientId != loginClientId {
		if PuzzleActivityComponentPuzzleDb.GetCountByClientIdAndType(loginClientId,PuzzleActivityComponentPuzzleEnum.SUCCESS) >= 4{
			//整场活动中点亮超过5次就不能再点亮了
			rate = 1.0
		}else{
			//否则，按照随机数点亮
			rate = rand.Float64()
		}
	}
	
	num := 0
	if rate <= nextRate {
		num = rand.Intn(len(failPuzzleIds))
		result = failPuzzleIds[num]
		isSuccess = PuzzleActivityComponentPuzzleEnum.SUCCESS
	} else {
		num = rand.Intn(len(puzzleIds))
		result = puzzleIds[num]
		isSuccess = PuzzleActivityComponentPuzzleEnum.FAIL
	}
	return result, isSuccess
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
		Throw(1, "该用户未参加活动!"+strconv.Itoa(clientId))
	}
	return componentInfo[0]
}

func (this *PuzzleActivityComponentAoModel) getComponentState(sess *xorm.Session, contentId int, clientId int) ContentPuzzleActivityComponent {
	componentInfo := PuzzleActivityComponentDb.GetByContentIdAndClientIdForTrans(sess, contentId, clientId)
	if len(componentInfo) == 0 {
		Throw(1, "该用户未参加活动！")
	}
	return componentInfo[0]
}

func (this *PuzzleActivityComponentAoModel) SetAddress(contentId int, clientId int, data ContentPuzzleActivityComponentAddress) {
	//参赛作品信息
	componentInfo := this.getComponent(contentId, clientId)
	componentId := componentInfo.ContentPuzzleActivityComponentId

	//检查是否已完成
	if componentInfo.State != PuzzleActivityComponentStateEnum.FINISH_NO_ADDRESS {
		Throw(1, "你尚未收集完6块材料，请继续加油哦～～")
	}

	//添加地址信息
	data.ContentPuzzleActivityComponentId = componentId
	PuzzleActivityComponentAddressDb.Add(data)
}

func (this *PuzzleActivityComponentAoModel) GetByFinish(contentId int, limit CommonPage) []ContentPuzzleActivityComponentWithClientInfo {
	result := []ContentPuzzleActivityComponentWithClientInfo{}
	data := PuzzleActivityComponentDb.GetFinishByContentId(contentId, limit)
	for _, value := range data {
		singleClient := ClientAo.Get(value.ClientId)
		result = append(
			result,
			ContentPuzzleActivityComponentWithClientInfo{
				ContentPuzzleActivityComponentAddress{},
				value,
				time.Time{},
				singleClient.Name,
				singleClient.Image,
			},
		)
	}
	return result
}

func (this *PuzzleActivityComponentAoModel) DelByContentId(contentId int) {
	components := PuzzleActivityComponentDb.GetByContentId(contentId)
	PuzzleActivityComponentDb.DelByContentId(contentId)

	for _, value := range components {
		PuzzleActivityComponentPuzzleDb.DelByComponentId(value.ContentPuzzleActivityComponentId)
		PuzzleActivityComponentAddressDb.DelByComponentId(value.ContentPuzzleActivityComponentId)
	}
}
