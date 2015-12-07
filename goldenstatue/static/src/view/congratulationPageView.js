
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
		var puzzleData = this.props.puzzleData;

		switch(puzzleData.get("puzzleId")){
			case 1 : 
				var text = '/img/congratulateText2.png';
				var gifImage = '/gif/gifFlour.gif';
				break;
			case 2 :
				var text = '/img/congratulateText1.png';
				var gifImage = '/gif/gifEggs.gif';
				break;
			case 3 :
				var text = '/img/congratulateText4.png';
				var gifImage = '/gif/gifMilk.gif';
				break;
			case 4 :
				var text = '/img/congratulateText6.png';
				var gifImage = '/gif/gifSugar.gif';
				break;
			case 5 :
				var text = '/img/congratulateText5.png';
				var gifImage = '/gif/gifOil.gif';
				break;
			case 6 :
				var text = '/img/congratulateText3.png';
				var gifImage = '/gif/gifMicrowaveOven.gif';
				break;
			default :
				break;
		}

		if(this.props.isPuzzleClient){
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
				<img className={style.congratulateText} src={text} />
				<img className={style.gifImageWrap} src='/img/gifImageWrap.png' />
				<img className={style.gifImageWrap} src={gifImage} />
				<div className={style.btnAskHelp} onClick={this.changePage.bind(null,pageName)}></div>
			</div>
		);
	}
});
		