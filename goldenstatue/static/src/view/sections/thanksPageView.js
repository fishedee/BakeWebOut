
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
	closeBtn:{
		width:'11.875%',
		border:'0',
		position:'absolute',
		top:'15%',
		right:'1%',
	},
	btnLetsGo:{
		width:'75.2%',
		height:'9.43%',
		position:'absolute',
		bottom:'15%',
		left:'12.2%',
		cursor:'pointer',
	},
});

export default Views.createClass({

	render(){
		var puzzleData = this.props.puzzleData;
		return (
			<div className={style.dialogPage}>
				<img className={style.imagePage} src='/img/thanksPage.png' />
				<img className={style.closeBtn} src='/img/closeBtn.png' onClick={this.props.closeClick} />
				<div className={style.btnLetsGo} onClick={this.props.onClick}></div>
			</div>
		);
	}
});
		