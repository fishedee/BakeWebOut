import classnames from 'classnames';

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
	btnEnsure:{
		width:'75.625%',
		height:'9.625%',
		position:'absolute',
		bottom:'8.5%',
		left:'12.2%',
		cursor:'pointer',
	},
	input:{
		width:'56%',
		height:'5.29%',
		fontSize:'16px',
		fontWeight:'bolder',
		backgroundColor:'#fcd54a',
		position:'absolute',
		border:'none',
		outline:'none',
		left:'31%',
	},
	winningName:{
		top:'38%',
	},
	winningPhoneNum:{
		top:'50.8%',
	},
	winningAddress:{
		top:'63.6%',
	},
});

export default Views.createClass({
	changePage(pageName){
		this.props.changePage(pageName);
	},
	render(){
		return (
			<div className={style.dialogPage}>
				<img className={style.imagePage} src='/img/winningPage.png' />
				<input type='text' className={classnames(style.winningName,style.input)} autoFocus />
				<input type='text' className={classnames(style.winningPhoneNum,style.input)} />
				<input type='text' className={classnames(style.winningAddress,style.input)} />
				<div className={style.btnEnsure} onClick={this.changePage.bind(null,'invitationPage')}></div>
			</div>
		);
	}
});
		