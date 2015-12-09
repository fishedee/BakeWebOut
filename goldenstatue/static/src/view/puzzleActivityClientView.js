
import MaterialPage from './sections/materialPageView';
import RulePage from './sections/rulePageView';
import StyleSelectPage from './sections/styleSelectPageView';
import LoginPage from './sections/loginPageView';
import CongratulationPage from './sections/congratulationPageView';
import SharePage from './sections/sharePageView';
import ScanningPage from './sections/scanningPageView';
import DetailInfoPage from './sections/detailInfoPageView';
import GetGiftPage from './sections/getGiftPageView';
import WinningPage from './sections/winningPageView';
import InvitationPage from './sections/invitationPageView';
import ThanksPage from './sections/thanksPageView';
import SorryPage from './sections/sorryPageView';

export default Views.createClass({
	getInitialState(){
		return {
			brightImageIndex:null,
			isMaterialPage:true,
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
		}else if(pageName=='materialPage'){
			this.setState({
				isMaterialPage:true
			});
		}
	},
	async makeCakeClick(puzzleId){

		var isPhoneLogin = await this.props.checkHasPhone();
		var self = this;

		if(isPhoneLogin){
			var puzzleData = await this.props.addComponentPuzzle(puzzleId);
			if(puzzleData.get("type")==2){
				this.setState({
					isSorryPage:true,
					isPhoneLogin:isPhoneLogin,
					isMakeCakeClick:true,
				});
			}else{
				if(puzzleId == 0){
					this.setState({
						isPhoneLogin:isPhoneLogin,
						isMakeCakeClick:true,
						puzzleData:puzzleData
					});
				}else{
					this.setState({
						brightImageIndex:puzzleId-1,
					});
					setTimeout(function(){
						self.setState({
							brightImageIndex:null,
							isPhoneLogin:isPhoneLogin,
							isMakeCakeClick:true,
							puzzleData:puzzleData
						});
					},1000);
				}
			}
		}else{
			this.setState({
				isMaterialPage:false,
				isPhoneLogin:isPhoneLogin,
				isMakeCakeClick:true,
			});
		}
	},
	async makeCakeSecondClick(){
		var isPhoneLogin = await this.props.checkHasPhone();

		if(this.props.componentData){
			var allPuzzle = this.props.componentData.get("allPuzzle");
			for(var i=0;i!=allPuzzle.size;++i){
				if(allPuzzle.getIn([i,"puzzleClientId"]) == this.props.loginClient.get("clientId")){
					var puzzleData = allPuzzle.get(i);
				}
			}
		}
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
	},
	async selectStyle(titleId){
		await this.props.setComponentTitle(titleId);
	},
	async signInfo(name,phoneNumber,address){
		if(name && phoneNumber && address){
			await this.props.setComponentAddress(name,phoneNumber,address);
			this.changePage();
			this.setState({
				isInvitationPage:true
			});
		}else{
			alert('请把资料填写完整！');
		}

	},
	async getCode(phone){
		if(phone){
			await this.props.getPhoneCaptcha(phone);
			alert('发送验证码成功，请留意短信！');
		}else{
			alert('请输入手机号！');
		}
	},
	async registerPhone(phone,captcha){
		if(phone && captcha){
			this.changePage('materialPage');
			await this.props.registerPhone(phone,captcha);
			alert('注册成功！');
		}else{
			if(phone&&!captcha){
				alert('请输入验证码！');
			}else if(!phone&&captcha){
				alert('请输入手机号！');
			}else if(!phone&&!captcha){
				alert('请输入手机号和验证码！');
			}
		}
	},
	goNewClientPage(changePuzzleClientId){
		var componentData = this.props.componentData;
		this.go('/puzzleactivity/'+componentData.getIn(["component","contentId"])+'/'+changePuzzleClientId);
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
							<WinningPage signInfo={this.signInfo} />
							:this.state.isMaterialPage ? 
								<MaterialPage 
									contentId={componentData.getIn(["component","contentId"])}
									loginClient={this.props.loginClient}
									changePage={this.changePage} 
									materialData={materialData}
									makeCakeClick={this.makeCakeClick}
									makeCakeSecondClick={this.makeCakeSecondClick}
									state={materialData.getIn(["component","state"])}
									isPuzzleClient={isPuzzleClient}
									brightImageIndex={this.state.brightImageIndex} />
								:null
					
					:null
				}

				{this.state.isMakeCakeClick ? 
					this.state.isPhoneLogin ? 
						this.state.isSorryPage ?
							<SorryPage changePage={this.changePage} goNewClientPage={this.goNewClientPage} puzzleData={this.state.puzzleData}  />
							:<CongratulationPage changePage={this.changePage} goNewClientPage={this.goNewClientPage} isPuzzleClient={isPuzzleClient} puzzleData={this.state.puzzleData} />
						:<LoginPage getCode={this.getCode} registerPhone={this.registerPhone} />
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
					<ThanksPage changePage={this.changePage} 
								contentId={componentData.getIn(["component","contentId"])}
								loginClient={this.props.loginClient} />
					:null
				}
			</div>
		);
	}
});
		