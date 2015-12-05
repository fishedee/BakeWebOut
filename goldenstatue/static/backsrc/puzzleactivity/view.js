var $ = require('fishfront/ui/global.js');
var dialog = require('fishfront/ui/dialog.js');
var input = require('fishfront/ui/input.js');
var contentId = $.location.getQueryArgv('contentId');
var activity = {};
function getActivity(next){
	$.get('/puzzleactivity/get',{contentId:contentId},function(data){
		data = $.JSON.parse(data);
		if( data.code != 0 ){
			dialog.message(data.msg);
			return;
		}
		activity = data.data;
		next();
	});
}
function go(value){
	input.verticalInput({
		id:'container',
		field:[
			{id:'title',type:'text',name:'标题'},
			{id:'beginTime',type:'time',name:'活动开始时间'},
			{id:'endTime',type:'time',name:'活动结束时间'},
		],
		value:activity,
		submit:function(data){
			if( contentId == null ){
				$.post('/puzzleactivity/add',data,function(data){
					data = $.JSON.parse(data);
					if( data.code != 0 ){
						dialog.message(data.msg);
						return;
					}
					history.back();
				});
			}else{
				data = $.extend({contentId:contentId},data);
				$.post('/puzzleactivity/mod',data,function(data){
					data = $.JSON.parse(data);
					if( data.code != 0 ){
						dialog.message(data.msg);
						return;
					}
					history.back();
				});
			}
		},
		cancel:function(){
			history.back();
		}
	});
}
if( contentId == null ){
    go();
}else{
	getActivity(go);
}