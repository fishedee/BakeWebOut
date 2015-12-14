
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
import SorryRepeatPage from './sections/sorryRepeatPageView';
import LoadingPage from './sections/loadingPageView';

function wait(time){
	return new Promise(function(resolve,reject){
		setTimeout(resolve,time);
	});
}

export default Views.createClass({
	getInitialState(){
		return {
			brightImageIndex:null,
			isMaterialPage:false,
			isPhoneLogin:true,
			isStyleSelectPage:false,
			isSharePage:false,
			isScanningCodePage:false,
			isWinningPage:false,
			isInvitationPage:false,
			isSorryPage:false,
			isCongratulationPage:false,
			isSorryRepeatPage:false,
			isRulePage:false,
			isDetailInfoPage:false,
			isGetGiftPage:false,
			isThanksPage:false,
		};
	},
	async componentDidMount(){
		if(this.props.loginClient == null){
			return;
		}
		await this.props.fetchComponentInfo();
		await this.props.fetchFinishComponentInfo();

		var isPuzzleClient = this.props.componentData.get("isLoginClient");
		var state = this.props.componentData.getIn(["component","state"]);
		if(isPuzzleClient){
			if(state == 1){
				this.setState({
					isMaterialPage:true,
					isRulePage:true
				});
			}else if(state == 2){
				this.setState({
					isMaterialPage:true
				});
			}else if(state == 3){
				this.setState({
					isMaterialPage:true,
					isDetailInfoPage:true
				});
			}else if(state == 4){
				this.setState({
					isMaterialPage:true,
					isGetGiftPage:true
				});
			}else if(state == 5){
				this.setState({
					isMaterialPage:true,
					isInvitationPage:true
				});
			}else{
				throw new Error( '状态异常！' );
			}
		}else{
			if(state == 1){
				alert('好友还没开始游戏呢,你也来制作一个蛋糕吧!');
				this.go('/puzzleactivity/'+this.props.componentData.getIn(["component","contentId"])+"/"+this.props.loginClient.get("clientId"));
			}else if(state == 2 || state == 3){
				this.setState({
					isMaterialPage:true
				});
			}else if(state == 4 || state == 5){
				this.setState({
					isMaterialPage:true,
					isThanksPage:true
				});
			}else{
				throw new Error( '状态异常！' );
			}
		}

	},
	changePage(pageName){
		var state = {
			isMaterialPage:true,
			isPhoneLogin:true,
			isStyleSelectPage:false,
			isSharePage:false,
			isScanningCodePage:false,
			isWinningPage:false,
			isInvitationPage:false,
			isSorryPage:false,
			isCongratulationPage:false,
			isSorryRepeatPage:false,
			isRulePage:false,
			isDetailInfoPage:false,
			isGetGiftPage:false,
			isThanksPage:false,
		};
		if(pageName == 'isStyleSelectPage' || pageName == 'isWinningPage'){
			state['isMaterialPage'] = false;
		}
		state[pageName] = true;

		this.setState(state);
	},
	async makeCakeClick(puzzleId){

		var isPhoneLogin = await this.props.checkHasPhone();
		var isPuzzle =  this.props.componentData.get("isPuzzle");
		var isPuzzleClient = this.props.componentData.get("isLoginClient");

		var self = this;
		if(isPhoneLogin){
			this.setState({
				isPhoneLogin:isPhoneLogin,
			});
			if(isPuzzle){
				if( isPuzzleClient ){	
					//提示分享
					this.setState({
						isSharePage:true,
					});
				}else{
					//提示已经点亮过了
					this.setState({
						isSorryRepeatPage:true,
					});
				}
			}else{
				await this.props.addComponentPuzzle(puzzleId);
				var puzzleData = Immutable.fromJS({});
				var allPuzzle = this.props.componentData.get("allPuzzle");
				for(var i=0;i!=allPuzzle.size;++i){
					if(allPuzzle.getIn([i,"puzzleClientId"])==this.props.loginClient.get("clientId")){
						puzzleData = allPuzzle.getIn([i]);
						break;
					}
				}
				if(puzzleData.get("type")==2){
					this.setState({
						isSorryPage:true,
					});
				}else{
					if(puzzleId == 0){
						this.setState({
							isCongratulationPage:true
						});
					}else{
						this.setState({
							brightImageIndex:puzzleId-1,
						});
						await wait(1000);
						this.setState({
							brightImageIndex:null,
							isCongratulationPage:true
						});
					}
				}
			}
		}else{
			this.setState({
				isMaterialPage:false,
				isPhoneLogin:isPhoneLogin,
			});
		}
	},
	async setTitleClick(titleId){
		await this.props.setComponentTitle(titleId);
		this.setState({
			isStyleSelectPage:false,
			isMaterialPage:true,
		});
	},
	async signInfo(name,phoneNumber,address){
		if(name && phoneNumber && address){
			await this.props.setComponentAddress(name,phoneNumber,address);
			this.setState({
				isWinningPage:false,
				isInvitationPage:true
			});
		}else{
			alert('请把资料填写完整！');
		}

	},
	async codeClick(phone){
		if(phone){
			await this.props.getPhoneCaptcha(phone);
			alert('发送验证码成功，请留意短信！');
		}else{
			alert('请输入手机号！');
		}
	},
	async registerOnClick(phone,captcha){
		if(phone && captcha){
			this.setState({
				isPhoneLogin:true,
				isMaterialPage:true
			});
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
			return <LoadingPage />;
		}
		//设置分享信息
		if( componentData.getIn(["clientName"])){
			var clientName = componentData.getIn(["clientName"]);
			var self = this;
			this.props.setShareMessage({
				title:clientName+"要做蛋糕，就差你帮TA收集啦！快去~",
				desc:"金像美玫3,000份面粉“壕”礼相送",
				imgUrl:'http://goldenstatue.solomochina.com/img/logo.jpg',
				success:function(){
					if( self.state.isSharePage ){
						self.changePage("isScanningCodePage");
					}
				}
			});
		}
		var materialData = componentData.setIn(["radio"],finishData);
		var isPuzzleClient = componentData.get("isLoginClient");
		var puzzleData = Immutable.fromJS({});
		var allPuzzle = componentData.get("allPuzzle");
		for(var i=0;i!=allPuzzle.size;++i){
			if(allPuzzle.getIn([i,"puzzleClientId"])==this.props.loginClient.get("clientId")){
				puzzleData = allPuzzle.getIn([i]);
				break;
			}
		}
		return (
			<div>
				{this.state.isStyleSelectPage? 
					<StyleSelectPage onClick={this.setTitleClick} materialData={materialData} />
					:null
				}
				{this.state.isWinningPage? 
					<WinningPage onClick={this.signInfo} />
					:null
				}
				{(materialData.getIn(["component","state"])!=undefined) && this.state.isMaterialPage ?
					<MaterialPage 
						rulePageClick={this.changePage.bind(null,'isRulePage')}
						onClick={this.makeCakeClick}
						materialData={materialData}
						state={materialData.getIn(["component","state"])}
						isPuzzleClient={isPuzzleClient}
						brightImageIndex={this.state.brightImageIndex} />
					:null
				}

				{!this.state.isPhoneLogin? 
					<LoginPage codeClick={this.codeClick} registerOnClick={this.registerOnClick} />
					:null
				}

				{this.state.isSorryPage? 
					<SorryPage closeClick={this.changePage.bind(null,'isScanningCodePage')}
						onClick={this.goNewClientPage.bind(null,this.props.loginClient.get("clientId"))} />
					:null
				}

				{this.state.isCongratulationPage? 
					<CongratulationPage closeClick={isPuzzleClient ? this.changePage.bind(null,'isMaterialPage') : this.changePage.bind(null,'isScanningCodePage')} 
						onClick={isPuzzleClient ? this.changePage.bind(null,'isSharePage') : this.goNewClientPage.bind(null,this.props.loginClient.get("clientId"))} 
							isPuzzleClient={isPuzzleClient} 
							puzzleData={puzzleData} />
					:null
				}

				{this.state.isSorryRepeatPage ?
					<SorryRepeatPage closeClick={this.changePage.bind(null,'isScanningCodePage')}
						onClick={this.goNewClientPage.bind(null,this.props.loginClient.get("clientId"))} />
					:null
				}

				{this.state.isSharePage ?
					<SharePage onClick={this.changePage.bind(null,'isScanningCodePage')} />
					:null
				}
				
				{this.state.isScanningCodePage ?
					<ScanningPage onClick={this.changePage.bind(null,'isMaterialPage')} />
					:null
				}

				{this.state.isRulePage ?
					<RulePage onClick={(materialData.getIn(["component","state"])!=1) ? this.changePage.bind(null,'isMaterialPage') : this.changePage.bind(null,'isStyleSelectPage') } />
					:null
				}

				{this.state.isDetailInfoPage ?
					<DetailInfoPage onClick={this.changePage.bind(null,'isMaterialPage')} materialData={materialData} />
					:null
				}

				{this.state.isGetGiftPage ?
					<GetGiftPage onClick={this.changePage.bind(null,'isWinningPage')} lastPuzzle={materialData.get("allPuzzle")} />
					:null
				}

				{this.state.isInvitationPage ?
					<InvitationPage onClick={this.changePage.bind(null,'isSharePage')} />
					:null
				}

				{this.state.isThanksPage ?
					<ThanksPage closeClick={this.changePage.bind(null,'isScanningCodePage')}
						onClick={this.goNewClientPage.bind(null,this.props.loginClient.get("clientId"))} />
					:null
				}
			</div>
		);
	}
});
		