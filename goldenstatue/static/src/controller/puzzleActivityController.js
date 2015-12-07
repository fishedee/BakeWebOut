import PuzzleActivityView from '../view/puzzleActivityView';
import LoginModel from '../model/loginModel';
import ReactLocation from 'fishfront/react/react-location';

export default Controllers.createClass({
	mixins:[ReactLocation],
	initialize(){
		this.loadView(PuzzleActivityView);
		this.loadModel(LoginModel);
	},
	async onCreate(){
		var contentId = this.getSegment(1);
		this.loginInfo = await this.loginModel.get();
		if(this.loginInfo != null ){
			this.go('/puzzleactivity/'+contentId+'/'+this.loginInfo.get("clientId"));
		}
	},
	render(){
		return {};
	}
});