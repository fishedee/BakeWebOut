var $ = require('fishfront/ui/global.js');
var dialog = require('fishfront/ui/dialog.js');
var input = require('fishfront/ui/input.js');
var name = $.location.getQueryArgv('name');
var config = {name:name};
function getConfig(next){
	$.get('/config/get',{name:name},function(data){
		data = $.JSON.parse(data);
		if( data.code != 0 ){
			dialog.message(data.msg);
			return;
		}
		config.value = data.data;
		next();
	});
}
function go(value){
	input.verticalInput({
		id:'container',
		field:[
			{id:'name',type:'text',name:'配置项'},
			{id:'value',type:'text',name:'配置值'}
		],
		value:config,
		submit:function(data){
			dialog.confirm('设置不正确可能会导致全站崩溃，确认设置么？',function(){			
				$.post('/config/set',data,function(data){
					data = $.JSON.parse(data);
					if( data.code != 0 ){
						dialog.message(data.msg);
						return;
					}
					history.back();
				});
			});
		},
		cancel:function(){
			history.back();
		}
	});
}
getConfig(go);