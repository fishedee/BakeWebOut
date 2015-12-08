import AppView from '../view/appView';
import LoginModel from '../model/loginModel';

export default Controllers.createClass({
	initialize(){
		this.loadView(AppView);
		this.loadModel(LoginModel);
		//this.loadModel(WeixinModel);
	},
	async onCreate(){
		this.isLoginData = await this.loginModel.isLogin();
		if(this.isLoginData == null ){
			var loginUrl = await this.loginModel.login();
			location.href = loginUrl;
		}
		/*
		await this.weixinModel.sign();
		this.weixinModel.setShareMessage({
			title:"测试标题",
			desc:"测试描述",
			link:"http://www.qq.com",
			imgUrl:""
		});
		*/
	},
	render(){
		return {
			webpackJson:this.getWebpackJson(),
			isLogin:this.loginModel.get() != null,
		};
	}
});