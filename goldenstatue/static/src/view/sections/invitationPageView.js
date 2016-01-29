
var style = StyleSheet.create({
	dialogPage:{
		position:'absolute',
		top:'0',
		right:'0',
		bottom:'0',
		left:'0',
		zIndex:'1',
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
		width:'89.22%',
		border:'0'
	},
	btnInvitation:{
		width:'75.2%',
		height:'9.43%',
		position:'absolute',
		bottom:'16%',
		left:'12.4%',
		cursor:'pointer',
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
				<img className={style.imagePage} src='/img/invitationPage.png' />
				<div className={style.btnInvitation} onClick={this.props.onClick}></div>
			</div>
		);
	}
});
		