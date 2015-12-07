package controllers

import (
	. "goldenstatue/models/client"
	. "goldenstatue/models/common"
	. "goldenstatue/models/user"
)

type ClientController struct {
	BaseController
}

func (this *ClientController) Search_Json() interface{} {
	//检查参数
	var where Client
	this.CheckGet(&where)

	var limit CommonPage
	this.CheckGet(&limit)

	//检查权限
	UserLoginAo.CheckMustLogin(this.Ctx)

	//业务逻辑
	return ClientAo.Search(where,limit)
}

func (this *ClientController) IsLogin_Json() interface{} {
	client := ClientLoginAo.IsLogin(this.Ctx)
	if client.ClientId != 0 {
		return client
	} else {
		return nil
	}
}

func (this *ClientController) TestLogin_Json() {
	//检查输入
	var client Client
	this.CheckGet(&client)

	//登录
	ClientLoginAo.Login(this.Ctx, client.ClientId)
}

func (this *ClientController) LoginCallback_Redirect()(interface{}){
	return ClientWxLoginAo.LoginCallback(this.Ctx)
}

func (this *ClientController) Login_Json()(interface{}){
	var callback struct{
		Callback string
	}
	this.CheckGet(&callback)

	return ClientWxLoginAo.Login(this.Ctx,callback.Callback)
}

func (this *ClientController) CheckHasPhone_Json()(interface{}){
	//检查登陆态
	clientInfo := ClientLoginAo.CheckMustLogin(this.Ctx)

	//业务逻辑
	return ClientWxLoginAo.CheckHasPhoneNumber(clientInfo.ClientId)
}

func (this *ClientController) GetPhoneCaptcha_Json(){
	//检查输入
	var phoneInfo struct{
		Phone string
	}
	this.CheckPost(&phoneInfo)

	//检查登陆态
	ClientLoginAo.CheckMustLogin(this.Ctx)

	//业务逻辑
	ClientWxLoginAo.GetPhoneCaptcha(phoneInfo.Phone)
}

func (this *ClientController) RegisterPhone_Json(){
	//检查输入
	var phoneInfo struct{
		Phone string
		Captcha string
	}
	this.CheckPost(&phoneInfo)

	//检查登陆态
	clientInfo := ClientLoginAo.CheckMustLogin(this.Ctx)

	//业务逻辑
	ClientWxLoginAo.RegisterPhoneNumber(clientInfo.ClientId,phoneInfo.Phone,phoneInfo.Captcha)
}
