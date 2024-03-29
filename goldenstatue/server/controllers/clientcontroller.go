package controllers

import (
	. "goldenstatue/models/client"
	. "goldenstatue/models/common"
	. "goldenstatue/models/user"
)

type ClientController struct {
	BaseController
	UserLoginAo     UserLoginAoModel
	ClientLoginAo   ClientLoginAoModel
	ClientWxLoginAo ClientWxLoginAoModel
	ClientAo        ClientAoModel
}

func (this *ClientController) Search_Json() interface{} {
	//检查参数
	var where Client
	this.CheckGet(&where)

	var limit CommonPage
	this.CheckGet(&limit)

	//检查权限
	this.UserLoginAo.CheckMustLogin()

	//业务逻辑
	return this.ClientAo.Search(where, limit)
}

func (this *ClientController) IsLogin_Json() interface{} {
	client := this.ClientLoginAo.IsLogin()
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
	this.ClientLoginAo.Login(client.ClientId)
}

func (this *ClientController) LoginCallback_Redirect() interface{} {
	return this.ClientWxLoginAo.LoginCallback()
}

func (this *ClientController) Login_Json() interface{} {
	var callback struct {
		Callback string
	}
	this.CheckGet(&callback)

	return this.ClientWxLoginAo.Login(callback.Callback)
}

func (this *ClientController) Logout_Json() {
	this.ClientLoginAo.Logout()
}

func (this *ClientController) CheckHasPhone_Json() interface{} {
	//检查登陆态
	clientInfo := this.ClientLoginAo.CheckMustLogin()

	//业务逻辑
	return this.ClientWxLoginAo.CheckHasPhoneNumber(clientInfo.ClientId)
}

func (this *ClientController) GetPhoneCaptcha_Json() {
	//检查输入
	var phoneInfo struct {
		Phone string
	}
	this.CheckPost(&phoneInfo)

	//检查登陆态
	this.ClientLoginAo.CheckMustLogin()

	//业务逻辑
	this.ClientWxLoginAo.GetPhoneCaptcha(phoneInfo.Phone)
}

func (this *ClientController) RegisterPhone_Json() {
	//检查输入
	var phoneInfo struct {
		Phone   string
		Captcha string
	}
	this.CheckPost(&phoneInfo)

	//检查登陆态
	clientInfo := this.ClientLoginAo.CheckMustLogin()

	//业务逻辑
	this.ClientWxLoginAo.RegisterPhoneNumber(clientInfo.ClientId, phoneInfo.Phone, phoneInfo.Captcha)
}
