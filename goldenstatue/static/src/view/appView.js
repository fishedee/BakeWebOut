import DocumentHead from 'fishfront/react/react-document-head';
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

var style = StyleSheet.create({
	body:{
		padding:'0',
		backgroundColor:'#fcd54a',
		maxWidth:'500px',
		height:'100%',
		margin:'0 auto',
		position:'relative',
		overflow:'hidden',
	}
});
export default Views.createClass({
	getInitialState(){
		return {
			isStyleSelectPage:false,
			isMakeCakeClick:false,
			isSharePage:false,
			isScanningCodePage:false,
			isWinningPage:false,
			isInvitationPage:false,
			clickRulePage:false,
			isRulePage:true,
			isDonePage:true,
			isDetailInfoPage:true,
			isGetGiftPage:true,
			isThanksPage:true,
			//isRulePage:this.props.isRulePage,
			//isDetailInfoPage:this.props.isDetailInfoPage,
			//isGetGiftPage:this.props.isGetGiftPage,
			//isThanksPage:this.props.isThanksPage,
		};
	},
	changePage(pageName,titleId){
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
		});

		if(pageName=='rulePage'){
			this.setState({
				clickRulePage:true,
			});
		}else if(pageName=='styleSelectPage'){
			this.setState({
				isStyleSelectPage:true
			});
		}else if(pageName=='congratulationPageOrLoginPage'){
			asdf = await this.props.addComponentPuzzle();
			this.setState({
				isMakeCakeClick:true
			});
		}else if(pageName=='sharePage'){
			this.setState({
				isSharePage:true
			});
		}else if(pageName=='scanningCodePage'){
			this.setState({
				isScanningCodePage:true
			});
		}else if(pageName=='styleSelectPage'){
			this.setState({
				isStyleSelectPage:true
			});
		}else if(pageName=='winningPage'){
			this.setState({
				isWinningPage:true
			});
		}else if(pageName=='invitationPage'){
			this.setState({
				isInvitationPage:true
			});
		}else if(pageName=='materialPage'){
			this.props.setComponentTitle(titleId);
		}
	},
	getCode(){
	},
	render(){
		var materialData = this.props.materialData;
		return (
			<div className={style.body}>
				<DocumentHead
					meta={[
						{charset:"utf-8"},
						{name:"description",content:"Hacker News clone written in ReactJS, RefluxJS, and Firebase"},
						{name:"viewport",content:"width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=3"},
					]}
					link={[
						{type:"text/css",rel:"stylesheet",href:"/index.css"}
					]}
					script={[
						{src:"/bundle.js"}
					]} />

				{(materialData.getIn(["component","state"])!=undefined) ? 
					this.state.isStyleSelectPage? 
						<StyleSelectPage changePage={this.changePage} materialData={materialData} />
						:this.state.isWinningPage ?
							<WinningPage changePage={this.changePage} />
							:<MaterialPage changePage={this.changePage} 
								materialData={materialData}
								state={materialData.getIn(["component","state"])}
								isLoginClient={this.props.isLoginClient} />
					
					:null
				}

				{this.state.isMakeCakeClick ? 
					this.props.isLogin ? 
						this.props.isSorryPage ?
							<SorryPage changePage={this.changePage} />
							:<CongratulationPage changePage={this.changePage} isLoginClient={this.props.isLoginClient} />
						:<LoginPage changePage={this.changePage} getCode={this.getCode} />
					:null
				}

				{this.state.isSharePage ?
					<SharePage changePage={this.changePage} />
					:null
				}
				
				{this.state.isScanningCodePage ?
					<ScanningPage />
					:null
				}

				{this.state.clickRulePage || (this.props.isLoginClient && this.state.isRulePage && (materialData.getIn(["component","state"])==1)) ?
					<RulePage changePage={this.changePage} />
					:null
				}

				{this.props.isLoginClient && this.state.isDetailInfoPage && (materialData.getIn(["component","state"])==3) ?
					<DetailInfoPage changePage={this.changePage} data={this.props.data} />
					:null
				}

				{this.props.isLoginClient && this.state.isGetGiftPage && (materialData.getIn(["component","state"])==4) ?
					<GetGiftPage changePage={this.changePage} />
					:null
				}

				{this.state.isInvitationPage || (this.props.isLoginClient && this.state.isDonePage && (materialData.getIn(["component","state"])==5)) ?
					<InvitationPage changePage={this.changePage} />
					:null
				}

				{!this.props.isLoginClient && this.state.isThanksPage && ((materialData.getIn(["component","state"])==4) || (materialData.getIn(["component","state"])==5)) ?
					<ThanksPage changePage={this.changePage} />
					:null
				}
			</div>
		);
	}
});
		