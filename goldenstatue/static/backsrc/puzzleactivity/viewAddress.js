var $ = require('fishfront/ui/global.js');
var dialog = require('fishfront/ui/dialog.js');
var input = require('fishfront/ui/input.js');
var contentPuzzleActivityComponentId = $.location.getQueryArgv('contentPuzzleActivityComponentId');
var address = {};
function getAddress(next){
	$.get('/puzzleactivity/getComponentAddress',{contentPuzzleActivityComponentId:contentPuzzleActivityComponentId},function(data){
		data = $.JSON.parse(data);
		if( data.code != 0 ){
			dialog.message(data.msg);
			location.reload();
			return;
		}
		address = data.data;
		next();
	});
}
function go(value){
	input.verticalInput({
		id:'container',
		field:[
			{id:'contentPuzzleActivityComponentId',type:'read',name:'参赛作品ID'},
			{id:'name',type:'read',name:'用户名字'},
			{id:'address',type:'read',name:'用户地址'},
			{id:'phone',type:'read',name:'用户手机'},
		],
		value:address,
		submit:undefined,
		cancel:function(){
			history.back();
		}
	});
}
if( contentPuzzleActivityComponentId == null ){
	alert("请指定参赛作品ID！");
}else{
	getAddress(go);
}

