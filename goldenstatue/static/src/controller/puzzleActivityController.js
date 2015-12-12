import PuzzleActivityView from '../view/puzzleActivityView';
import LoginModel from '../model/loginModel';
import ReactLocation from 'fishfront/react/react-location';

export default Controllers.createClass({
	mixins:[ReactLocation],
	initialize(){
		this.loadView(PuzzleActivityView);
		this.loadModel(LoginModel);
		this.contentId = this.getSegment(1);
	},
	render(){
		return {
			loginClient:this.loginModel.get(),
			contentId:this.contentId
		};
	}
});