package puzzleactivity

import (
	"time"
)

//	t_content_puzzle_activity
type ContentPuzzleActivity struct {
	ContentId  int `xorm:"autoincr"`
	Title      string
	BeginTime  time.Time
	EndTime    time.Time
	CreateTime time.Time `xorm:"created"`
	ModifyTime time.Time `xorm:"updated"`
}

type PuzzleActivitys struct {
	Count int
	Data  []ContentPuzzleActivity
}

//	t_content_puzzle_activity_component
type ContentPuzzleActivityComponent struct {
	ContentPuzzleActivityComponentId int `xorm:"autoincr"`
	ContentId                        int
	ClientId                         int
	TitleId                          int
	State                            int
	CreateTime                       time.Time `xorm:"created"`
	ModifyTime                       time.Time `xorm:"updated"`
}

type PuzzleActivityComponents struct {
	Count int
	Data  []ContentPuzzleActivityComponent
}

type ContentPuzzleActivityComponentWithClientInfo struct {	
	ContentPuzzleActivityComponentAddress
	ContentPuzzleActivityComponent
	ClientName  string
	ClientImage string
}

type PuzzleActivityComponentWithClientInfos struct {
	Count int
	Data  []ContentPuzzleActivityComponentWithClientInfo
}

//	t_content_puzzle_activity_component_puzzle
type ContentPuzzleActivityComponentPuzzle struct {
	ContentPuzzleActivityComponentPuzzleId int `xorm:"autoincr"`
	ContentPuzzleActivityComponentId       int
	PuzzleClientId                         int
	PuzzleId                               int
	Type                                   int
	IsRead                                 int
	CreateTime                             time.Time `xorm:"created"`
	ModifyTime                             time.Time `xorm:"updated"`
}

type PuzzleActivityComponentPuzzles struct {
	Count int
	Data  []ContentPuzzleActivityComponentPuzzle
}

type ContentPuzzleActivityComponentPuzzleWithClientInfo struct {
	ContentPuzzleActivityComponentPuzzle
	ClientName  string
	ClientImage string
}

type PuzzleActivityComponentPuzzleWithClientInfos struct {
	Count int
	Data  []ContentPuzzleActivityComponentPuzzleWithClientInfo
}

//	t_content_puzzle_activity_component_address
type ContentPuzzleActivityComponentAddress struct {
	ContentPuzzleActivityComponentAddressId int `xorm:"autoincr"`
	ContentPuzzleActivityComponentId        int
	Name                                    string
	Address                                 string
	Phone                                   string
	CreateTime                              time.Time `xorm:"created"`
	ModifyTime                              time.Time `xorm:"updated"`
}

type PuzzleActivityComponentInfo struct {
	IsLoginClient bool
	Component     ContentPuzzleActivityComponent
	IsPuzzle      bool
	ClientImage   string
	ClientName    string
	Puzzle        [6]bool
	AllPuzzle     []PuzzleActivityComponentPuzzleWithClientInfo
}

type PuzzleActivityComponentPuzzleWithClientInfo struct {
	ContentPuzzleActivityComponentPuzzle
	ClientName  string
	ClientImage string
}
