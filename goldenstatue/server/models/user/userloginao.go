package user

import (
	"github.com/astaxie/beego/context"
	. "github.com/fishedee/language"
	. "github.com/fishedee/web"
)

type UserLoginAoModel struct {
}

var UserLoginAo UserLoginAoModel

func (this *UserLoginAoModel) IsLogin(context *context.Context) User {
	sess, err := Session.SessionStart(context.ResponseWriter, context.Request)
	if err != nil {
		panic("session启动失败")
	}
	defer sess.SessionRelease(context.ResponseWriter)

	userId := sess.Get("userId")
	userIdInt, ok := userId.(int)
	if ok && userIdInt >= 1000 {
		return UserAo.Get(userIdInt)
	} else {
		return User{}
	}
}

func (this *UserLoginAoModel) CheckMustLogin(context *context.Context) User {
	user := this.IsLogin(context)
	if user.UserId == 0 {
		Throw(1, "用户未登录")
	}
	return user
}
