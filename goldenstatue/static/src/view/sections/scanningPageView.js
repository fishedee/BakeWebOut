
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
});

export default Views.createClass({
	render(){
		return (
			<div className={style.dialogPage} onClick={this.props.onClick}>
				<img className={style.background} src='/img/background.png'/>
				<img className={style.imagePage} src='/img/scanningPage.png' />
			</div>
		);
	}
});
		