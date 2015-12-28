package weixin

import (
	. "github.com/fishedee/sdk"
	. "github.com/fishedee/web"
	. "goldenstatue/models/common"
	. "goldenstatue/models/config"
	"time"
)

type WeixinAoModel struct {
	BaseModel
	ConfigAo ConfigAoModel
}

func (this *WeixinAoModel) GetJsConfig(url string) WxSdkJsConfig {
	wxSdk := WxSdk{
		AppId:     this.ConfigAo.Get("wxAppId"),
		AppSecret: this.ConfigAo.Get("wxAppSecret"),
	}
	jsApiTicket := this.ConfigAo.Get("wxJsApiTicket")
	result, err := wxSdk.GetJsConfig(jsApiTicket, url)
	if err != nil {
		panic(err)
	}
	return result
}

func (this *WeixinAoModel) RefreshConfig() {
	wxSdk := WxSdk{
		AppId:     this.ConfigAo.Get("wxAppId"),
		AppSecret: this.ConfigAo.Get("wxAppSecret"),
	}
	accessToken, err := wxSdk.GetAccessToken()
	if err != nil {
		panic(err)
	}
	this.ConfigAo.Set("wxAccessToken", accessToken.AccessToken)
	jsTicket, err := wxSdk.GetJsApiTicket(accessToken.AccessToken)
	if err != nil {
		panic(err)
	}
	this.ConfigAo.Set("wxJsApiTicket", jsTicket.Ticket)
}

func init() {
	InitTimerTask(time.Second*3600, (*WeixinAoModel).RefreshConfig)
}
