
var style = StyleSheet.create({
	dialogPage:{
		position:'relative',
		zIndex:'1',
		height:'100%',
	},
	imagePage:{
		maxWidth:'500px',
		height:'100%',
		backgroundImage:'url(/img/loginPage.png)',
		backgroundRepeat:'no-repeat',
		backgroundPosition:'center',
		backgroundSize:'100% 100%',
	},
	btnEnsure:{
		width:'89.22%',
		height:'37.857%',
		position:'absolute',
		cursor:'pointer',
		//marginLeft:'5.4%',
		//marginTop:'21%',
		left:'5.4%',
		top:'41%',
	},
	inputWrap:{
		position:'relative',
		height:'50%',
		width:'100%',
		boxSizing:'border-box',
	},
	loginPhoneNum:{
		width:'48.75%',
		height:'21.979%',
		minHeight:'20px',
		fontSize:'16px',
		fontWeight:'bolder',
		backgroundColor:'#fcd54a',
		border:'none',
		outline:'none',
		padding:'0',
		margin:'0',
		//marginTop:'7.3%',
		//marginLeft:'34.4%',
		position:'absolute',
		top:'24%',
		left:'34.4%',
	},
	loginCode:{
		width:'28.44%',
		height:'21.979%',
		minHeight:'20px',
		fontSize:'16px',
		fontWeight:'bolder',
		backgroundColor:'#fcd54a',
		border:'none',
		outline:'none',
		padding:'0',
		margin:'0',
		//marginTop:'4%',
		//marginLeft:'35.5%',
		position:'absolute',
		top:'14%',
		left:'35.5%',
	},
	btnGetCode:{
		width:'20%',
		height:'27.118%',
		cursor:'pointer',
		//marginTop:'6%',
		//marginRight:'15.4%',
		//float:'right',
		position:'absolute',
		top:'18%',
		right:'15.4%',
	},
	top:{
		width:'100%',
		height:'35%',
		float:'left',
	},
	middle:{
		width:'100%',
		height:'35%',
		float:'left',
	},
	bottom:{
		position:'relative',
		width:'100%',
		height:'30%',
		float:'left',
	},
});

export default Views.createClass({
	getInitialState(){
		return {
			phone:'',
			captcha:'',
		};
	},
	onChange(key,event){
		if(key == 'phone'){
			this.setState({
				phone:event.target.value
			});
		}else if(key == 'captcha'){
			this.setState({
				captcha:event.target.value
			});
		}
	},
	registerOnClick(){
		this.props.registerOnClick(this.state.phone,this.state.captcha);
	},
	codeClick(){
		this.props.codeClick(this.state.phone);
	},
	componentDidMount(){
		var loginImage = this.refs.loginImage;
		loginImage.style.width = document.body.offsetWidth;
		loginImage.style.height = document.body.offsetHeight;
	},
	render(){
		return (
			<div className={style.dialogPage}>
				<div ref='loginImage' className={style.imagePage}>
					<div className={style.top}></div>
					<div className={style.middle}>
						<div className={style.inputWrap}>
							<input type='text' className={style.loginPhoneNum} onChange={this.onChange.bind(null,'phone')} autoFocus />
						</div>
						<div className={style.inputWrap}>
							<div className={style.btnGetCode} onClick={this.codeClick}></div>
							<input type='text' className={style.loginCode} onChange={this.onChange.bind(null,'captcha')} />
						</div>
					</div>
					<div className={style.bottom}>
						<div className={style.btnEnsure} onClick={this.registerOnClick}></div>
					</div>
				</div>
			</div>
		);
	}
});
		