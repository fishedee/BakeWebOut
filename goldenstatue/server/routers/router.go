package routers

import (
	. "../controllers"
)

func init() {
	InitRoute("/puzzleactivity", &PuzzleActivityController{})
}
