use goldenstatue;

#创建后台用户表
drop table if exists t_user;

create table t_user(
	userId integer not null auto_increment,
	name varchar(256) not null,
	password varchar(256) not null,
	type integer not null,
	createTime timestamp not null default CURRENT_TIMESTAMP,
	modifyTime timestamp not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
	primary key( userId )
)engine=innodb default charset=utf8mb4 auto_increment = 10001;

#创建前台用户表
drop table if exists t_client;

create table t_client(
	clientId integer not null auto_increment,
	name varchar(256) not null,
	image varchar(256) not null,
	openId varchar(256) not null,
	createTime timestamp not null default CURRENT_TIMESTAMP,
	modifyTime timestamp not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
	primary key( clientId )
)engine=innodb default charset=utf8mb4 auto_increment = 10001;

#创建活动表
drop table if exists t_content_puzzle_activity;

create table t_content_puzzle_activity(
	contentId integer not null auto_increment,
	title varchar(256) not null,
	beginTime timestamp not null default CURRENT_TIMESTAMP,
	endTime timestamp not null default CURRENT_TIMESTAMP,
	createTime timestamp not null default CURRENT_TIMESTAMP,
	modifyTime timestamp not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
	primary key( contentId )
)engine=innodb default charset=utf8mb4 auto_increment = 10001;

#创建活动参赛作品表
drop table if exists t_content_puzzle_activity_component;

create table t_content_puzzle_activity_component(
	contentPuzzleActivityComponentId integer not null auto_increment,
	contentId integer not null,
	clientId integer not null,
	titleId integer not null,
	state integer not null,
	createTime timestamp not null default CURRENT_TIMESTAMP,
	modifyTime timestamp not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
	primary key( contentPuzzleActivityComponentId )
)engine=innodb default charset=utf8mb4 auto_increment = 10001;

#创建活动中获得的拼图材料纪录表
drop table if exists t_content_puzzle_activity_component_puzzle;

create table t_content_puzzle_activity_component_puzzle(
	contentPuzzleActivityComponentPuzzleId integer not null auto_increment,
	contentPuzzleActivityComponentId integer not null,
	puzzleClientId integer not null,
	puzzleId integer not null,
	type integer not null,
	createTime timestamp not null default CURRENT_TIMESTAMP,
	modifyTime timestamp not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
	primary key( contentPuzzleActivityComponentPuzzleId )
)engine=innodb default charset=utf8mb4 auto_increment = 10001;

alter table t_content_puzzle_activity_component_puzzle add index contentPuzzleActivityComponentIdIndex(contentPuzzleActivityComponentId);

#创建活动获奖用户地址表
drop table if exists t_content_puzzle_activity_component_address;

create table t_content_puzzle_activity_component_address(
	contentPuzzleActivityComponentAddressId integer not null auto_increment,
	contentPuzzleActivityComponentId integer not null,
	name varchar(256) not null,
	address varchar(256) not null,
	phone varchar(11) not null,
	createTime timestamp not null default CURRENT_TIMESTAMP,
	modifyTime timestamp not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
	primary key( contentPuzzleActivityComponentAddressId )
)engine=innodb default charset=utf8mb4 auto_increment = 10001;

alter table t_content_puzzle_activity_component_address add index contentPuzzleActivityComponentIdIndex(contentPuzzleActivityComponentId);

#初始数据
insert into t_user(userId, name, password, type)values
(10001, 'fish', '6BB4837EB74329105EE4568DDA7DC67ED2CA2AD9', 1);

insert into t_client(clientId, name, image, openId)values
(10001, 'fish', 'http://image.hongbeibang.com/FnOs-rk9erEuSVo0abmlGs7CD_Qz?460X460', '');

insert into t_content_puzzle_activity(contentId, title, beginTime, endTime)values
(10001, '拼图游戏', now(), DATE_ADD(now(), INTERVAL 2 DAY));

insert into t_content_puzzle_activity_component(contentPuzzleActivityComponentId, contentId, clientId, titleId,state)values
(10001, 10001, 10001, 1, 1);

select * from t_user;
select * from t_client;
select * from t_content_puzzle_activity;
