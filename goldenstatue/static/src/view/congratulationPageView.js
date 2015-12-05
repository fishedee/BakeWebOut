
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
	congratulateText:{
		width:'44.53%',
		border:'0',
		position:'absolute',
		top:'30%',
		left:'0',
		right:'0',
		marginLeft:'auto',
		marginRight:'auto',
	},
	gifImageWrap:{
		width:'37.8%',
		border:'0',
		position:'absolute',
		top:'40%',
		left:'0',
		right:'0',
		marginLeft:'auto',
		marginRight:'auto',
	},
	btnAskHelp:{
		width:'75.2%',
		height:'9.43%',
		position:'absolute',
		bottom:'15%',
		left:'12.2%',
		cursor:'pointer',
	},
	closeBtn:{
		width:'11.875%',
		border:'0',
		position:'absolute',
		top:'15%',
		right:'1%',
	},
});

export default Views.createClass({
	changePage(pageName){
		this.props.changePage(pageName);
	},
	render(){
		if(this.props.isLoginClient){
			var backgroundImg = '/img/congratulationPageMine.png';
			var pageName = 'sharePage';
			var closeLink = this.changePage;
		}else{
			var backgroundImg = '/img/congratulationPageHelp.png';
			var pageName = 'rulePage';
			var closeLink = this.changePage.bind(null,'scanningCodePage');
		}
		
		return (
			<div className={style.dialogPage}>
				<img className={style.imagePage} src={backgroundImg} />
				<img className={style.closeBtn} src='/img/closeBtn.png' onClick={closeLink} />
				<img className={style.congratulateText} src='/img/congratulateText1.png' />
				<img className={style.gifImageWrap} src='/img/gifImageWrap.png' />
				<img className={style.gifImageWrap} src='/gif/gifEggs.gif' />
				<div className={style.btnAskHelp} onClick={this.changePage.bind(null,pageName)}></div>
			</div>
		);
	}
});
		