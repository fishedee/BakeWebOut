
var style = StyleSheet.create({
	dialogPage:{
		position:'absolute',
		top:'0',
		right:'0',
		bottom:'0',
		left:'0',
		zIndex:'1',
	},
	imagePage:{
		width:'100%',
		height:'100%',
		border:'0'
	},
	btnIKnow:{
		width:'74.2%',
		height:'9.43%',
		position:'absolute',
		bottom:'8%',
		left:'13.5%',
		cursor:'pointer',
	},
});
export default Views.createClass({
	changePage(pageName){
		this.props.changePage(pageName);
	},
	render(){
		if(this.props.isPuzzleClient && (this.props.state != 1)){
			var clickLink = this.changePage;
		}else{
			var clickLink = this.changePage.bind(null,'styleSelectPage');
		}
		return (
			<div className={style.dialogPage}>
				<img className={style.imagePage} src='/img/rulePage.png' />
				<div className={style.btnIKnow} onClick={clickLink}></div>
			</div>
		);
	}
});
		