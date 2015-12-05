package user

import (
	. "github.com/fishedee/language"
	. "github.com/fishedee/web"
	"strconv"
)

type UserDbModel struct {
}

var UserDb = &UserDbModel{}

func (this *UserDbModel) Get(id int) User {
	var users []User
	err := DB.Where("userId=?", id).Find(&users)
	if err != nil {
		panic(err)
	}
	if len(users) == 0 {
		Throw(1, "不存在该用户"+strconv.Itoa(id))
	}
	return users[0]
}
