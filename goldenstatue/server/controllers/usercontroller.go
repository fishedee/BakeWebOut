package controllers

import (
	. "goldenstatue/models/common"
	. "goldenstatue/models/user"
	//. "github.com/fishedee/web"
)

type UserController struct {
	BaseController
}

func (this *UserController) Islogin_Json()(interface{}){
	user := UserLoginAo.IsLogin(this.Ctx)
	if user.UserId != 0{
		return user
	}else{
		return nil
	}
}

func (this *UserController) Login_Json(){
	//检查输入参数
	var user User
	this.CheckPost(&user)
	
	UserLoginAo.Login(this.Ctx,user.Name,user.Password)
}

func (this *UserController) Logout_Json(){
	UserLoginAo.Logout(this.Ctx)
}

func (this *UserController) GetType_Json()(interface{}){
	return UserTypeEnum.Names()
}

func (this *UserController) Search_Json()(interface{}){
	//检查输入参数
	var where User
	this.CheckGet(&where)

	var limit CommonPage
	this.CheckGet(&limit)

	//检查权限
	UserLoginAo.CheckMustAdmin(this.Ctx)

	//执行业务逻辑
	return UserAo.Search(where,limit)
}

func (this *UserController) Get_Json()(interface{}){
	//检查输入参数
	var user User
	this.CheckGet(&user)

	//检查权限
	UserLoginAo.CheckMustAdmin(this.Ctx)

	//执行业务逻辑
	return UserAo.Get(user.UserId)
}

func (this *UserController) Add_Json(){
	//检查输入参数
	var user User
	this.CheckPost(&user)

	//检查权限
	UserLoginAo.CheckMustAdmin(this.Ctx)

	//执行业务逻辑
	UserAo.Add(user)
}

func (this *UserController) Del_Json(){
	//检查输入参数
	var user User
	this.CheckPost(&user)

	//检查权限
	UserLoginAo.CheckMustAdmin(this.Ctx)

	//执行业务逻辑
	UserAo.Del(user.UserId)
}

func (this *UserController) ModType_Json(){
	//检查输入参数
	var user User
	this.CheckPost( &user )

	//检查权限
	UserLoginAo.CheckMustAdmin(this.Ctx)

	//执行业务逻辑
	UserAo.ModType( user.UserId , user.Type)
}

func (this *UserController) ModPassword_Json(){
	//检查输入参数
	var user User
	this.CheckPost(&user)

	//检查权限
	UserLoginAo.CheckMustAdmin( this.Ctx )

	//执行业务逻辑
	UserAo.ModPassword( user.UserId , user.Password )
}

func (this *UserController) ModMyPassword_Json(){
	//检查输入参数
	var input struct{
		OldPassword string
		NewPassword string
	}
	this.CheckPost(&input)

	//检查权限
	loginUser := UserLoginAo.CheckMustLogin( this.Ctx )

	//执行业务逻辑
	UserAo.ModPasswordByOld( loginUser.UserId , input.OldPassword , input.NewPassword )
}