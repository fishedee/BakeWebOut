package controllers

import (
	. "goldenstatue/models/client"
	. "goldenstatue/models/common"
	. "goldenstatue/models/puzzleactivity"
	. "goldenstatue/models/user"
)

type PuzzleActivityController struct {
	BaseController
	UserLoginAo UserLoginAoModel
	ClientLoginAo ClientLoginAoModel
	ClientWxLoginAo ClientWxLoginAoModel
	PuzzleActivityAo PuzzleActivityAoModel
}

//搜索所有活动
func (this *PuzzleActivityController) Search_Json() PuzzleActivitys {
	//检查输入
	where := ContentPuzzleActivity{}
	this.CheckGet(&where)

	limit := CommonPage{}
	this.CheckGet(&limit)

	//检查权限
	this.UserLoginAo.CheckMustLogin()

	//业务逻辑
	return this.PuzzleActivityAo.Search(where, limit)
}

func (this *PuzzleActivityController) Get_Json() ContentPuzzleActivity {
	//检查输入
	var data struct {
		ContentId int
	}
	this.CheckGet(&data)

	//检查权限
	this.UserLoginAo.CheckMustLogin()

	//业务逻辑
	return this.PuzzleActivityAo.Get(data.ContentId)
}

func (this *PuzzleActivityController) Add_Json() {
	//检查输入
	puzzleActivity := ContentPuzzleActivity{}
	this.CheckPost(&puzzleActivity)

	//检查权限
	this.UserLoginAo.CheckMustLogin()

	//业务逻辑
	this.PuzzleActivityAo.Add(puzzleActivity)
}

func (this *PuzzleActivityController) Mod_Json() {
	//检查输入
	var data struct {
		ContentId int
	}
	this.CheckPost(&data)
	puzzleActivity := ContentPuzzleActivity{}
	this.CheckPost(&puzzleActivity)

	//检查权限
	this.UserLoginAo.CheckMustLogin()

	//业务逻辑
	this.PuzzleActivityAo.Mod(data.ContentId, puzzleActivity)
}

func (this *PuzzleActivityController) Del_Json() {
	//检查输入
	var data struct {
		ContentId int
	}
	this.CheckPost(&data)

	//检查权限
	this.UserLoginAo.CheckMustLogin()

	//业务逻辑
	this.PuzzleActivityAo.Del(data.ContentId)
}

func (this *PuzzleActivityController) SearchComponent_Json() PuzzleActivityComponentWithClientInfos {
	//检查输入
	where := ContentPuzzleActivityComponent{}
	this.CheckGet(&where)

	limit := CommonPage{}
	this.CheckGet(&limit)

	//检查权限
	this.UserLoginAo.CheckMustLogin()

	//业务逻辑
	return this.PuzzleActivityAo.SearchComponent(where, limit)
}

func (this *PuzzleActivityController) GetComponentAddress_Json() ContentPuzzleActivityComponentAddress {
	//检查输入
	where := ContentPuzzleActivityComponentAddress{}
	this.CheckGet(&where)

	//检查权限
	this.UserLoginAo.CheckMustLogin()

	//业务逻辑
	return this.PuzzleActivityAo.GetComponentAddress(where.ContentPuzzleActivityComponentId)
}

func (this *PuzzleActivityController) SearchComponentPuzzle_Json() PuzzleActivityComponentPuzzleWithClientInfos {
	//检查输入
	where := ContentPuzzleActivityComponentPuzzle{}
	this.CheckGet(&where)

	limit := CommonPage{}
	this.CheckGet(&limit)

	//检查权限
	this.UserLoginAo.CheckMustLogin()

	//业务逻辑
	return this.PuzzleActivityAo.SearchComponentPuzzle(where, limit)
}

func (this *PuzzleActivityController) GetTitles_Json() interface{} {
	return PuzzleActivityTitleEnum.Names()
}

func (this *PuzzleActivityController) GetStates_Json() interface{} {
	return PuzzleActivityComponentStateEnum.Names()
}

func (this *PuzzleActivityController) GetTypes_Json() interface{} {
	return PuzzleActivityComponentPuzzleEnum.Names()
}

func (this *PuzzleActivityController) GetPuzzles_Json() interface{} {
	return PuzzleActivityPuzzleEnum.Names()
}

//获得指定用户参赛信息
func (this *PuzzleActivityController) GetComponentInfo_Json() interface{} {
	//检查输入
	var where struct {
		ContentId int
		ClientId  int
	}
	this.CheckGet(&where)

	//检查权限
	client := this.ClientLoginAo.CheckMustLogin()

	//业务逻辑
	clientId := where.ClientId
	contentId := where.ContentId

	isLoginClient := false
	if clientId == client.ClientId {
		isLoginClient = true
	}
	puzzleActivityComponentInfo := this.PuzzleActivityAo.GetComponentInfo(contentId, clientId, client.ClientId)
	puzzleActivityComponentInfo.IsLoginClient = isLoginClient

	return puzzleActivityComponentInfo
}

//参与活动并设置头衔
func (this *PuzzleActivityController) SetComponentTitle_Json() {
	//检查输入
	where := ContentPuzzleActivityComponent{}
	this.CheckPost(&where)

	//检查权限
	client := this.ClientLoginAo.CheckMustLogin()

	//业务逻辑
	this.PuzzleActivityAo.SetComponentTitle(where.ContentId, client.ClientId, where.TitleId)
}

//获得一块材料
func (this *PuzzleActivityController) AddComponentPuzzle_Json() ContentPuzzleActivityComponentPuzzle {
	//检查输入
	var where struct {
		ContentId int
		ClientId  int
		PuzzleId  int
	}
	this.CheckPost(&where)

	//检查权限
	client := this.ClientLoginAo.CheckMustLogin()

	this.ClientWxLoginAo.CheckMustHasPhone(client.ClientId)

	//业务逻辑
	return this.PuzzleActivityAo.AddComponentPuzzle(where.ContentId, where.ClientId, client.ClientId, where.PuzzleId)
}

//记录收获信息
func (this *PuzzleActivityController) SetComponentAddress_Json() {
	//检查输入
	var where struct {
		ContentId int
	}
	this.CheckPost(&where)
	address := ContentPuzzleActivityComponentAddress{}
	this.CheckPost(&address)

	//检查权限
	client := this.ClientLoginAo.CheckMustLogin()

	//业务逻辑
	this.PuzzleActivityAo.SetComponentAddress(where.ContentId, client.ClientId, address)

	this.ClientWxLoginAo.AddAddress(client.ClientId,ClientAddress{
		Name:address.Name,
		Address:address.Address,
		Phone:address.Phone,
	})
}

//获得活动获奖名单
func (this *PuzzleActivityController) GetFinishComponent_Json() []ContentPuzzleActivityComponentWithClientInfo {
	//检查输入
	var where struct {
		ContentId int
	}
	this.CheckGet(&where)

	limit := CommonPage{}
	this.CheckGet(&limit)

	//检查权限
	this.ClientLoginAo.CheckMustLogin()

	//业务逻辑
	return this.PuzzleActivityAo.GetFinishComponent(where.ContentId, limit)
}
