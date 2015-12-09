import BaseModel from './baseModel';

export default Models.createClass({
	mixins:[BaseModel],
	name:'weixinModel',
	initialize(){
		this.lastSignUrl = null;
		this.lastShareUrl = null;
	},
	async sign(){
		var url = location.href;
		if( url == this.lastSignUrl ){
			return;
		}
		this.lastSignUrl = url;
		var configImmutable = await this.fetchGet('/weixin/getJsConfig',{url:url});
		var config = configImmutable.toJS();
		config.debug = false;
		config.jsApiList =[
			"onMenuShareTimeline",
			"onMenuShareAppMessage",
			"onMenuShareQQ",
			"onMenuShareWeibo",
			"onMenuShareQZone"
		];
		window.wx.config(config);
	},
	setShareMessage(shareMessage){
		shareMessage.link = "http://"+location.host+shareMessage.link;
		var link = shareMessage.link;
		if( this.lastShareUrl == link ){
			return;
		}
		this.lastShareUrl = link;
		window.wx.ready(function(){
			window.wx.onMenuShareTimeline(shareMessage);
			window.wx.onMenuShareAppMessage(shareMessage);
			window.wx.onMenuShareQQ(shareMessage);
			window.wx.onMenuShareWeibo(shareMessage);
			window.wx.onMenuShareQZone(shareMessage);
		});
	},
});
