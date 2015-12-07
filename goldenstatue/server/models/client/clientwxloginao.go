package client

import (
	"github.com/astaxie/beego/context"
	. "github.com/fishedee/web"
	. "github.com/fishedee/language"
	"net/url"
	"net/http"
	"io/ioutil"
	"encoding/json"
	"fmt"
	"time"
)

type ClientWxLoginAoModel struct {
}

var officalHost = "lamsoontest.solomochina.com"
var ClientWxLoginAo = &ClientWxLoginAoModel{}

func (this *ClientWxLoginAoModel) Login(context *context.Context,callback string) string {
	//启动session
	sess, err := Session.SessionStart(context.ResponseWriter, context.Request)
	if err != nil {
		panic("session启动失败！")
	}
	defer sess.SessionRelease(context.ResponseWriter)

	//设置callback
	sess.Set("clientCallback",callback)

	//生成跳转url
	currentTime := fmt.Sprintf("%d",time.Now().Unix())
	forward := "http://"+context.Input.Host()+"/client/loginCallback/"+currentTime
	query := url.Values{}
	query.Set("forward",forward)
	queryEncode := query.Encode()
	return "http://"+officalHost+"/weixin/oauth2?"+queryEncode
}

func (this *ClientWxLoginAoModel) callInterface(method string,url string,urlInfo url.Values,result interface{}){
	var resp *http.Response
	var err error
	url = "http://" + officalHost + url
	if method == "get"{
		url = url + "?" + urlInfo.Encode()
		resp,err = http.DefaultClient.Get(url)
	}else{
		resp,err = http.DefaultClient.PostForm(url,urlInfo)
	}
	
	if err != nil{
		Throw(1,"调用金象官方系统接口失败:"+err.Error())
	}
	defer resp.Body.Close()
	if resp.StatusCode != 200{
		Throw(1,"调用金象官方系统接口,状态码为:"+resp.Status)
	}
	respString,err := ioutil.ReadAll(resp.Body)
	if err != nil{
		Throw(1,"获取金象官方系统接口的body失败")
	}
	err = json.Unmarshal(respString,result)
	if err != nil{
		Throw(1,"获取金象官方系统接口的json解析失败："+string(respString))
	}
}

func (this *ClientWxLoginAoModel) LoginCallback(context *context.Context) string {
	//启动session
	sess, err := Session.SessionStart(context.ResponseWriter, context.Request)
	if err != nil {
		panic("session启动失败！")
	}
	defer sess.SessionRelease(context.ResponseWriter)

	//获取用户信息
	var clientInfo struct{
		OpenId string `json:"openid"`
		NickName string `json:"nickname"`
		Sex int `json:"sex"`
		Language string `json:"language"`
		City string `json:"city"`
		Province string `json:"province"`
		Country string `json:"country"`
		HeadImgUrl string `json:"headimgurl"`
	}

	openid := context.Input.Query("openid")
	this.callInterface("get","/weixin/user",url.Values{
		"openid":{openid},
	},&clientInfo)

	//写入登陆态
	clientId := ClientAo.AddOnce(Client{
		Name:clientInfo.NickName,
		Image:clientInfo.HeadImgUrl,
		OpenId:clientInfo.OpenId,
	})
	sess.Set("clientId",clientId)

	clientCallback,ok := sess.Get("clientCallback").(string)
	if( !ok ){
		clientCallback = ""
	}
	return clientCallback
}

func (this *ClientWxLoginAoModel) CheckHasPhoneNumber(clientId int)bool{
	return true
	clientInfo := ClientAo.Get(clientId)

	var userPhoneInfo struct{
		Registered bool `json:registered`
	}
	this.callInterface("get","/api/user/query",url.Values{
		"openid":{clientInfo.OpenId},
	},&userPhoneInfo)

	return userPhoneInfo.Registered;
}

func (this *ClientWxLoginAoModel) GetPhoneCaptcha(phoneNumber string){
	var sendResult struct{
		Error int `json:error,omitempty`
		Message string `json:message,omitempty`
	}
	this.callInterface("get","/api/sms_captcha",url.Values{
		"mobile":{phoneNumber},
	},&sendResult)
	if sendResult.Error != 0{
		Throw(1,"发送手机号码失败："+sendResult.Message)
	}
}

func (this *ClientWxLoginAoModel) RegisterPhoneNumber(clientId int,phoneNumber string,phoneCaptcha string){
	clientInfo := ClientAo.Get(clientId)

	var registerInfo struct{
		OpenId string
		Mobile string
		Captcha string
		InviteCode string
		Source string
	}
	registerInfo.OpenId = clientInfo.OpenId
	registerInfo.Mobile = phoneNumber
	registerInfo.Captcha = phoneCaptcha
	registerInfo.InviteCode = ""
	registerInfo.Source = "烘焙帮"

	var sendResult struct{
		Error int `json:error,omitempty`
		Message string `json:message,omitempty`
	}
	this.callInterface("post","/api/user",url.Values{
		"openid":{registerInfo.OpenId},
		"mobile":{registerInfo.Mobile},
		"sms_captcha":{registerInfo.Captcha},
		"invite_code":{registerInfo.InviteCode},
		"source":{registerInfo.Source},
	},&sendResult)
	if sendResult.Error != 0{
		Throw(1,"注册手机信息失败："+sendResult.Message)
	}
}
