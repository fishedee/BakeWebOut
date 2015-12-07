import BaseModel from './baseModel';

export default Models.createClass({
	mixins:[BaseModel],
	name:'puzzleActivityFinishModel',
	initialize(){
		this.state = Immutable.fromJS({});
	},
	async fetchFinishComponentInfo(contentId){
		var key = contentId;
		var data = await this.fetchGet('/puzzleactivity/getFinishComponent',{
			contentId:contentId,
			pageIndex:0,
			pageSize:10
		});
		this.state = this.state.setIn([key],data);
	},
	get(contentId){
		var key = contentId;
		return this.state.getIn([key])
	}
});
