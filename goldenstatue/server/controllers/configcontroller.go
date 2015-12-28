package controllers

import (
	. "goldenstatue/models/common"
	. "goldenstatue/models/config"
	. "goldenstatue/models/user"
)

type ConfigController struct {
	BaseController
	UserLoginAo UserLoginAoModel
	ConfigAo    ConfigAoModel
}

func (this *ConfigController) Search_Json() interface{} {
	//检查输入
	var where Config
	this.CheckGet(&where)

	var limit CommonPage
	this.CheckGet(&limit)

	//校验权限
	this.UserLoginAo.CheckMustLogin()

	//业务逻辑
	return this.ConfigAo.Search(where, limit)
}

func (this *ConfigController) Get_Json() interface{} {
	//检查输入
	var config Config
	this.CheckGet(&config)

	//校验权限
	this.UserLoginAo.CheckMustLogin()

	//业务逻辑
	return this.ConfigAo.Get(config.Name)
}

func (this *ConfigController) Set_Json() {
	//检查输入
	var config Config
	this.CheckPost(&config)

	//校验权限
	this.UserLoginAo.CheckMustLogin()

	//业务逻辑
	this.ConfigAo.Set(config.Name, config.Value)
}
