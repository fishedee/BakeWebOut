import AppView from '../view/appView';

export default Controllers.createClass({
	initialize(){
		this.loadView(AppView);
	},
	render(){
		return {
			isLogin:true,
			isRulePage:true,
			isDetailInfoPage:false,
			isGetGiftPage:false,
			isThanksPage:false,
			isLoginClient:true,
			isSorryPage:false,
			data:Immutable.fromJS([
				{clientImage:'http://image.hongbeibang.com/Fiksjxy112TqXYHALlriBFDYXt2C', clientName:'XXXXXXX', material:'牛奶'},
				{clientImage:'http://image.hongbeibang.com/FsRAzPOmU5jAcEcrcMl3xP1plsTE', clientName:'XXXXXXX', material:'烤箱'},
				{clientImage:'http://image.hongbeibang.com/FneBp_v3aQEE2eI8DPWlbXmrFVKW', clientName:'XXXXXXXX', material:'油'},
				{clientImage:'http://image.hongbeibang.com/FsRAzPOmU5jAcEcrcMl3xP1plsTE', clientName:'XXXXXXX', material:'烤箱'},
			]),
		};
	}
});