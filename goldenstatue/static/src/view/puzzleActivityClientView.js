
import MaterialPage from './materialPageView';
import RulePage from './rulePageView';
import StyleSelectPage from './styleSelectPageView';
import LoginPage from './loginPageView';
import CongratulationPage from './congratulationPageView';
import SharePage from './sharePageView';
import ScanningPage from './scanningPageView';
import DetailInfoPage from './detailInfoPageView';
import GetGiftPage from './getGiftPageView';
import WinningPage from './winningPageView';
import InvitationPage from './invitationPageView';
import ThanksPage from './thanksPageView';
import SorryPage from './sorryPageView';

export default Views.createClass({
	getInitialState(){
		return {
			isPhoneLogin:false,
			isStyleSelectPage:false,
			isMakeCakeClick:false,
			isSharePage:false,
			isScanningCodePage:false,
			isWinningPage:false,
			isInvitationPage:false,
			clickRulePage:false,
			isSorryPage:false,
			isRulePage:true,
			isDonePage:true,
			isDetailInfoPage:true,
			isGetGiftPage:true,
			isThanksPage:true,
			puzzleData:Immutable.fromJS({}),
		};
	},
	changePage(pageName){
		this.setState({
			isStyleSelectPage:false,
			isMakeCakeClick:false,
			isSharePage:false,
			isScanningCodePage:false,
			isWinningPage:false,
			isInvitationPage:false,
			clickRulePage:false,
			isRulePage:false,
			isDonePage:false,
			isDetailInfoPage:false,
			isGetGiftPage:false,
			isThanksPage:false,
			isSorryPage:false,
			isPhoneLogin:false,
		});

		if(pageName=='rulePage'){
			this.setState({
				clickRulePage:true,
			});
		}else if(pageName=='styleSelectPage'){
			this.setState({
				isStyleSelectPage:true
			});
		}else if(pageName=='sharePage'){
			this.setState({
				isSharePage:true
			});
		}else if(pageName=='scanningCodePage'){
			this.setState({
				isScanningCodePage:true
			});
		}else if(pageName=='winningPage'){
			this.setState({
				isWinningPage:true
			});
		}
	},
	async makeCakeClick(){

		var isPhoneLogin = await this.props.checkHasPhone();

		if(isPhoneLogin){
			var puzzleData = await this.props.addComponentPuzzle();
			if(puzzleData.get("type")==2){
				this.setState({
					isSorryPage:true,
				});
			}
			this.setState({
				isPhoneLogin:isPhoneLogin,
				isMakeCakeClick:true,
				puzzleData:puzzleData
			});
		}else{
			this.setState({
				isPhoneLogin:isPhoneLogin,
				isMakeCakeClick:true,
			});
		}
	},
	async selectStyle(titleId){
		await this.props.setComponentTitle(titleId);
	},
	async signInfo(name,phoneNumber,address){
		await this.props.setComponentAddress(name,phoneNumber,address);
		this.setState({
			isInvitationPage:true
		});
	},
	async getCode(phone){
		await this.props.getPhoneCaptcha(phone);
		alert('发送验证码成功，请留意短信！');
	},
	async registerPhone(phone,captcha){
		await this.props.registerPhone(phone,captcha);
		alert('注册成功！');
	},
	render(){
		var componentData = this.props.componentData;
		var finishData = this.props.finishData;
		if( !componentData || !finishData ){
			return null;
		}
		var materialData = componentData.setIn(["radio"],finishData);
		var isPuzzleClient = componentData.get("isLoginClient");
		return (
			<div>
				{(materialData.getIn(["component","state"])!=undefined) ? 
					this.state.isStyleSelectPage? 
						<StyleSelectPage changePage={this.changePage} selectStyle={this.selectStyle} materialData={materialData} />
						:this.state.isWinningPage ?
							<WinningPage signInfo={this.signInfo} changePage={this.changePage} />
							:<MaterialPage 
								contentId={componentData.getIn(["component","contentId"])}
								loginClient={this.props.loginClient}
								changePage={this.changePage} 
								materialData={materialData}
								makeCakeClick={this.makeCakeClick}
								state={materialData.getIn(["component","state"])}
								isPuzzleClient={isPuzzleClient} />
					
					:null
				}

				{this.state.isMakeCakeClick ? 
					this.state.isPhoneLogin ? 
						this.state.isSorryPage ?
							<SorryPage changePage={this.changePage} />
							:<CongratulationPage changePage={this.changePage} isPuzzleClient={isPuzzleClient} puzzleData={this.state.puzzleData} />
						:<LoginPage changePage={this.changePage} getCode={this.getCode} registerPhone={this.registerPhone} />
					:null
				}

				{this.state.isSharePage ?
					<SharePage changePage={this.changePage} />
					:null
				}
				
				{this.state.isScanningCodePage ?
					<ScanningPage changePage={this.changePage} />
					:null
				}

				{this.state.clickRulePage || (isPuzzleClient && this.state.isRulePage && (materialData.getIn(["component","state"])==1)) ?
					<RulePage changePage={this.changePage} state={materialData.getIn(["component","state"])} isPuzzleClient={isPuzzleClient} />
					:null
				}

				{isPuzzleClient && this.state.isDetailInfoPage && (materialData.getIn(["component","state"])==3) ?
					<DetailInfoPage changePage={this.changePage} materialData={materialData} />
					:null
				}

				{isPuzzleClient && this.state.isGetGiftPage && (materialData.getIn(["component","state"])==4) ?
					<GetGiftPage changePage={this.changePage} lastPuzzle={materialData.get("allPuzzle")} />
					:null
				}

				{this.state.isInvitationPage || (isPuzzleClient && this.state.isDonePage && (materialData.getIn(["component","state"])==5)) ?
					<InvitationPage changePage={this.changePage} />
					:null
				}

				{!isPuzzleClient && this.state.isThanksPage && ((materialData.getIn(["component","state"])==4) || (materialData.getIn(["component","state"])==5)) ?
					<ThanksPage changePage={this.changePage} />
					:null
				}
			</div>
		);
	}
});
		