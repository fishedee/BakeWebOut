package client

import (
	. "goldenstatue/models/common"
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
