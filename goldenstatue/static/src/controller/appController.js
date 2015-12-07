import AppView from '../view/appView';
import LoginModel from '../model/loginModel';

export default Controllers.createClass({
	initialize(){
		this.loadView(AppView);
		this.loadModel(LoginModel);
	},
	async onCreate(){
		this.isLoginData = await this.loginModel.isLogin();
		if(this.isLoginData == null ){
			var loginUrl = await this.loginModel.login();
			location.href = loginUrl;
		}
	},
	render(){
		return {
			isLogin:this.loginModel.get() != null,
		};
	}
});