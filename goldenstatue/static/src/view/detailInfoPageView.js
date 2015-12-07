import ClientImage from './clientImageView';

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
	closeBtn:{
		width:'11.875%',
		border:'0',
		position:'absolute',
		top:'15%',
		right:'1%',
	},
	btnIKnow:{
		width:'75.2%',
		height:'9.43%',
		position:'absolute',
		bottom:'15%',
		left:'12.2%',
		cursor:'pointer',
	},
	detailScoll:{
		width:'65%',
		height:'33%',
		position:'absolute',
		top:'24%',
		left:'0',
		right:'0',
		marginLeft:'auto',
		marginRight:'auto',
		overflowX:'hidden',
		overflowY:'auto',
	},
	headSculpture:{
		width:'22.356%',
		position:'relative',
		verticalAlign:'middle',
		display:'inline-block',
	},
	info:{
		letterSpacing:'1.5px',
		width:'73.644%',
		color:'#000',
		fontSize:'16px',
		wordWrap:'break-word',
		marginLeft:'2%',
		lineHeight:'1.3em',
		verticalAlign:'middle',
		display:'inline-block',
	},
	detailWrap:{
		position:'relative',
		margin:'5% 0',
	},
	placeholder:{
		overflow:'hidden',
		width:'0',
		minHeight:'inherit',
		height:'inherit',
		verticalAlign:'middle',
		display:'inline-block',
	},
});

export default Views.createClass({
	changePage(){
		this.props.changePage();
	},
	render(){
		var data = this.props.materialData.get("allPuzzle").map(function(e,i){
			switch(e.get("puzzleId")){
				case 1 : 
					var materialName = '面粉';
					break;
				case 2 :
					var materialName = '鸡蛋';
					break;
				case 3 :
					var materialName = '牛奶';
					break;
				case 4 :
					var materialName = '糖分';
					break;
				case 5 :
					var materialName = '油';
					break;
				case 6 :
					var materialName = '烤箱';
					break;
				default :
					break;
			}
			if(e.get("type")==1){
				var successOrNot = '成功';
			}else{
				var successOrNot = '失败';
			}
			return (
				<div key={'detail'+i} className={style.detailWrap}>
					<ClientImage className={style.headSculpture} src={e.get("clientImage")} />
					<div className={style.placeholder}></div>
					<div className={style.info}>
						{e.get("clientName")+'帮你收集'+materialName+successOrNot}
					</div>
				</div>
			);
		});
		return (
			<div className={style.dialogPage}>
				<img className={style.imagePage} src='/img/detailPage.png' />
				<img className={style.closeBtn} src='/img/closeBtn.png' onClick={this.changePage} />
				<div className={style.detailScoll}>{data}</div>
				<div className={style.btnIKnow} onClick={this.changePage}></div>
			</div>
		);
	}
});
		