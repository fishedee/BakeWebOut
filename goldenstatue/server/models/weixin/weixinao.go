package weixin

import (
	//. "github.com/fishedee/web"
	. "github.com/fishedee/weixin"
	. "goldenstatue/models/config"
	//"time"
)

type WeixinAoModel struct {
	appId     string
	appSecret string
}

var WeixinAo = &WeixinAoModel{
	appId:     ConfigAo.Get("wxAppId"),
	appSecret: ConfigAo.Get("wxAppSecret"),
}

func (this *WeixinAoModel) GetJsConfig(url string) JsConfig {
	jsApiTicket := ConfigAo.Get("wxJsApiTicket")
	return JsSdk.GetJsConfig(this.appId, jsApiTicket, url)
}

func (this *WeixinAoModel) RefreshConfig() {
	accessToken := JsSdk.GetAccessToken(this.appId, this.appSecret)
	ConfigAo.Set("wxAccessToken", accessToken)
	jsTicket := JsSdk.GetJsApiTicket(accessToken)
	ConfigAo.Set("wxJsApiTicket", jsTicket)
}

func init() {
	/*
	StartTimerTask(time.Second*300, func() {
		WeixinAo.RefreshConfig()
	})
	*/
}
