package config

import (
	. "github.com/fishedee/web"
	. "goldenstatue/models/common"
)

type ConfigDbModel struct {
}

var ConfigDb = &ConfigDbModel{}


func (this *ConfigDbModel) Search(where Config,limit CommonPage) Configs {
	db := DB.NewSession()
	defer db.Close()

	if limit.PageIndex == 0 && limit.PageSize == 0 {
		return Configs{
			Count:0,
			Data:[]Config{},
		}
	}

	if where.Name != "" {
		db = db.And("name like ?", "%"+where.Name+"%")
	}

	data := []Config{}
	var err error
	err = db.OrderBy("createTime desc").Limit(limit.PageSize, limit.PageIndex).Find(&data)
	if err != nil {
		panic(err)
	}

	count, err := db.Count(&where)
	if err != nil {
		panic(err)
	}

	return Configs{
		Count: int(count),
		Data:  data,
	}
}

func (this *ConfigDbModel) Add(data Config) {
	_, err := DB.Insert(&data)
	if err != nil {
		panic(err)
	}
}

func (this *ConfigDbModel) Mod(configId int, data Config) {
	_, err := DB.Where("configId = ?", configId).Update(&data)
	if err != nil {
		panic(err)
	}
}

func (this *ConfigDbModel) GetByName(name string) []Config {
	var configs []Config
	err := DB.Where("name=?", name).Find(&configs)
	if err != nil {
		panic(err)
	}
	return configs
}
