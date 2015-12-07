package controllers

import (
	"github.com/astaxie/beego"
	. "github.com/fishedee/encoding"
	. "github.com/fishedee/language"
	. "github.com/fishedee/web"
)

type BaseController struct {
	BeegoValidateController
}

func InitRoute(namespace string, target beego.ControllerInterface) {
	InitBeegoVaildateControllerRoute(namespace, target)
}

type baseControllerResult struct {
	Code int
	Data interface{}
	Msg  string
}

func (this *BaseController) AutoRender(returnValue interface{}, viewname string) {
	result := baseControllerResult{}
	resultError, ok := returnValue.(Exception)
	if ok {
		//带错误码的error
		result.Code = resultError.GetCode()
		result.Msg = resultError.GetMessage()
		result.Data = nil
	} else {
		//正常返回
		result.Code = 0
		result.Data = returnValue
		result.Msg = ""
	}
	this.Ctx.Output.Header("Access-Control-Allow-Origin", this.Ctx.Input.Header("Origin"))
	this.Ctx.Output.Header("Access-Control-Allow-Credentials", "true")
	if viewname == "json" {
		resultString, err := EncodeJson(result)
		if err != nil {
			panic(err)
		}
		this.Ctx.WriteString(string(resultString))
	} else if viewname == "redirect" {
		//FIXME 没有做更多的容错尝试
		if result.Code == 0 {
			url := result.Data.(string)
			this.Ctx.Redirect(302,url)
		} else {
			this.Ctx.WriteString("跳转不成功 " + result.Msg)
		}
	} else {
		panic("不合法的viewName " + viewname)
	}
}
