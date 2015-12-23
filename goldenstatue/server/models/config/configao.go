package config

import (
	. "goldenstatue/models/common"
)

type ConfigAoModel struct {
	BaseModel
	ConfigDb ConfigDbModel
}

func (this *ConfigAoModel) Search(where Config,limit CommonPage) Configs {
	return this.ConfigDb.Search(where,limit)
}

func (this *ConfigAoModel) Get(name string) string {
	var result string

	configs := this.ConfigDb.GetByName(name)
	if len(configs) == 0 {
		result = ""
	} else {
		result = configs[0].Value
	}
	return result
}

func (this *ConfigAoModel) Set(name string, value string) {
	configs := this.ConfigDb.GetByName(name)
	if len(configs) == 0 {
		this.ConfigDb.Add(Config{
			Name:  name,
			Value: value,
		})
	} else {
		this.ConfigDb.Mod(configs[0].ConfigId, Config{
			Value: value,
		})
	}
}
