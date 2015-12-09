
var style = StyleSheet.create({
	loading:{
		position:'relative',
		top:'0',
		left:'0',
		bottom:'0',
		right:'0',
		margin:'auto',
		backgroundColor:'#fcd54a',
	},
	loadingImg:{
		width:'100%',		
		height:'100%',
		border:'0',
	}
});

export default Views.createClass({
	render(){
		return (
			<div className={style.loading}>
				<img className={style.loadingImg} src='/gif/loading.gif' />
			</div>
		);
	}
});