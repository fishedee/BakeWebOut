import classnames from 'classnames';

var style = StyleSheet.create({
	dialogPage:{
		position:'relative',
		zIndex:'1',
		height:'100%',
	},
	imagePage:{
		maxWidth:'500px',
		height:'100%',
		backgroundImage:'url(/img/winningPage.png)',
		backgroundRepeat:'no-repeat',
		backgroundPosition:'center',
		backgroundSize:'100% 100%',
	},
	btnEnsure:{
		width:'75.625%',
		height:'32.0833%',
		position:'absolute',
		cursor:'pointer',
		//marginLeft:'12.2%',
		//marginTop:'21%',
		left:'12.2%',
		top:'40%',
	},
	inputWrap:{
		position:'relative',
		height:'33.333%',
		width:'100%',
		boxSizing:'border-box',
	},
	input:{
		width:'56%',
		height:'45.33%',
		minHeight:'20px',
		fontSize:'16px',
		fontWeight:'bolder',
		backgroundColor:'#fcd54a',
		border:'none',
		outline:'none',
		//marginLeft:'31%',
		position:'absolute',
		left:'31%',
		padding:'0',
		margin:'0',
	},
	winningName:{
		//marginTop:'5%',
		top:'25%',
	},
	winningPhoneNum:{
		//marginTop:'6.3%',
		top:'34%',
	},
	winningAddress:{
		//marginTop:'8.3%',
		top:'45%',
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

var Input = React.createClass({
	render(){
		var self = this;
		var inputData = this.props.data.map(function(e){
			return (
				<div key={e.get("key")} className={style.inputWrap}>
					<input type='text' 
						className={classnames(e.get("className"),style.input)} 
						onChange={e.get("onChange")} 
						autoFocus={e.get("autoFocus")} />
				</div>
			)
		});
		return (
			<div style={{height:'100%'}}>
				{inputData}
			</div>
		)
	}
});

export default Views.createClass({
	getInitialState(){
		return {
			name:'',
			phoneNumber:'',
			address:'',
		};
	},
	onChange(key,event){
		if(key == 'name'){
			this.setState({
				name:event.target.value
			});
		}else if(key == 'phoneNumber'){
			this.setState({
				phoneNumber:event.target.value
			});
		}else if(key == 'address'){
			this.setState({
				address:event.target.value
			});
		}
	},
	signInfo(){
		this.props.onClick(this.state.name,this.state.phoneNumber,this.state.address);
	},
	componentDidMount(){
		var winningImage = this.refs.winningImage;
		winningImage.style.width = document.body.offsetWidth;
		winningImage.style.height = document.body.offsetHeight;
	},
	render(){
		return (
			<div className={style.dialogPage}>
				<div ref='winningImage' className={style.imagePage}>
					<div className={style.top}></div>
					<div className={style.middle}>
						<Input data={Immutable.fromJS([
							{key:'name',className:style.winningName,onChange:this.onChange.bind(null,'name'),autoFocus:true},
							{key:'phoneNumber',className:style.winningPhoneNum,onChange:this.onChange.bind(null,'phoneNumber'),autoFocus:false},
							{key:'address',className:style.winningAddress,onChange:this.onChange.bind(null,'address'),autoFocus:false},
						])} />
					</div>
					<div className={style.bottom}>
						<div className={style.btnEnsure} onClick={this.signInfo}></div>
					</div>
				</div>
			</div>
		);
	}
});
		