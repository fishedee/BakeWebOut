package controllers

import (
	. "goldenstatue/models/weixin"
)

type WeixinController struct {
	BaseController
}

func (this *WeixinController) GetJsConfig_Json() interface{} {
	//检查输入
	var Data struct {
		Url string
	}
	this.CheckGet(&Data)

	//业务逻辑
	return WeixinAo.GetJsConfig(Data.Url)
}
