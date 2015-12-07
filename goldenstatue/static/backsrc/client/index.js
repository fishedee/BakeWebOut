var $ = require('fishfront/ui/global.js');
var dialog = require('fishfront/ui/dialog.js');
var query = require('fishfront/ui/query.js');
function go(){
	query.simpleQuery({
		id:'container',
		url:'/client/search',
		column:[
			{id:'clientId',type:'text',name:'用户ID'},
			{id:'name',type:'text',name:'姓名'},
			{id:'image',type:'image',name:'头像'},
			{id:'openId',type:'text',name:'微信ID'},
			{id:'createTime',type:'text',name:'创建时间'},
			{id:'modifyTime',type:'text',name:'修改时间'},
		],
		queryColumn:['name'],
		operate:[],
		button:[],
	});
}
go();