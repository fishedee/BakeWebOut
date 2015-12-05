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
			isRulePage:this.props.isRulePage,
			isDetailInfoPage:this.props.isDetailInfoPage,
			isGetGiftPage:this.props.isGetGiftPage,
			isThanksPage:this.props.isThanksPage,
			styleName:'',
		};
	},
	changePage(pageName,styleName){
		this.setState({
			isRulePage:false,
			isStyleSelectPage:false,
			isMakeCakeClick:false,
			isSharePage:false,
			isScanningCodePage:false,
			isWinningPage:false,
			isInvitationPage:false,
			isDetailInfoPage:false,
			isGetGiftPage:false,
			isThanksPage:false,
		});

		if(pageName=='rulePage'){
			this.setState({
				isRulePage:true
			});
		}else if(pageName=='styleSelectPage'){
			this.setState({
				isStyleSelectPage:true
			});
		}else if(pageName=='congratulationPageOrLoginPage'){
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
			this.setState({
				styleName:styleName
			});
		}
	},
	getCode(){
	},
	render(){
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

				{this.state.isStyleSelectPage ? 
					<StyleSelectPage changePage={this.changePage} />
					:this.state.isWinningPage ?
						<WinningPage changePage={this.changePage} />
						:<MaterialPage changePage={this.changePage} isLoginClient={this.props.isLoginClient} styleName={this.state.styleName} />
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

				{this.state.isDetailInfoPage ?
					<DetailInfoPage changePage={this.changePage} data={this.props.data} />
					:null
				}

				{this.state.isGetGiftPage ?
					<GetGiftPage changePage={this.changePage} />
					:null
				}

				{this.state.isInvitationPage ?
					<InvitationPage changePage={this.changePage} />
					:null
				}

				{this.state.isThanksPage ?
					<ThanksPage changePage={this.changePage} />
					:null
				}

				{this.state.isRulePage ?
					<RulePage changePage={this.changePage} />
					:null
				}
			</div>
		);
	}
});
		