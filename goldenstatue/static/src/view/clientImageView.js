
var style = StyleSheet.create({
	clientImage:{
		width:'68.54%',
		border:'0',
		borderRadius:'50%',
		position:'absolute',
		top:'15%',
		left:'16.5%',
	},
	image:{
		width:'100%',
		border:'0'
	},
});
export default Views.createClass({
	render(){
		return (
			<div className={this.props.className}>
				<img className={style.image} src='/img/headSculpture.png' />
				<img className={style.clientImage} src={this.props.src} />
			</div>
		);
	}
});
		