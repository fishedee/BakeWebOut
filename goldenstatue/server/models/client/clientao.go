package client

import (
	. "goldenstatue/models/common"
	. "github.com/fishedee/language"
)

type ClientAoModel struct {
}

var ClientAo = &ClientAoModel{}

func (this *ClientAoModel) Search(where Client, limit CommonPage) Clients {
	return ClientDb.Search(where, limit)
}

func (this *ClientAoModel) Get(id int) Client {
	return ClientDb.Get(id)
}

func (this *ClientAoModel) GetByIds(ids []int) []Client {
	return ClientDb.GetByIds(ids)
}

func (this *ClientAoModel) Add(data Client) {
	ClientDb.Add(data)
}

func (this *ClientAoModel) Mod(id int, data Client) {
	ClientDb.Mod(id, data)
}

func (this *ClientAoModel) Del(id int) {
	ClientDb.Del(id)
}

func (this *ClientAoModel) AddOnce(data Client)(int){
	if data.OpenId == ""{
		Throw(1,"不合法的openId"+data.OpenId)
	}
	clients := ClientDb.GetByOpenId(data.OpenId)
	if len(clients) != 0{
		ClientDb.Mod(data.ClientId,data)
		return clients[0].ClientId
	}else{
		return ClientDb.Add(data)
	}
}