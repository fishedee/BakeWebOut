package client

import (
	"time"
)

type Client struct {
	ClientId   int
	Name       string
	Image      string
	OpenId     string
	CreateTime time.Time `xorm:"created"`
	ModifyTime time.Time `xorm:"updated"`
}

type Clients struct {
	Count int
	Data  []Client
}
