package client

import (
	"github.com/astaxie/beego/context"
)

type ClientLoginAoModel struct {
}

var ClientLoginAo = &ClientLoginAoModel{}

func (this *ClientLoginAoModel) Login(clientId int) {

}

func (this *ClientLoginAoModel) Logout() {

}

func (this *ClientLoginAoModel) CheckMustLogin(context *context.Context) Client {
	return Client{
		ClientId: 10001,
		Name:     "fish",
		Image:    "",
		OpenId:   "",
	}
}

func (this *ClientLoginAoModel) IsLogin(context *context.Context) Client {
	return Client{
		ClientId: 10001,
		Name:     "fish",
		Image:    "",
		OpenId:   "",
	}
}
