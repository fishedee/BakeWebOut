import ReactFetch from 'fishfront/react/react-fetch';

export default Models.createClass({
	mixins:[ReactFetch],
	name:'appModel',
	initialize(){
		this.state = Immutable.fromJS({});
	},
	async fetchData(link){
		var url = 'http://api.goldenstatue.test2.hongbeibang.com/puzzleactivity/'+link;
		var result = await this.fetch(url,{credentials:'include'});
		result = await result.json();
		console.log(result);
		this.state = Immutable.fromJS(result.data);
	},
	async fetchPostData(link){
		var url = 'http://api.goldenstatue.test2.hongbeibang.com/puzzleactivity/'+link;
		var result = await this.fetch(url,{method:'post',credentials:'include'});
		result = await result.json();
		console.log(result);
		await this.fetchData('getComponentInfo?contentId=10001&clientId=10001');
		return Immutable.fromJS(result.data);
	},
	get(){
		return this.state;
	}
});
