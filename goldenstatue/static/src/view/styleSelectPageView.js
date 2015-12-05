import ClientImage from './clientImageView';
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
		width:'89.22%',
		height:'11.357%',
		position:'absolute',
		bottom:'5%',
		left:'4%',
		cursor:'pointer',
	},
	headSculpture:{
		width:'23.75%',
		position:'absolute',
		top:'17.5%',
		left:'0',
		right:'0',
		marginLeft:'auto',
		marginRight:'auto',
	},
	styleList:{
		width:'80%',
		height:'32%',
		position:'absolute',
		top:'37%',
		left:'10%',
	},
	styleTextImage:{
		position:'absolute',
		border:'0',
		width:'45%',
		cursor:'pointer',
	},
	styleChiffon:{
		top:'0',
		left:'0',
	},
	styleMissCheese:{
		top:'0',
		right:'0',
	},
	styleBenji:{
		top:'37.5%',
		left:'0',
	},
	styleCoco:{
		top:'37.5%',
		right:'0',
	},
	styleCheese:{
		bottom:'0',
		left:'0',
	},
	styleMousse:{
		bottom:'0',
		right:'0',
	},
});

var styleTextImage = Immutable.fromJS([
	{key:'styleChiffon', className:style.styleChiffon, ordinaryImage:'styleChiffon', selectImage:'styleChiffonSelect', isSelectImage:true},
	{key:'styleMissCheese', className:style.styleMissCheese, ordinaryImage:'styleMissCheese', selectImage:'styleMissCheeseSelect', isSelectImage:false},
	{key:'styleBenji', className:style.styleBenji, ordinaryImage:'styleBenji', selectImage:'styleBenjiSelect', isSelectImage:false},
	{key:'styleCoco', className:style.styleCoco, ordinaryImage:'styleCoco', selectImage:'styleCocoSelect', isSelectImage:false},
	{key:'styleCheese', className:style.styleCheese, ordinaryImage:'styleCheese', selectImage:'styleCheeseSelect', isSelectImage:false},
	{key:'styleMousse', className:style.styleMousse, ordinaryImage:'styleMousse', selectImage:'styleMousseSelect', isSelectImage:false},
]);

var StyleImageList = React.createClass({
	selectClick(index){
		this.props.onClick(index);
	},
	render(){
		var self = this;
		var imageData = this.props.styleTextImage.map(function(e,i){
			var data = e.get("isSelectImage") ? e.get("selectImage") : e.get("ordinaryImage");
			return (
				<img key={e.get("key")} 
					className={classnames(style.styleTextImage,e.get("className"))} 
					src={'/img/'+data+'.png'}
					onClick={self.selectClick.bind(self,i)} />
			)
		}); 
		return (
			<div>
				{imageData}
			</div>
		);
	}
});

export default Views.createClass({
	getInitialState(){
		return {
			styleImageData:styleTextImage,
			styleName:'styleChiffon',
		};
	},
	selectClick(index){
		var newData = this.state.styleImageData;
		if(!newData.getIn([index,'isSelectImage'])){
			for(var i=0; i!=newData.size; ++i){
				newData=newData.setIn([i,'isSelectImage'],false);
			}
			newData=newData.setIn([index,'isSelectImage'],true);
			this.state.styleName = newData.getIn([index,'key']);
		}
		this.setState({
			styleImageData:newData,
			styleName:this.state.styleName,
		});
	},
	changePage(pageName){
		this.props.changePage(pageName,this.state.styleName);
	},
	render(){
		return (
			<div className={style.dialogPage}>
				<img className={style.imagePage} src='/img/styleSelectPage.png' />
				<ClientImage className={style.headSculpture} src='http://image.hongbeibang.com/FneBp_v3aQEE2eI8DPWlbXmrFVKW' />
				<div className={style.styleList}>
					<StyleImageList onClick={this.selectClick} styleTextImage = {this.state.styleImageData} />
				</div>
				<div className={style.btnEnsure} onClick={this.changePage.bind(null,'materialPage')}></div>
			</div>
		);
	}
});
		