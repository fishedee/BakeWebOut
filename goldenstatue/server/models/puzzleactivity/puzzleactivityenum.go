package puzzleactivity

import (
	. "github.com/fishedee/language"
)

var PuzzleActivityComponentStateEnum struct {
	EnumStruct
	WALK               int `enum:"1,进入活动页面"`
	NO_BEGIN           int `enum:"2,未开始"`
	HAVE_BEGIN         int `enum:"3,进行中"`
	FINISH_NO_ADDRESS  int `enum:"4,完成了未填写收货地址"`
	FINISH_HAS_ADDRESS int `enum:"5,完成并已填写收货地址"`
}

var PuzzleActivityPuzzleEnum struct {
	EnumStruct
	FIRST  int `enum:"1,第一块材料"`
	SECOND int `enum:"2,第二块材料"`
	THIRD  int `enum:"3,第三块材料"`
	FORTH  int `enum:"4,第四块材料"`
	FIFTH  int `enum:"5,第五块材料"`
	SIXTH  int `enum:"6,第六块材料"`
}

var PuzzleActivityTitleEnum struct {
	EnumStruct
	QIFENGNANSHEN  int `enum:"1,戚风男神"`
	NAILAOYUJIE    int `enum:"2,奶酪御姐"`
	BARLUXIAOSHENG int `enum:"3,班戟小生"`
	KEKEXIAOJIE    int `enum:"4,可可小姐"`
	ZHISHIDASHU    int `enum:"5,芝士大叔"`
	MUSISHAONV     int `enum:"6,慕斯少女"`
}

var PuzzleActivityComponentPuzzleEnum struct {
	EnumStruct
	SUCCESS int `enum:"1,成功"`
	FAIL    int `enum:"2,失败"`
}

var PuzzleActivityComponentPuzzleStateEnum struct {
	EnumStruct
	NO_READ   int `enum:"1,未读"`
	HAVE_READ int `enum:"2,已读"`
}

func init() {
	InitEnumStruct(&PuzzleActivityTitleEnum)
	InitEnumStruct(&PuzzleActivityPuzzleEnum)
	InitEnumStruct(&PuzzleActivityComponentStateEnum)
	InitEnumStruct(&PuzzleActivityComponentPuzzleEnum)
	InitEnumStruct(&PuzzleActivityComponentPuzzleStateEnum)
}
