import BaseModel from './baseModel';
import Env from 'fishfront/runtime/env';

export default Models.createClass({
	mixins:[BaseModel],
	name:'baiduModel',
	initialize(){
		if( Env.isInBrowser() ){
			window._hmt = window._hmt || [];
			window._hmt.push(['_setAutoPageview', false]);
			var hm = document.createElement("script");
			hm.src = "//hm.baidu.com/hm.js?33246539f95ebb9097b2aa92a8eddbad";
			var s = document.getElementsByTagName("script")[0]; 
			s.parentNode.insertBefore(hm, s);
		}
		this.lastTrackUrl = null;
	},
	async track(url){
		if( Env.isInBrowser() ){
			if( url == this.lastTrackUrl ){
				return;
			}
			this.lastTrackUrl = url;
			window._hmt.push(['_trackPageview', url]);
		}
	},
});