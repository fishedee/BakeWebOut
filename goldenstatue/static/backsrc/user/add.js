var $ = require('fishfront/ui/global.js');
var dialog = require('fishfront/ui/dialog.js');
var input = require('fishfront/ui/input.js');
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
	input.verticalInput({
		id:'container',
		field:[
			{id:'name',type:'text',name:'姓名'},
			{id:'password',type:'text',name:'密码'},
			{id:'type',type:'enum',name:'类型',map:userType},
		],
		submit:function(data){
			$.post('/user/add',data,function(data){
				data = $.JSON.parse(data);
				if( data.code != 0 ){
					dialog.message(data.msg);
					return;
				}
				history.back();
			});
		},
		cancel:function(){
			history.back();
		}
	});
}
getType(go);