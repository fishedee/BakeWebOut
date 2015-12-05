var $ = require('fishfront/ui/global');
var dialog = require('fishfront/ui/dialog');
var loginPage = require('fishfront/ui/loginPage');
loginPage.use({
	title:'金象面粉后台管理系统',
	init:function(){
		$.get('/user/islogin',{},function(data){
			data = $.JSON.parse(data)
			if( data.code != 0 ){
				dialog.message(data.msg)
				return
			}
			if( data.data ){
				location.href = 'index.html'
			}
		})
	},
	login:function(data){
		$.post('/user/login',{name:data.name,password:data.password},function(data){
			data = $.JSON.parse(data)
			if( data.code != 0 ){
				dialog.message(data.msg)
				return
			}
			location.href = 'index.html'
		})
	}
});