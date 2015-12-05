import AppView from '../view/appView';
import AppModel from '../model/appModel';

export default Controllers.createClass({
	initialize(){
		this.loadView(AppView);
		this.loadModel(AppModel);
	},
	async onCreate(){
		await this.appModel.fetchData('getComponentInfo?contentId=10001&clientId=10001');
	},
	async setComponentTitle(titleId){
		await this.appModel.fetchPostData('setComponentTitle?contentId=10001&titleId='+titleId.toString());
	},
	async addComponentPuzzle(){
		await this.appModel.fetchPostData('addComponentPuzzle?contentId=10001&clientId=10001');
	},
	render(){
		return {
			isLogin:true,
			//isRulePage:true,
			//isDetailInfoPage:false,
			//isGetGiftPage:false,
			//isThanksPage:false,
			isLoginClient:true,
			isSorryPage:false,
			data:Immutable.fromJS([
				{clientImage:'http://image.hongbeibang.com/Fiksjxy112TqXYHALlriBFDYXt2C', clientName:'XXXXXXX', material:'牛奶'},
				{clientImage:'http://image.hongbeibang.com/FsRAzPOmU5jAcEcrcMl3xP1plsTE', clientName:'XXXXXXX', material:'烤箱'},
				{clientImage:'http://image.hongbeibang.com/FneBp_v3aQEE2eI8DPWlbXmrFVKW', clientName:'XXXXXXXX', material:'油'},
				{clientImage:'http://image.hongbeibang.com/FsRAzPOmU5jAcEcrcMl3xP1plsTE', clientName:'XXXXXXX', material:'烤箱'},
			]),
			setComponentTitle:this.setComponentTitle,
			addComponentPuzzle:this.addComponentPuzzle,
			materialData:this.appModel.get(),
		};
	}
});