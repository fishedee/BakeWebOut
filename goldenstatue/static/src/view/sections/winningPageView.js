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

var Input = React.createClass({
	render(){
		var inputData = this.props.data.map(function(e){
			return (
				<input key={e.get("key")} type='text' className={classnames(e.get("className"),style.input)} onChange={e.get("onChange")} autoFocus={e.get("autoFocus")} />
			)
		});
		return (
			<div>
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
		this.props.changePage();
		this.props.signInfo(this.state.name,this.state.phoneNumber,this.state.address);
	},
	render(){
		return (
			<div className={style.dialogPage}>
				<img className={style.imagePage} src='/img/winningPage.png' />
				<Input data={Immutable.fromJS([
						{key:'name',className:style.winningName,onChange:this.onChange.bind(null,'name'),autoFocus:true},
						{key:'phoneNumber',className:style.winningPhoneNum,onChange:this.onChange.bind(null,'phoneNumber'),autoFocus:false},
						{key:'address',className:style.winningAddress,onChange:this.onChange.bind(null,'address'),autoFocus:false},
					])} />
				<div className={style.btnEnsure} onClick={this.signInfo}></div>
			</div>
		);
	}
});
		