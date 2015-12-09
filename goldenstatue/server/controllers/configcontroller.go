package controllers

import (
	. "goldenstatue/models/config"
	. "goldenstatue/models/common"
	. "goldenstatue/models/user"
)

type ConfigController struct {
	BaseController
}

func (this *ConfigController) Search_Json() (interface{}) {
	//检查输入
	var where Config
	this.CheckGet(&where)

	var limit CommonPage
	this.CheckGet(&limit)

	//校验权限
	UserLoginAo.CheckMustLogin(this.Ctx)

	//业务逻辑
	return ConfigAo.Search(where,limit)
}

func (this *ConfigController) Get_Json() (interface{}) {
	//检查输入
	var config Config
	this.CheckGet(&config)

	//校验权限
	UserLoginAo.CheckMustLogin(this.Ctx)

	//业务逻辑
	return ConfigAo.Get(config.Name)
}

func (this *ConfigController) Set_Json(){
	//检查输入
	var config Config
	this.CheckPost(&config)

	//校验权限
	UserLoginAo.CheckMustLogin(this.Ctx)

	//业务逻辑
	ConfigAo.Set(config.Name,config.Value)
}