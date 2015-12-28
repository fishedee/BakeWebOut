package client

import (
	"time"
)

type Client struct {
	ClientId   int `xorm:"autoincr"`
	Name       string
	Image      string
	OpenId     string
	CreateTime time.Time `xorm:"created"`
	ModifyTime time.Time `xorm:"updated"`
}

type ClientAddress struct {
	Name    string
	Phone   string
	Address string
}

type Clients struct {
	Count int
	Data  []Client
}
