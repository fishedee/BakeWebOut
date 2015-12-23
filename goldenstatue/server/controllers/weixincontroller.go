package controllers

import (
	. "goldenstatue/models/weixin"
)

type WeixinController struct {
	BaseController
	WeixinAo WeixinAoModel
}

/*
func (this *WeixinController) GetJsConfig_Json() interface{} {
	//检查输入
	var Data struct {
		Url string
	}
	this.CheckGet(&Data)

	//业务逻辑
	return this.WeixinAo.GetJsConfig(Data.Url)
}

func (this *WeixinController) Refresh_Json() {
	this.WeixinAo.RefreshConfig()
}
*/

func (this *WeixinController) Test_Json()(interface{}){
	return "Hello World"
}