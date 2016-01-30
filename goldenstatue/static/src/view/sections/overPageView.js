
var style = StyleSheet.create({
	dialogPage:{
		position:'absolute',
		top:'0',
		right:'0',
		bottom:'0',
		left:'0',
		zIndex:'1',
		background:'#fcd54a',
	},
	background:{
		width:'100%',
		height:'100%',
		border:'0'
	},
	imagePage:{
		position:'absolute',
		top:'0',
		right:'0',
		bottom:'0',
		left:'0',
		margin:'auto',
		width:'83.9%',
		border:'0'
	},
});

export default Views.createClass({
	changePage(pageName){
		this.props.changePage(pageName);
	},
	render(){
		return (
			<div className={style.dialogPage}>
				<img className={style.background} src='/img/background.png'/>
				<img className={style.imagePage} src='/img/overPage.png' />
			</div>
		);
	}
});
		