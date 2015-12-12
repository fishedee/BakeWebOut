import LoadingPage from './sections/loadingPageView';

export default Views.createClass({
	componentDidMount(){
		var contentId = this.props.contentId;
		var loginClient = this.props.loginClient ;
		if(loginClient != null ){
			this.go('/puzzleactivity/'+contentId+'/'+loginClient.get("clientId"));
		}
	},
	render(){
		return (
			<LoadingPage />
		);
	}
});