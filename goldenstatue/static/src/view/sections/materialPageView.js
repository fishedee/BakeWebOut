import classnames from 'classnames';
import ClientImage from './clientImageView';

var style = StyleSheet.create({
	imagePage:{
		width:'100%',
		height:'100%',
		border:'0'
	},
	image:{
		width:'100%',
		border:'0'
	},
	flag:{
		width:'26.25%',
		position:'absolute',
		top:'17%',
		left:'0',
		border:'0'
	},
	btnActivityRule:{
		width:'23%',
		height:'3.7%',
		position:'absolute',
		top:'2.675%',
		right:'4.67%',
		cursor:'pointer',
	},
	headSculpture:{
		width:'27%',
		position:'absolute',
		top:'31.2%',
		left:'36.3%',
	},
	name:{
		width:'25%',
		position:'absolute',
		top:'35%',
		left:'6%',
	},
	imageName:{
		width:'68.75%',
		border:'0'
	},
	nameTitle:{
		width:'29.53%',
		position:'absolute',
		top:'35%',
		left:'69%',
	},
	clientName:{
		marginTop:'5px',
		wordWrap:'break-word',
		fontSize:'14px',
		fontWeight:'bolder',
		letterSpacing:'1.5px',
		color:'#000',
	},
	materialBox:{
		width:'100%',
		height:'28.68%',
		position:'absolute',
		bottom:'23%',
		left:'0',
	},
	gifBrightImage:{
		width:'30%',
		position:'absolute',
		border:'0'
	},
	gifStyleFlour:{
		bottom:'35%',
		left:'7.5%',
	},
	gifStyleEggs:{
		bottom:'35%',
		left:'36%',
	},
	gifStyleMilk:{
		bottom:'35%',
		left:'63%',
	},
	gifStyleSugar:{
		bottom:'-2%',
		left:'7.5%',
	},
	gifStyleOil:{
		bottom:'-2%',
		left:'36%',
	},
	gifStyleMicrowaveOven:{
		bottom:'-4%',
		left:'64%',
	},
	materialImage:{
		position:'absolute',
		border:'0'
	},
	jigsawFlour:{
		width:'13.5%',
		bottom:'49.9%',
		left:'15.5%',
	},
	jigsawEgg:{
		width:'13.8%',
		bottom:'56.5%',
		left:'44%',
	},
	jigsawMilk:{
		width:'11.156%',
		bottom:'51.5%',
		left:'72%',
	},
	jigsawSugar:{
		width:'15.06%',
		bottom:'15%',
		left:'15%',
	},
	jigsawOil:{
		width:'12.84%',
		bottom:'16%',
		left:'44%',
	},
	jigsawMicrowaveOven:{
		width:'17.4%',
		bottom:'17%',
		left:'70%',
	},
	btnMakeCakeOrHelpPeople:{
		width:'89.22%',
		position:'absolute',
		bottom:'8.5%',
		left:'4%',
	},
	radioWrap:{
		position:'absolute',
		bottom:'-0.9%',
		right:'0',
		width:'85%',
		height:'4.427%',
		overflow:'hidden',
		wordBreak:'keep-all',
		whiteSpace:'nowrap',
	},
	radio:{
		width:'auto',
		color:'#fcd54a',
		fontSize:'16px',
		letterSpacing:'1.5px',
	},
});

var materialData = Immutable.fromJS([
	{key:'jigsawFlour', className:style.jigsawFlour, ordinaryImage:'/img/jigsawFlour.png', selectImage:'/img/jigsawFlour1.png',gifImage:'/gif/gifFlour.gif',gifStyle:style.gifStyleFlour},
	{key:'jigsawEgg', className:style.jigsawEgg, ordinaryImage:'/img/jigsawEgg.png', selectImage:'/img/jigsawEgg1.png',gifImage:'/gif/gifEggs.gif',gifStyle:style.gifStyleEggs},
	{key:'jigsawMilk', className:style.jigsawMilk, ordinaryImage:'/img/jigsawMilk.png', selectImage:'/img/jigsawMilk1.png',gifImage:'/gif/gifMilk.gif',gifStyle:style.gifStyleMilk},
	{key:'jigsawSugar', className:style.jigsawSugar, ordinaryImage:'/img/jigsawSugar.png', selectImage:'/img/jigsawSugar1.png',gifImage:'/gif/gifSugar.gif',gifStyle:style.gifStyleSugar},
	{key:'jigsawOil', className:style.jigsawOil, ordinaryImage:'/img/jigsawOil.png', selectImage:'/img/jigsawOil1.png',gifImage:'/gif/gifOil.gif',gifStyle:style.gifStyleOil},
	{key:'jigsawMicrowaveOven', className:style.jigsawMicrowaveOven, ordinaryImage:'/img/jigsawMicrowaveOven.png', selectImage:'/img/jigsawMicrowaveOven1.png',gifImage:'/gif/gifMicrowaveOven.gif',gifStyle:style.gifStyleMicrowaveOven},
]);

export default Views.createClass({
	componentDidMount(){
		var radioWrap = this.refs.radioWrap;
		var radio = this.refs.radio;
		var radio2 = this.refs.radio2;
		radio2.innerHTML = radio.innerHTML;
		this.timer = setInterval(function(){
			if(radio.offsetWidth <= radioWrap.scrollLeft){
				radioWrap.scrollLeft -= radio.offsetWidth;
			}else{
				radioWrap.scrollLeft++;
			}
		},30);

		
		if(!this.props.isPuzzleClient && (this.props.state==1)){
			alert('好友还没开始游戏呢,你也来制作一个蛋糕吧!');
			this.go('/puzzleactivity/'+this.props.contentId+"/"+this.props.loginClient.get("clientId"));
			//this.changePage('rulePage');
		}
		
		
	},
	componentWillUnMount(){
		clearInterval(this.timer);
	},
	getInitialState(){
		return {
			index:null,
		};
	},
	changePage(pageName){
		this.props.changePage(pageName);
	},
	makeCakeClick(puzzleId){
		this.props.changePage();
		this.props.makeCakeClick(puzzleId);
	},
	makeCakeSecondClick(){
		this.props.changePage();
		this.props.makeCakeSecondClick();
	},
	selectClick(index){
		var self = this;
		this.setState({
			index:index,
		});
		setTimeout(function(){
			self.setState({
				index:null,
			});
		},2000);
	},
	render(){
		var data = this.props.materialData;
		var self = this;

		switch(data.getIn(["component","titleId"])){
			case 0 : 
				var styleName = null;
				var styleTitle = null;
				break;
			case 1 : 
				var styleName = '/img/nameChiffon.png';
				var styleTitle = '/img/titleChiffon.png';
				break;
			case 2 :
				var styleName = '/img/nameMissCheese.png';
				var styleTitle = '/img/titleMissCheese.png';
				break;
			case 3 :
				var styleName = '/img/nameBenji.png';
				var styleTitle = '/img/titleBenji.png';
				break;
			case 4 :
				var styleName = '/img/nameCoco.png';
				var styleTitle = '/img/titleCoco.png';
				break;
			case 5 :
				var styleName = '/img/nameCheese.png';
				var styleTitle = '/img/titleCheese.png';
				break;
			case 6 :
				var styleName = '/img/nameMousse.png';
				var styleTitle = '/img/titleMousse.png';
				break;
			default :
				break;
		}
		var newData = materialData.map(function(e,i){

			var puzzle = data.getIn(["puzzle",i]);
			if(!puzzle){
				var image = e.get("ordinaryImage");
			}else{
				var image = e.get("selectImage");
			}
			if(self.state.index != null){
				var gifImage = materialData.getIn([self.state.index,"gifImage"]);
			}
			if(data.get("isPuzzle")){
				var makeCakeClickLink = image==e.get("ordinaryImage") ? self.makeCakeSecondClick : self.selectClick.bind(self,i);
			}else{
				var makeCakeClickLink = image==e.get("ordinaryImage") ? self.makeCakeClick.bind(self,i+1) : self.selectClick.bind(self,i);
			}
			return (
				<div key={e.get("key")}>
					<img className={classnames(style.materialImage,e.get("className"))} 
						src={self.state.index==i ? gifImage : image}
						onClick={makeCakeClickLink} />
					{(self.props.brightImageIndex != null) && (self.props.brightImageIndex == i) ?
						<img className={classnames(style.gifBrightImage,e.get("gifStyle"))} src='/gif/gifLine.gif' />
						:null
					}
				</div>
			);
		});
		if(data.get("isPuzzle")){

			var makeCakeClickLink = this.props.isPuzzleClient ? 
				this.changePage.bind(null,'sharePage')
				:this.makeCakeSecondClick;
		}else{
			var makeCakeClickLink = this.makeCakeClick.bind(null,0);
		}
		if(data.get("radio").size != 0){
			var radioData = data.get("radio").map(function(e){
				return (' 嘭～小伙伴'+e.get("clientName")+'烘焙出了戚风蛋糕！！！ ')
			});
		}else{
			var radioData = "";
		}
		return (
			<div>

				<img className={style.imagePage} src='/img/materialPage.png' />
				<img className={style.flag} src='/gif/flag.gif' />
				<div className={style.btnActivityRule} onClick={this.changePage.bind(null,'rulePage')}></div>
				<ClientImage className={style.headSculpture} src={data.get("clientImage")!=""?data.get("clientImage"):null} />
				<div className={style.name}>
					<img className={style.imageName} src={styleName} />
					<div className={style.clientName}>{data.get("clientName")!=""?data.get("clientName"):null}</div>
				</div>
				<div className={style.nameTitle}>
					<img className={style.image} src={styleTitle} />
				</div>
				<div className={style.materialBox}>
					{(this.props.isPuzzleClient && (this.props.state==4)) ? null : newData}
				</div>
				<div className={style.btnMakeCakeOrHelpPeople}>
					<img className={style.image} 
						src={this.props.isPuzzleClient ? '/img/btnMakeCake.png' : '/img/btnHelpPeople.png'} 
						onClick={makeCakeClickLink} />
				</div>
				<div className={style.radioWrap} ref='radioWrap'>
					<span className={style.radio} ref='radio'>{radioData}</span>
					<span className={style.radio} ref='radio2'></span>
				</div>
			</div>
		);
	}
});
		