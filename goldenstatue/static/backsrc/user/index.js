var $ = require('fishfront/ui/global.js');
var dialog = require('fishfront/ui/dialog.js');
var query = require('fishfront/ui/query.js');
var userType = {};
function getType(next){
	$.get('/user/getType',{},function(data){
		data = $.JSON.parse(data);
		if( data.code != 0){
			dialog.message(data.msg);
			return;
		}
		userType = data.data;
		next();
	});
}
function go(){
	console.log(query);
	query.simpleQuery({
		id:'container',
		url:'/user/search',
		column:[
			{id:'userId',type:'text',name:'用户ID'},
			{id:'name',type:'text',name:'姓名'},
			{id:'type',type:'enum',name:'类型',map:userType},
			{id:'createTime',type:'text',name:'创建时间'},
			{id:'modifyTime',type:'text',name:'修改时间'},
		],
		queryColumn:['name','type'],
		operate:[
		{
			name:'修改类型',
			click:function(data){
				location.href = 'viewType.html?userId='+data.userId;
			}
		},
		{
			name:'修改密码',
			click:function(data){
				location.href = 'viewPassword.html?userId='+data.userId;
			}
		},
		{
			name:'删除',
			click:function(data){
				dialog.confirm('确认删除该用户，不可回退操作？!',function(){
					$.post('/user/del',{userId:data.userId},function(data){
						data = $.JSON.parse(data);
						if( data.code != 0 ){
							dialog.message(data.msg);
							return;
						}
						location.reload();
					});
				});
			}
		}],
		button:[
		{
			name:'添加用户',
			click:function(){
				location.href = 'add.html';
			}
		}
		],
	});
}
getType(go);