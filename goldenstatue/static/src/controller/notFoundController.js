import NotFoundView from '../view/notFoundView';

export default Controllers.createClass({
	initialize(){
		this.loadView(NotFoundView);
	},
	render(){
		console.log("123");
		return {};
	}
});