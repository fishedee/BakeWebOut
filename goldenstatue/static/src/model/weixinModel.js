import BaseModel from './baseModel';
import Env from 'fishfront/runtime/env';

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
	setShareUrl(url){
		if( Env.isInBrowser() ){
			this.lastShareUrl = "http://"+location.host+url;
		}
	},
	setShareMessageInner(shareMessage){
		shareMessage.link = DS.linkChange(this.lastShareUrl);
		window.wx.ready(function(){
			window.DS.ready(function(){	
				window.wx.onMenuShareTimeline({
					...shareMessage,
					success:function(){
						DS.sendRepost("timeline");
						if( shareMessage.success ){
							shareMessage.success();
						}
					}
				});
				window.wx.onMenuShareAppMessage({
					...shareMessage,
					success:function(){
						DS.sendRepost("appMessage");
						if( shareMessage.success ){
							shareMessage.success();
						}
					}
				});
				window.wx.onMenuShareQQ({
					...shareMessage,
					success:function(){
						DS.sendRepost("qq");
						if( shareMessage.success ){
							shareMessage.success();
						}
					}
				});
				window.wx.onMenuShareWeibo({
					...shareMessage,
					success:function(){
						DS.sendRepost("weibo");
						if( shareMessage.success ){
							shareMessage.success();
						}
					}
				});
				window.wx.onMenuShareQZone({
					...shareMessage,
					success:function(){
						DS.sendRepost("qzone");
						if( shareMessage.success ){
							shareMessage.success();
						}
					}
				});
			});
		});
	},
	setShareMessage(shareMessage){
		if( Env.isInBrowser() ){
			setTimeout(this.setShareMessageInner.bind(this,shareMessage),0);
		}
	}
});
