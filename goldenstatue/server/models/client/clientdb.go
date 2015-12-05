package client

import (
	. "../common"
	. "github.com/fishedee/language"
	. "github.com/fishedee/web"
	"strconv"
)

type ClientDbModel struct {
}

var ClientDb = &ClientDbModel{}

func (this *ClientDbModel) Search(where Client, limit CommonPage) Clients {
	db := DB.NewSession()
	defer db.Close()

	if where.ClientId != 0 {
		db = db.Where("clientId = ?", where.ClientId)
	}
	if where.Name != "" {
		db = db.Where("name like ?", "%"+where.Name+"%")
	}

	data := []Client{}
	var err error
	err = db.OrderBy("createTime desc").Limit(limit.PageSize, limit.PageIndex).Find(&data)
	if err != nil {
		panic(err)
	}

	count, err := db.Count(&where)
	if err != nil {
		panic(err)
	}

	return Clients{
		Count: int(count),
		Data:  data,
	}
}

func (this *ClientDbModel) Get(id int) Client {
	var clients []Client
	err := DB.Where("clientId = ?", id).Find(&clients)
	if err != nil {
		panic(err)
	}
	if len(clients) == 0 {
		Throw(1, "不存在该用户"+strconv.Itoa(id))
	}
	return clients[0]
}

func (this *ClientDbModel) GetByIds(ids []int) []Client {
	var clients []Client
	err := DB.In("clientId", ids).Find(&clients)
	if err != nil {
		panic(err)
	}
	return clients
}

func (this *ClientDbModel) Add(data Client) {
	_, err := DB.Insert(&data)
	if err != nil {
		panic(err)
	}
}

func (this *ClientDbModel) Mod(id int, data Client) {
	_, err := DB.Where("clientId = ?", id).Update(&data)
	if err != nil {
		panic(err)
	}
}

func (this *ClientDbModel) Del(id int) {
	var client Client
	_, err := DB.Where("clientId = ?", id).Delete(&client)
	if err != nil {
		panic(err)
	}
}
