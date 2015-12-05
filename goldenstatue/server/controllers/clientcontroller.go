package controllers

import (
	. "goldenstatue/models/client"
)

type ClientController struct {
	BaseController
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
