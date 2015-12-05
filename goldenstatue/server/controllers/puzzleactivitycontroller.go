package controllers

import (
	. "../models/client"
	. "../models/common"
	. "../models/puzzleactivity"
	. "../models/user"
)

type PuzzleActivityController struct {
	BaseController
}

//搜索所有活动
func (this *PuzzleActivityController) Search_Json() PuzzleActivitys {
	//检查输入
	where := ContentPuzzleActivity{}
	this.CheckGet(&where)

	limit := CommonPage{}
	this.CheckGet(&limit)

	//检查权限
	UserLoginAo.CheckMustLogin(this.Ctx)

	//业务逻辑
	return PuzzleActivityAo.Search(where, limit)
}

func (this *PuzzleActivityController) Get_Json() ContentPuzzleActivity {
	//检查输入
	var data struct {
		ContentId int
	}
	this.CheckGet(&data)

	//检查权限
	UserLoginAo.CheckMustLogin(this.Ctx)

	//业务逻辑
	return PuzzleActivityAo.Get(data.ContentId)
}

func (this *PuzzleActivityController) Add_Json() {
	//检查输入
	puzzleActivity := ContentPuzzleActivity{}
	this.CheckPost(&puzzleActivity)

	//检查权限
	UserLoginAo.CheckMustLogin(this.Ctx)

	//业务逻辑
	PuzzleActivityAo.Add(puzzleActivity)
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
	UserLoginAo.CheckMustLogin(this.Ctx)

	//业务逻辑
	PuzzleActivityAo.Mod(data.ContentId, puzzleActivity)
}

func (this *PuzzleActivityController) Del_Json() {
	//检查输入
	var data struct {
		ContentId int
	}
	this.CheckPost(&data)

	//检查权限
	UserLoginAo.CheckMustLogin(this.Ctx)

	//业务逻辑
	PuzzleActivityAo.Del(data.ContentId)
}

//获得指定用户参赛信息
func (this *PuzzleActivityController) GetComponentInfo_Json() PuzzleActivityComponentInfo {
	//检查输入
	var where struct {
		ContentId int
		ClientId  int
	}
	this.CheckGet(&where)

	//检查权限
	client := ClientLoginAo.CheckMustLogin(this.Ctx)

	//业务逻辑
	clientId := where.ClientId
	contentId := where.ContentId
	// fix me
	clientId = 10001
	contentId = 10001
	return PuzzleActivityAo.GetComponentInfo(contentId, clientId, client.ClientId)
}

//参与活动并设置头衔
func (this *PuzzleActivityController) SetComponentTitle_Json() {
	//检查输入
	where := ContentPuzzleActivityComponent{}
	this.CheckGet(&where)

	//检查权限
	client := ClientLoginAo.CheckMustLogin(this.Ctx)

	//业务逻辑
	PuzzleActivityAo.SetComponentTitle(where.ContentId, client.ClientId, where.TitleId)
}

//获得一块材料
func (this *PuzzleActivityController) AddComponentPuzzle_Json() {
	//检查输入
	var where struct {
		ContentId int
		ClientId  int
	}
	this.CheckGet(&where)

	//检查权限
	client := ClientLoginAo.CheckMustLogin(this.Ctx)

	//业务逻辑
	PuzzleActivityAo.AddComponentPuzzle(where.ContentId, where.ClientId, client.ClientId)
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
	client := ClientLoginAo.CheckMustLogin(this.Ctx)

	//业务逻辑
	PuzzleActivityAo.SetComponentAddress(where.ContentId, client.ClientId, address)
}

//获得活动获奖名单
func (this *PuzzleActivityController) GetFinishComponent_Json() []ContentPuzzleActivityComponent {
	//检查输入
	var where struct {
		ContentId int
	}
	this.CheckGet(&where)

	limit := CommonPage{}
	this.CheckGet(&limit)

	//检查权限
	ClientLoginAo.CheckMustLogin(this.Ctx)

	//业务逻辑
	return PuzzleActivityAo.GetFinishComponent(where.ContentId, limit)
}
