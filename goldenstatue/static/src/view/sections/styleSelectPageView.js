import ClientImage from './clientImageView';
import classnames from 'classnames';

var style = StyleSheet.create({
	dialogPage:{
		position:'relative',
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
	{key:'styleChiffon', className:style.styleChiffon, ordinaryImage:'styleChiffon', selectImage:'styleChiffonSelect', isSelectImage:false},
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
			titleId:1,
		};
	},
	componentDidMount(){
		var titleId = this.props.materialData.getIn(["component","titleId"]);
		if(titleId != 0){
			titleId = titleId;
		}else{
			titleId = this.state.titleId;
		}
		var newData = this.state.styleImageData;
		for(var i=0; i!=newData.size; ++i){
			newData=newData.setIn([i,'isSelectImage'],false);
		}
		newData=newData.setIn([titleId-1,'isSelectImage'],true);

		this.setState({
			styleImageData:newData,
		});
	},
	selectClick(index){
		var newData = this.state.styleImageData;
		if(!newData.getIn([index,'isSelectImage'])){
			for(var i=0; i!=newData.size; ++i){
				newData=newData.setIn([i,'isSelectImage'],false);
			}
			newData=newData.setIn([index,'isSelectImage'],true);
			this.state.titleId = index+1;
		}
		this.setState({
			styleImageData:newData,
			titleId:this.state.titleId,
		});
	},
	selectStyle(){
		this.props.changePage();
		this.props.selectStyle(this.state.titleId);
	},
	render(){
		var data = this.props.materialData;
		return (
			<div className={style.dialogPage}>
				<img className={style.imagePage} src='/img/styleSelectPage.png' />
				<ClientImage className={style.headSculpture} src={data.get("clientImage")!=""?data.get("clientImage"):null} />
				<div className={style.styleList}>
					<StyleImageList onClick={this.selectClick} styleTextImage = {this.state.styleImageData} />
				</div>
				<div className={style.btnEnsure} onClick={this.selectStyle}></div>
			</div>
		);
	}
});
		