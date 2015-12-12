import AppView from '../view/appView';
import LoginModel from '../model/loginModel';
import WeixinModel from '../model/weixinModel';

export default Controllers.createClass({
	initialize(){
		this.loadView(AppView);
		this.loadModel(LoginModel);
		this.loadModel(WeixinModel);
	},
	async getLoginUrl(){
		return await this.loginModel.login();
	},
	async checkIsLogin(){
		await this.loginModel.isLogin();
	},
	render(){
		//每次切换页面都进行微信签名
		this.weixinModel.sign();
		this.weixinModel.setShareUrl(this.getLocation());
		return {
			webpackJson:this.getWebpackJson(),
			checkIsLogin:this.checkIsLogin,
			getLoginUrl:this.getLoginUrl,
			isLogin:this.loginModel.get() != null,
		};
	}
});