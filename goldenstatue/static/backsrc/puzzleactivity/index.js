var $ = require('fishfront/ui/global.js');
var dialog = require('fishfront/ui/dialog.js');
var query = require('fishfront/ui/query.js');
function go(){
	query.simpleQuery({
		id:'container',
		url:'/puzzleactivity/search',
		column:[
			{id:'contentId',type:'text',name:'拼图活动ID'},
			{id:'title',type:'text',name:'标题'},
			{id:'beginTime',type:'text',name:'开始时间'},
			{id:'endTime',type:'text',name:'结束时间'},
			{id:'createTime',type:'text',name:'创建时间'},
			{id:'modifyTime',type:'text',name:'修改时间'},
		],
		queryColumn:['title'],
		operate:[
		{
			name:'修改',
			click:function(data){
				location.href = 'view.html?contentId='+data.contentId;
			}
		},
		{
			name:'删除',
			click:function(data){
				dialog.confirm('确认删除该拼图活动'+data.title+'，不可回退操作？!',function(){
					$.post('/puzzleactivity/del',{contentId:data.contentId},function(data){
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
			name:'添加拼图活动',
			click:function(){
				location.href = 'view.html';
			}
		}
		],
	});
}
go();