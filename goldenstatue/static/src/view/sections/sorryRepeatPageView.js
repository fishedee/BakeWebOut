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
	closeBtn:{
		width:'11.875%',
		border:'0',
		position:'absolute',
		top:'15%',
		right:'1%',
	},
	btnMakeCake:{
		width:'75.2%',
		height:'9.43%',
		position:'absolute',
		bottom:'20%',
		left:'12.4%',
		cursor:'pointer',
	},
});

export default Views.createClass({
	render(){
		return (
			<div className={style.dialogPage}>
				<img className={style.background} src='/img/background.png'/>
				<img className={style.imagePage} src='/img/sorryRepeatPage.png'/>
				<img className={style.closeBtn} src='/img/closeBtn.png' onClick={this.props.closeClick} />
				<div className={style.btnMakeCake} onClick={this.props.onClick}></div>
			</div>
		);
	}
});
		