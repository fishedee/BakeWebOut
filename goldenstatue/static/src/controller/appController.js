import AppView from '../view/appView';
import LoginModel from '../model/loginModel';
import WeixinModel from '../model/weixinModel';

export default Controllers.createClass({
	initialize(){
		this.loadView(AppView);
		this.loadModel(LoginModel);
		this.loadModel(WeixinModel);
	},
	async onCreate(){
		this.isLoginData = await this.loginModel.isLogin();
		if(this.isLoginData == null ){
			var loginUrl = await this.loginModel.login();
			location.href = loginUrl;
		}
	},
	render(){
		//每次切换页面都进行微信签名
		this.weixinModel.sign();
		return {
			webpackJson:this.getWebpackJson(),
			isLogin:this.loginModel.get() != null,
		};
	}
});