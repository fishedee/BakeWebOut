package puzzleactivity

import (
	"time"
)

//	t_content_puzzle_activity
type ContentPuzzleActivity struct {
	ContentId  int
	Title      string
	BeginTime  string
	EndTime    string
	CreateTime time.Time `xorm:"created"`
	ModifyTime time.Time `xorm:"updated"`
}

type PuzzleActivitys struct {
	Count int
	Data  []ContentPuzzleActivity
}

//	t_content_puzzle_activity_component
type ContentPuzzleActivityComponent struct {
	ContentPuzzleActivityComponentId int
	ContentId                        int
	ClientId                         int
	TitleId                          int
	State                            int
	CreateTime                       time.Time `xorm:"created"`
	ModifyTime                       time.Time `xorm:"updated"`
}

//	t_content_puzzle_activity_component_puzzle
type ContentPuzzleActivityComponentPuzzle struct {
	ContentPuzzleActivityComponentPuzzleId int
	ContentPuzzleActivityComponentId       int
	PuzzleClientId                         int
	PuzzleId                               int
	Type                                   int
	CreateTime                             time.Time `xorm:"created"`
	ModifyTime                             time.Time `xorm:"updated"`
}

//	t_content_puzzle_activity_component_address
type ContentPuzzleActivityComponentAddress struct {
	ContentPuzzleActivityComponentAddressId int
	ContentPuzzleActivityComponentId        int
	Name                                    string
	Address                                 string
	Phone                                   string
	CreateTime                              time.Time `xorm:"created"`
	ModifyTime                              time.Time `xorm:"updated"`
}
