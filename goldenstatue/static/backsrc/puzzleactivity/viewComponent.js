var $ = require('fishfront/ui/global.js');
var dialog = require('fishfront/ui/dialog.js');
var query = require('fishfront/ui/query.js');
var contentId = $.location.getQueryArgv('contentId');
var titles = {};
var states = {};
function getTitles(next){
	$.get('/puzzleactivity/getTitles', {}, function(data){
		data = $.JSON.parse(data);
		if( data.code != 0 ){
			dialog.message(data.msg);
			return;
		}
		titles = data.data;
		next();
	});
}
function getStates(next){
	$.get('/puzzleactivity/getStates', {}, function(data){
		data = $.JSON.parse(data);
		if( data.code != 0 ){
			dialog.message(data.msg);
			return;
		}
		states = data.data;
		next();
	});
}
function go(){
	var tableOperation = query.simpleQuery({
		id:'container',
		url:'/puzzleactivity/searchComponent',
		column:[
			{id:'contentPuzzleActivityComponentId',type:'text',name:'参赛作品ID'},
			{id:'clientId',type:'text',name:'用户ID'},
			{id:'clientName',type:'text',name:'用户昵称'},
			{id:'clientImage',type:'image',name:'用户头像'},
			{id:'titleId',type:'enum',name:'头衔', map:titles},
			{id:'state',type:'enum',name:'状态', map:states},
			{id:'name',type:'text',name:'收货人'},
			{id:'phone',type:'text',name:'收货电话'},
			{id:'address',type:'text',name:'收货地址'},
			{id:'createTime',type:'text',name:'创建时间'},
			{id:'modifyTime',type:'text',name:'修改时间'},
		],
		queryColumn:['clientId', 'titleId', 'state'],
		operate:[
		{
			name:'查看点亮记录',
			click:function(data){
				location.href = 'viewPuzzle.html?contentPuzzleActivityComponentId='+data.contentPuzzleActivityComponentId;
			}
		}
		],
		button:[{
			name:'导出到excel',
			click:function(){
				tableOperation.exportDataToExcel("拼图游戏活动");
			}
		}]
	});
}
getTitles(function(){
	getStates(go);
});
