
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
		width:'89.22%',
		height:'11.357%',
		position:'absolute',
		bottom:'6.5%',
		left:'5.4%',
		cursor:'pointer',
	},
	loginPhoneNum:{
		width:'48.75%',
		height:'3.85%',
		fontSize:'16px',
		fontWeight:'bolder',
		backgroundColor:'#fcd54a',
		position:'absolute',
		top:'39.3%',
		left:'34.4%',
		border:'none',
		outline:'none',
	},
	loginCode:{
		width:'28.44%',
		height:'3.85%',
		fontSize:'16px',
		fontWeight:'bolder',
		backgroundColor:'#fcd54a',
		position:'absolute',
		top:'55%',
		left:'35.5%',
		border:'none',
		outline:'none',
	},
	btnGetCode:{
		width:'19.375%',
		height:'4.75%',
		position:'absolute',
		top:'56%',
		right:'15.6%',
		cursor:'pointer',
	},
});

export default Views.createClass({
	changePage(){
		this.props.changePage();
	},
	getCode(){
		this.props.getCode();
	},
	render(){
		return (
			<div className={style.dialogPage}>
				<img className={style.imagePage} src='/img/loginPage.png' />
				<input type='text' className={style.loginPhoneNum} autoFocus />
				<input type='text' className={style.loginCode} />
				<div className={style.btnGetCode} onClick={this.getCode}></div>
				<div className={style.btnEnsure} onClick={this.changePage}></div>
			</div>
		);
	}
});
		