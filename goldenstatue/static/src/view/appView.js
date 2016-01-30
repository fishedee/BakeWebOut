import DocumentHead from 'fishfront/react/react-document-head';
import Env from 'fishfront/runtime/env';
import LoadingPage from './sections/loadingPageView';

var style = StyleSheet.create({
	body:{
		padding:'0',
		//backgroundColor:'#fcd54a',
		maxWidth:'500px',
		height:'100%',
		margin:'0 auto',
		position:'relative',
		overflow:'hidden',
	},
});

export default Views.createClass({
	async componentDidMount(){
		await this.props.checkIsLogin();
		if( this.props.isLogin == false ){
			var loginUrl = await this.props.getLoginUrl();
			location.href = loginUrl;
		}
	},
	render(){
		var entryJs = '';
		if( Env.isInNode() && this.props.webpackJson.main){
			entryJs = this.props.webpackJson.main.js;
		}
		return (
			<div className={style.body}>
				<DocumentHead
					meta={[
						{charset:"utf-8"},
						{name:"description",content:"Hacker News clone written in ReactJS, RefluxJS, and Firebase"},
						{name:"viewport",content:"width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=0"},
					]}
					link={[
						{type:"text/css",rel:"stylesheet",href:"/index.css"}
					]}
					title={"金像美玫烘焙馆"}
					script={[
						{src:"http://cdn.datastory.com.cn/js/pre-ds-min.js?dsTid=1d8c8877-3f8c-4670-9fdd-2796b92bfc86",id:"DS_PRE_JS"},
						{src:'http://res.wx.qq.com/open/js/jweixin-1.0.0.js'},
						{src:entryJs}
					]} />
				{this.props.isLogin ? 
					this.props.children
					: <LoadingPage />
				}
			</div>
		);
	}
});