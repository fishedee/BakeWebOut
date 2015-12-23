package client

import (
	. "goldenstatue/models/common"
	. "github.com/fishedee/language"
)

type ClientLoginAoModel struct {
	BaseModel
	ClientAo ClientAoModel
}

func (this *ClientLoginAoModel) Login(clientId int) {
	sess, err := this.Session.SessionStart(this.Ctx.ResponseWriter, this.Ctx.Request)
	if err != nil {
		panic("session启动失败！")
	}
	defer sess.SessionRelease(this.Ctx.ResponseWriter)

	this.ClientAo.Get(clientId)
	sess.Set("clientId", clientId)
}

func (this *ClientLoginAoModel) Logout() {
	sess, err := this.Session.SessionStart(this.Ctx.ResponseWriter, this.Ctx.Request)
	if err != nil {
		panic("session启动失败！")
	}
	defer sess.SessionRelease(this.Ctx.ResponseWriter)

	sess.Set("clientId", 0)
}

func (this *ClientLoginAoModel) CheckMustLogin() Client {
	client := this.IsLogin()
	if client.ClientId == 0 {
		Throw(1, "用户未登录！")
	}
	return client
}

func (this *ClientLoginAoModel) IsLogin() Client {
	sess, err := this.Session.SessionStart(this.Ctx.ResponseWriter, this.Ctx.Request)
	if err != nil {
		panic("session启动失败")
	}
	defer sess.SessionRelease(this.Ctx.ResponseWriter)

	clientId := sess.Get("clientId")
	clientIdInt, ok := clientId.(int)
	if ok && clientIdInt >= 10000 {
		return this.ClientAo.Get(clientIdInt)
	} else {
		return Client{}
	}
}
