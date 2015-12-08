import BaseModel from './baseModel';

export default Models.createClass({
	mixins:[BaseModel],
	name:'weixinModel',
	initialize(){
		this.state = null;
	},
	async sign(){
		this.state = await this.fetchGet('/weixin/getJsConfig',{url:location.href});
		var config = this.state.toJS();
		config.debug = true;
		config.jsApiList =[
			"onMenuShareTimeline",
			"onMenuShareAppMessage",
			"onMenuShareQQ",
			"onMenuShareWeibo",
			"onMenuShareQZone"
		];
		window.wx.error(function(res){
			alert("注册成功");
		});
		window.wx.error(function(res){
			alert(JSON.stringify(res));
		});
		alert(config)
		window.wx.config(config);
		alert(this.state)
		return this.state;
	},
	setShareMessage(shareMessage){
		window.wx.onMenuShareTimeline(shareMessage);
		window.wx.onMenuShareAppMessage(shareMessage);
		window.wx.onMenuShareQQ(shareMessage);
		window.wx.onMenuShareWeibo(shareMessage);
		window.wx.onMenuShareQZone(shareMessage);
	},
});
