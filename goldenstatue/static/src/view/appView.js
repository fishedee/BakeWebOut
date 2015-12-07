import DocumentHead from 'fishfront/react/react-document-head';

var style = StyleSheet.create({
	body:{
		padding:'0',
		//backgroundColor:'#fcd54a',
		maxWidth:'500px',
		height:'100%',
		margin:'0 auto',
		position:'relative',
		overflow:'hidden',
	}
});

export default Views.createClass({
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
				{this.props.isLogin?this.props.children:null}
			</div>
		);
	}
});