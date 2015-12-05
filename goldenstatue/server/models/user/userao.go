package user

import (
	"crypto/sha1"
	"io"
	"fmt"
	. "github.com/fishedee/language"
	. "github.com/fishedee/web"
	. "goldenstatue/models/common"
)

type UserAoModel struct {
}

var UserAo UserAoModel

func (this *UserAoModel) CheckMustVaildPassword(password string,passwordHash string){
	Log.Debug("password %s %s",password,passwordHash)
	if this.getPasswordHash(password) != passwordHash{
		Throw(1,"密码不正确")
	}
}

func (this *UserAoModel) getPasswordHash(password string)string{
	sha1er := sha1.New()
	io.WriteString(sha1er,password)
	dataHash := fmt.Sprintf("%x",sha1er.Sum(nil))
	return dataHash
}

func (this *UserAoModel) Search(user User,pageInfo CommonPage) Users {
	return UserDb.Search(user,pageInfo)
}

func (this *UserAoModel) Get(userId int) User {
	return UserDb.Get(userId)
}

func (this *UserAoModel) GetByName(name string)[]User{
	return UserDb.GetByName(name)
}

func (this *UserAoModel) Del(userId int){
	UserDb.Del(userId)
}

func (this *UserAoModel)Add( user User){
	//检查是否有重名
	userInfo := UserDb.GetByName(user.Name)
	if len(userInfo) != 0{
		Throw(1,"存在重复的用户名")
	}
	
	//添加用户
	user.Password = this. getPasswordHash(user.Password)
	UserDb.Add(user);
}

func (this *UserAoModel)ModType(userId int,userType int){
	user := User{
		Type:userType,
	}
	UserDb.Mod(userId,user)
}

func (this *UserAoModel)ModPassword(userId int,password string){
	user := User{
		Password:this.getPasswordHash(password),
	}
	UserDb.Mod(userId,user)
}

func (this *UserAoModel)ModPasswordByOld(userId int,oldPassword string,newPassword string){
	//检查原密码是否正确
	userInfo := UserDb.Get(userId)
	this.CheckMustVaildPassword( oldPassword , userInfo.Password )

	//修改密码
	this.ModPassword(userId,newPassword)
}