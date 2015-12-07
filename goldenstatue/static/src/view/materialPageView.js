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
		width:'17.2%',
		position:'absolute',
		top:'35%',
		left:'7%',
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
	{key:'jigsawFlour', className:style.jigsawFlour, ordinaryImage:'jigsawFlour', selectImage:'jigsawFlour1'},
	{key:'jigsawEgg', className:style.jigsawEgg, ordinaryImage:'jigsawEgg', selectImage:'jigsawEgg1'},
	{key:'jigsawMilk', className:style.jigsawMilk, ordinaryImage:'jigsawMilk', selectImage:'jigsawMilk1'},
	{key:'jigsawSugar', className:style.jigsawSugar, ordinaryImage:'jigsawSugar', selectImage:'jigsawSugar1'},
	{key:'jigsawOil', className:style.jigsawOil, ordinaryImage:'jigsawOil', selectImage:'jigsawOil1'},
	{key:'jigsawMicrowaveOven', className:style.jigsawMicrowaveOven, ordinaryImage:'jigsawMicrowaveOven', selectImage:'jigsawMicrowaveOven1'},
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
	changePage(pageName){
		this.props.changePage(pageName);
	},
	makeCakeClick(){
		this.props.changePage();
		this.props.makeCakeClick();
	},
	render(){
		var data = this.props.materialData;

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
			return (
				<img key={e.get("key")} 
					className={classnames(style.materialImage,e.get("className"))} 
					src={'/img/'+image+'.png'} />
			);
		});
		if(data.get("isPuzzle")){

			var makeCakeClickLink = this.props.isPuzzleClient ? 
				this.changePage.bind(null,'sharePage')
				:this.changePage.bind(null,'scanningCodePage');
		}else{
			var makeCakeClickLink = this.makeCakeClick;
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
				<div className={style.btnActivityRule} onClick={this.changePage.bind(null,'rulePage')}></div>
				<ClientImage className={style.headSculpture} src={data.get("clientImage")!=""?data.get("clientImage"):null} />
				<div className={style.name}>
					<img className={style.image} src={styleName} />
					<div className={style.clientName}>{data.get("clientName")!=""?data.get("clientName"):null}</div>
				</div>
				<div className={style.nameTitle}>
					<img className={style.image} src={styleTitle} />
				</div>
				<div className={style.materialBox}>
					{newData}
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
		