var $ = require('fishfront/ui/global.js');
var dialog = require('fishfront/ui/dialog.js');
var indexPage = require('fishfront/ui/indexPage.js');
indexPage.use({
	title:'后台管理系统',
	init:function(){
		$.get('/user/islogin',{},function(data){
			data = $.JSON.parse(data)
			if( data.code != 0 ){
				dialog.message(data.msg)
				return
			}
			if( !data.data ){
				location.href = 'login.html';
			}
		})
	},
	logout:function(){
		$.post('/user/logout',{},function(data){
			data = $.JSON.parse(data)
			if( data.code != 0 ){
				dialog.message(data.msg)
				return
			}
			location.href = 'login.html'
		})
	},
	menu:{
		'系统管理':{
			'系统管理':[
				{name:'帐号管理',url:'user/index.html'},
				{name:'密码管理',url:'user/viewMyPassword.html'}
			],
			'活动管理':[
				{name:'拼图活动',url:'puzzleactivity/index.html'}
			]
		}
	}
});