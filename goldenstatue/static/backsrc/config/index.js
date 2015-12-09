var $ = require('fishfront/ui/global.js');
var dialog = require('fishfront/ui/dialog.js');
var query = require('fishfront/ui/query.js');
function go(){
	query.simpleQuery({
		id:'container',
		url:'/config/search',
		column:[
			{id:'configId',type:'text',name:'配置ID'},
			{id:'name',type:'text',name:'配置项'},
			{id:'value',type:'text',name:'配置值'},
			{id:'createTime',type:'text',name:'创建时间'},
			{id:'modifyTime',type:'text',name:'修改时间'},
		],
		queryColumn:['name'],
		operate:[{
			name:'修改',
			click:function(data){
				location.href = 'view.html?name='+data.name;
			}
		}],
		button:[],
	});
}
go();