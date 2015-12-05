var $ = require('fishfront/ui/global.js');
var dialog = require('fishfront/ui/dialog.js');
var input = require('fishfront/ui/input.js');
var userId = $.location.getQueryArgv('userId');
var user = {};
function getUser(next){
	$.get('/user/get',{userId:userId},function(data){
		data = $.JSON.parse(data);
		if( data.code != 0 ){
			dialog.message(data.msg);
			return;
		}
		user = data.data;
		next();
	});
}
function go(){
	input.verticalInput({
		id:'container',
		field:[
			{id:'name',type:'read',name:'姓名'},
			{id:'password',type:'text',name:'新密码'},
		],
		value:{
			name:user.name
		},
		submit:function(data){
			data = $.extend({userId:userId},{password:data.password});
			$.post('/user/modPassword',data,function(data){
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
getUser(go);