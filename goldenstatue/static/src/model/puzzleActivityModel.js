import BaseModel from './baseModel';

export default Models.createClass({
	mixins:[BaseModel],
	name:'puzzleActivityModel',
	initialize(){
		this.state = Immutable.fromJS({});
	},
	async fetchComponentInfo(contentId,clientId){
		var key = contentId+"_"+clientId;
		var data = await this.fetchGet('/puzzleactivity/getComponentInfo',{
			contentId:contentId,
			clientId:clientId
		});
		this.state = this.state.setIn([key],data);
		return data;
	},
	async setComponentTitle(contentId,clientId,titleId){
		await this.fetchPost('/puzzleactivity/setComponentTitle',{
			contentId:contentId,
			clientId:clientId,
			titleId:titleId
		});
	},
	async addComponentPuzzle(contentId,clientId){
		return await this.fetchPost('/puzzleactivity/addComponentPuzzle',{
			contentId:contentId,
			clientId:clientId
		});
	},
	async setComponentAddress(contentId,clientId,name,phoneNumber,address){
		await this.fetchPost('/puzzleactivity/setComponentAddress',{
			contentId:contentId,
			clientId:clientId,
			name:name,
			phone:phoneNumber,
			address:address
		});
	},
	get(contentId,clientId){
		var key = contentId+"_"+clientId;
		return this.state.getIn([key])
	}
});
