package config

import (
	. "github.com/fishedee/web"
)

type ConfigDbModel struct {
}

var ConfigDb = &ConfigDbModel{}

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
