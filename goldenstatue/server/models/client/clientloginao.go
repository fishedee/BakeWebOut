package client

import (
	"github.com/astaxie/beego/context"
	. "github.com/fishedee/language"
	. "github.com/fishedee/web"
)

type ClientLoginAoModel struct {
}

var ClientLoginAo = &ClientLoginAoModel{}

func (this *ClientLoginAoModel) Login(context *context.Context, clientId int) {
	sess, err := Session.SessionStart(context.ResponseWriter, context.Request)
	if err != nil {
		panic("session启动失败！")
	}
	defer sess.SessionRelease(context.ResponseWriter)

	ClientAo.Get(clientId)
	sess.Set("clientId", clientId)
}

func (this *ClientLoginAoModel) Logout(context *context.Context) {
	sess, err := Session.SessionStart(context.ResponseWriter, context.Request)
	if err != nil {
		panic("session启动失败！")
	}
	defer sess.SessionRelease(context.ResponseWriter)

	sess.Set("clientId", 0)
}

func (this *ClientLoginAoModel) CheckMustLogin(context *context.Context) Client {
	client := this.IsLogin(context)
	if client.ClientId == 0 {
		Throw(1, "用户未登录！")
	}
	return client
}

func (this *ClientLoginAoModel) IsLogin(context *context.Context) Client {
	sess, err := Session.SessionStart(context.ResponseWriter, context.Request)
	if err != nil {
		panic("session启动失败")
	}
	defer sess.SessionRelease(context.ResponseWriter)

	clientId := sess.Get("clientId")
	clientIdInt, ok := clientId.(int)
	if ok && clientIdInt >= 10000 {
		return ClientAo.Get(clientIdInt)
	} else {
		return Client{}
	}
}
