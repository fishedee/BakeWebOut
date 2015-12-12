package weixin

import (
	. "github.com/fishedee/web"
	. "github.com/fishedee/sdk"
	. "goldenstatue/models/config"
	"time"
)

type WeixinAoModel struct {
}

var WeixinAo WeixinAoModel

func (this *WeixinAoModel) GetJsConfig(url string) WxSdkJsConfig {
	wxSdk := WxSdk{
		AppId:ConfigAo.Get("wxAppId"),
		AppSecret:ConfigAo.Get("wxAppSecret"),
	}
	jsApiTicket := ConfigAo.Get("wxJsApiTicket")
	result,err := wxSdk.GetJsConfig(jsApiTicket, url)
	if err != nil{
		panic(err)
	}
	return result
}

func (this *WeixinAoModel) RefreshConfig() {
	wxSdk := WxSdk{
		AppId:ConfigAo.Get("wxAppId"),
		AppSecret:ConfigAo.Get("wxAppSecret"),
	}
	accessToken,err := wxSdk.GetAccessToken()
	if err != nil{
		panic(err)
	}
	ConfigAo.Set("wxAccessToken", accessToken.AccessToken)
	jsTicket,err := wxSdk.GetJsApiTicket(accessToken.AccessToken)
	if err != nil{
		panic(err)
	}
	ConfigAo.Set("wxJsApiTicket", jsTicket.Ticket)
}

func init() {
	StartTimerTask(time.Second*3600, func() {
		WeixinAo.RefreshConfig()
	})
}
