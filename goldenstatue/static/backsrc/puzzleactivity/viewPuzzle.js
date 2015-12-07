var $ = require('fishfront/ui/global.js');
var dialog = require('fishfront/ui/dialog.js');
var query = require('fishfront/ui/query.js');
var contentPuzzleActivityComponentId = $.location.getQueryArgv('contentPuzzleActivityComponentId');
var puzzles = {};
var types = {};
function getPuzzles(next){
	$.get('/puzzleactivity/getPuzzles', {}, function(data){
		data = $.JSON.parse(data);
		if( data.code != 0 ){
			dialog.message(data.msg);
			return;
		}
		puzzles = data.data;
		next();
	});
}
function getTypes(next){
	$.get('/puzzleactivity/getTypes', {}, function(data){
		data = $.JSON.parse(data);
		if( data.code != 0 ){
			dialog.message(data.msg);
			return;
		}
		types = data.data;
		next();
	});	
}
function go(){
	query.simpleQuery({
		id:'container',
		url:'/puzzleactivity/searchComponentPuzzle',
		column:[
			{id:'contentPuzzleActivityComponentPuzzleId',type:'text',name:'点亮记录ID'},
			{id:'puzzleClientId',type:'text',name:'用户ID'},
			{id:'clientName',type:'text',name:'用户昵称'},
			{id:'clientImage',type:'image',name:'用户头像'},
			{id:'puzzleId',type:'enum',name:'所获得的材料', map:puzzles},
			{id:'type',type:'enum',name:'是否有效', map:types},
			{id:'createTime',type:'text',name:'创建时间'},
			{id:'modifyTime',type:'text',name:'修改时间'},
		],
		queryColumn:['puzzleClientId', 'puzzleId', 'type'],
		operate:[],
	});
}
getPuzzles(function(){
	getTypes(go);
});
