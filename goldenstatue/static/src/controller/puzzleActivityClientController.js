import PuzzleActivityClientView from '../view/puzzleActivityClientView';
import PuzzleActivityModel from '../model/puzzleActivityModel';
import PuzzleActivityFinishModel from '../model/puzzleActivityFinishModel';
import LoginModel from '../model/loginModel';
import WeixinModel from '../model/weixinModel';
import ReactLocation from 'fishfront/react/react-location';

export default Controllers.createClass({
	mixins:[ReactLocation],
	initialize(){
		this.loadView(PuzzleActivityClientView);
		this.loadModel(PuzzleActivityModel);
		this.loadModel(PuzzleActivityFinishModel);
		this.loadModel(LoginModel);
		this.loadModel(WeixinModel);
		this.contentId = this.getSegment(1);
		this.clientId = this.getSegment(2);
	},
	async fetchComponentInfo(){
		await this.puzzleActivityModel.fetchComponentInfo(
			this.contentId,
			this.clientId
		);
	},
	async fetchFinishComponentInfo(){
		await this.puzzleActivityFinishModel.fetchFinishComponentInfo(
			this.contentId
		);
	},
	async setComponentTitle(titleId){
		await this.puzzleActivityModel.setComponentTitle(
			this.contentId,
			this.clientId,
			titleId
		);
		await this.puzzleActivityModel.fetchComponentInfo(
			this.contentId,
			this.clientId
		);
	},
	async addComponentPuzzle(puzzleId){
		var data = await this.puzzleActivityModel.addComponentPuzzle(
			this.contentId,
			this.clientId,
			puzzleId
		);
		await this.puzzleActivityModel.fetchComponentInfo(
			this.contentId,
			this.clientId
		);
		return data;
	},
	async setComponentAddress(name,phoneNumber,address){
		await this.puzzleActivityModel.setComponentAddress(
			this.contentId,
			this.clientId,
			name,
			phoneNumber,
			address
		);
		await this.puzzleActivityModel.fetchComponentInfo(
			this.contentId,
			this.clientId
		);
	},
	async checkHasPhone(){
		var isPhoneLogin = await this.loginModel.checkHasPhone();
		return isPhoneLogin;
	},
	async getPhoneCaptcha(phone){
		await this.loginModel.getPhoneCaptcha(phone);
	},
	async registerPhone(phone,captcha){
		await this.loginModel.registerPhone(phone,captcha);
	},
	setShareMessage(shareMessage){
		this.weixinModel.setShareMessage(shareMessage);
	},
	render(){
		var data = this.puzzleActivityModel.get(this.contentId,this.clientId);
		var finishData = this.puzzleActivityFinishModel.get(this.contentId);
		return {
			checkHasPhone:this.checkHasPhone,
			getPhoneCaptcha:this.getPhoneCaptcha,
			registerPhone:this.registerPhone,
			setComponentTitle:this.setComponentTitle,
			addComponentPuzzle:this.addComponentPuzzle,
			setComponentAddress:this.setComponentAddress,
			fetchComponentInfo:this.fetchComponentInfo,
			fetchFinishComponentInfo:this.fetchFinishComponentInfo,
			setShareMessage:this.setShareMessage,
			componentData:data,
			finishData:finishData,
			loginClient:this.loginModel.get()
		};
	}
});