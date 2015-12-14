
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
	btnGetGift:{
		width:'75.2%',
		height:'9.43%',
		position:'absolute',
		bottom:'15%',
		left:'12.2%',
		cursor:'pointer',
	},
	text:{
		width:'71%',
		height:'13%',
		position:'absolute',
		top:'34%',
		left:'0',
		right:'0',
		marginLeft:'auto',
		marginRight:'auto',
		fontSize:'16px',
		fontWeight:'bolder',
		textAlign:'center',
		lineHeight:'1.3em',
		letterSpacing:'1.5px',

		' p':{
			margin:'0',
			padding:'0',
		}
	},
});

export default Views.createClass({
	changePage(pageName){
		this.props.changePage(pageName);
	},
	getInitialState(){
		return {
			image:'/gif/merge.gif'
		};
	},
	componentDidMount(){
		var self = this;
		setTimeout(
			function(){
				self.setState({
					image:'/img/getGiftPage.png',
				});
				setTimeout(function(){self.refs.show.style.display="block"},100);
			}
		,1000);
	},
	render(){
		//var lastIndex = this.props.lastPuzzle.size - 1;
		var firstPuzzleName = this.props.lastPuzzle.getIn([0,"clientName"]);
		return (
			<div className={style.dialogPage}>
				<img className={style.imagePage} src={this.state.image} />
				<div style={{display:'none'}} ref='show'>
					<div className={style.text}>
						<p>{'哇～'+firstPuzzleName}</p>
						<p>帮你收集了最后一份原料</p>
						<p>戚风蛋糕已新鲜出炉了！</p>
						<p>快去领取你的礼物吧！</p>
					</div>
					<div className={style.btnGetGift} onClick={this.props.onClick}></div>
				</div>
			</div>
		);
	}
});
		