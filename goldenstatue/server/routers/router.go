package routers

import (
	. "goldenstatue/controllers"
)

func init() {
	InitRoute("/puzzleactivity", &PuzzleActivityController{})
	InitRoute("/user", &UserController{})
	InitRoute("/client", &ClientController{})
	InitRoute("/weixin", &WeixinController{})
	InitRoute("/config", &ConfigController{})
}
