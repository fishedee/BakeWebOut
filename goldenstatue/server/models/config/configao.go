package config

import (
	. "goldenstatue/models/common"
)

type ConfigAoModel struct {
}

var ConfigAo = &ConfigAoModel{}

func (this *ConfigAoModel) Search(where Config,limit CommonPage) Configs {
	return ConfigDb.Search(where,limit)
}

func (this *ConfigAoModel) Get(name string) string {
	var result string

	configs := ConfigDb.GetByName(name)
	if len(configs) == 0 {
		result = ""
	} else {
		result = configs[0].Value
	}
	return result
}

func (this *ConfigAoModel) Set(name string, value string) {
	configs := ConfigDb.GetByName(name)
	if len(configs) == 0 {
		ConfigDb.Add(Config{
			Name:  name,
			Value: value,
		})
	} else {
		ConfigDb.Mod(configs[0].ConfigId, Config{
			Value: value,
		})
	}
}
