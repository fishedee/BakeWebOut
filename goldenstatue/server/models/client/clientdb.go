package client

import (
	. "github.com/fishedee/language"
	. "goldenstatue/models/common"
	"strconv"
)

type ClientDbModel struct {
	BaseModel
}

func (this *ClientDbModel) Search(where Client, limit CommonPage) Clients {
	db := this.DB.NewSession()
	defer db.Close()

	if limit.PageIndex == 0 && limit.PageSize == 0 {
		return Clients{
			Count: 0,
			Data:  []Client{},
		}
	}

	if where.ClientId != 0 {
		db = db.And("clientId = ?", where.ClientId)
	}
	if where.Name != "" {
		db = db.And("name like ?", "%"+where.Name+"%")
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
	err := this.DB.Where("clientId = ?", id).Find(&clients)
	if err != nil {
		panic(err)
	}
	if len(clients) == 0 {
		Throw(1, "不存在该用户"+strconv.Itoa(id))
	}
	return clients[0]
}

func (this *ClientDbModel) GetByOpenId(openid string) []Client {
	var clients []Client
	err := this.DB.Where("openid = ?", openid).Find(&clients)
	if err != nil {
		panic(err)
	}
	return clients
}

func (this *ClientDbModel) GetByIds(ids []int) []Client {
	var clients []Client
	err := this.DB.In("clientId", ids).Find(&clients)
	if err != nil {
		panic(err)
	}
	return clients
}

func (this *ClientDbModel) Add(data Client) int {
	_, err := this.DB.Insert(&data)
	if err != nil {
		panic(err)
	}
	return data.ClientId
}

func (this *ClientDbModel) Mod(id int, data Client) {
	_, err := this.DB.Where("clientId = ?", id).Update(&data)
	if err != nil {
		panic(err)
	}
}

func (this *ClientDbModel) Del(id int) {
	var client Client
	_, err := this.DB.Where("clientId = ?", id).Delete(&client)
	if err != nil {
		panic(err)
	}
}
