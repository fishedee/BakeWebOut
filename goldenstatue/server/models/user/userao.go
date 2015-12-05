package user

import ()

type UserAoModel struct {
}

var UserAo UserAoModel

func (this *UserAoModel) Get(userId int) User {
	return UserDb.Get(userId)
}
