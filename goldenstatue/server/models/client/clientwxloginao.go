package client

import (
	"github.com/astaxie/beego/context"
	. "github.com/fishedee/web"
	. "github.com/fishedee/language"
	"net/url"
	"net/http"
	"io/ioutil"
	"bytes"
	"encoding/json"
	"fmt"
	"time"
)

type ClientWxLoginAoModel struct {
}

var officalHost = "lamsoon.solomochina.com"
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

func (this *ClientWxLoginAoModel) callInterface(context *context.Context,method string,url string,urlInfo url.Values,result interface{}){
	//提取request的cookie
	requestCookies := context.Request.Cookies()

	//请求url
	httpClient := &http.Client{}
	var request *http.Request
	var resp *http.Response
	var err error
	url = "http://" + officalHost + url
	if method == "get"{
		request,err = http.NewRequest("GET",url + "?" + urlInfo.Encode(),nil)
		if err != nil{
			panic(err)
		}
	}else{
		request,err = http.NewRequest("POST",url,bytes.NewReader([]byte(urlInfo.Encode())))
		request.Header.Set("Content-Type","application/x-www-form-urlencoded; charset=UTF-8")
		if err != nil{
			panic(err)
		}
	}
	for _,value := range requestCookies{
		request.AddCookie(value)
	}
	resp,err = httpClient.Do(request)
	
	if err != nil{
		Throw(1,"调用金象官方系统接口失败:"+err.Error())
	}
	defer resp.Body.Close()
	respString,err := ioutil.ReadAll(resp.Body)
	if err != nil{
		Throw(1,"获取金象官方系统接口的body失败")
	}
	if resp.StatusCode != 200{
		Throw(1,"调用金象官方系统接口,状态码为:"+resp.Status)
	}
	err = json.Unmarshal(respString,result)
	if err != nil{
		Throw(1,"获取金象官方系统接口的json解析失败："+string(respString))
	}

	//写入cookie
	responseCookies := resp.Cookies()
	for _,value := range responseCookies{
		http.SetCookie(context.ResponseWriter,value)
		context.Request.AddCookie(value)
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
	this.callInterface(context,"get","/weixin/user",url.Values{
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

func (this *ClientWxLoginAoModel) CheckHasPhoneNumber(context *context.Context,clientId int)bool{	
	clientInfo := ClientAo.Get(clientId)

	var userPhoneInfo struct{
		Registered bool `json:registered`
	}
	this.callInterface(context,"get","/api/user/query",url.Values{
		"openid":{clientInfo.OpenId},
	},&userPhoneInfo)

	return userPhoneInfo.Registered;
}

func (this *ClientWxLoginAoModel) CheckMustHasPhone(context *context.Context,clientId int){
	hasPhone := this.CheckHasPhoneNumber(context,clientId)
	if hasPhone == false{
		Throw(1,"还没有注册手机号码噢")
	}
}

func (this *ClientWxLoginAoModel) GetPhoneCaptcha(context *context.Context,phoneNumber string){
	var sendResult struct{
		Error int `json:error,omitempty`
		Message string `json:message,omitempty`
	}
	this.callInterface(context,"get","/api/sms_captcha",url.Values{
		"mobile":{phoneNumber},
	},&sendResult)
	if sendResult.Error != 0{
		Throw(1,"发送手机号码失败："+sendResult.Message)
	}
}

func (this *ClientWxLoginAoModel) RegisterPhoneNumber(context *context.Context,clientId int,phoneNumber string,phoneCaptcha string){
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

	this.callInterface(context,"post","/api/user",url.Values{
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
