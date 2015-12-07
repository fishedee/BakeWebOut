
var style = StyleSheet.create({
	dialogPage:{
		position:'absolute',
		top:'0',
		right:'0',
		bottom:'0',
		left:'0',
		zIndex:'1',
		background:'rgba(0,0,0,.6)',
	},
	shareImage:{
		width:'30%',
		border:'0',
		position:'absolute',
		top:'0',
		right:'0',
	},
	shareTip:{
		color:'#fff',
		fontSize:'20px',
		width:'50%',
		position:'absolute',
		top:'14%',
		right:'2%',	
	},
});

export default Views.createClass({
	changePage(pageName){
		this.props.changePage(pageName);
	},
	render(){
		return (
			<div className={style.dialogPage} onClick={this.changePage.bind(null,'scanningCodePage')}>
				<img className={style.shareImage} src='/img/shareImage.png' />
				<div className={style.shareTip} >
					<p>咦,</p>
					<p>这里有个按钮</p>
				</div>
			</div>
		);
	}
});
		