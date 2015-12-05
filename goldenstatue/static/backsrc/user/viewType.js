var $ = require('fishfront/ui/global.js');
var dialog = require('fishfront/ui/dialog.js');
var input = require('fishfront/ui/input.js');
var userId = $.location.getQueryArgv('userId');
var userType = {};
var user = {};
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
			{id:'type',type:'enum',name:'类型',map:userType},
		],
		value:user,
		submit:function(data){
			data = {userId:userId,type:data.type};
			$.post('/user/modType',data,function(data){
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
getType(function(){
	getUser(go);
});