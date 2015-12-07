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
	query.simpleQuery({
		id:'container',
		url:'/puzzleactivity/searchComponent',
		column:[
			{id:'contentPuzzleActivityComponentId',type:'text',name:'参赛作品ID'},
			{id:'clientId',type:'text',name:'用户ID'},
			{id:'clientName',type:'text',name:'用户昵称'},
			{id:'clientImage',type:'image',name:'用户头像'},
			{id:'titleId',type:'enum',name:'头衔', map:titles},
			{id:'state',type:'enum',name:'状态', map:states},
			{id:'createTime',type:'text',name:'创建时间'},
			{id:'modifyTime',type:'text',name:'修改时间'},
		],
		queryColumn:['clientId', 'titleId', 'state'],
		operate:[
		{
			name:'查看收货地址',
			click:function(data){
				if(data.state == "完成并已填写收货地址"){
					location.href = 'viewAddress.html?contentPuzzleActivityComponentId='+data.contentPuzzleActivityComponentId;
				}else{
					dialog.message("该用户未填写收货地址！");
				}
			}
		},
		{
			name:'查看点亮记录',
			click:function(data){
				location.href = 'viewPuzzle.html?contentPuzzleActivityComponentId='+data.contentPuzzleActivityComponentId;
			}
		}
		],
	});
}
getTitles(function(){
	getStates(go);
});
