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
	getInitialState(){
		return {
			imageTop:'',
			closeHeight:'',
		};
	},
	componentDidMount(){
		var sorryRepeatImage = this.refs.sorryRepeatImage;
		var closeImage = this.refs.closeImage;
		this.setState({
			imageTop:(document.body.offsetHeight - sorryRepeatImage.offsetWidth * 1.2622)/2,
			closeHeight:closeImage.offsetWidth/2,
		})
	},
	render(){
		return (
			<div className={style.dialogPage}>
				<img className={style.background} src='/img/background.png'/>
				<img className={style.imagePage} ref="sorryRepeatImage" src='/img/sorryRepeatPage.png'/>
				<img className={style.closeBtn} style={{top:this.state.imageTop - this.state.closeHeight + 'px'}} ref="closeImage" src='/img/closeBtn.png' onClick={this.props.closeClick} />
				<div className={style.btnMakeCake} onClick={this.props.onClick}></div>
			</div>
		);
	}
});
		