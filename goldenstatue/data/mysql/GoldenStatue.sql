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

alter table t_content_puzzle_activity_component add index contentIdIndex(contentId);
alter table t_content_puzzle_activity_component add index contentIdAndClientIdIndex(contentId, clientId);

#创建活动中获得的拼图材料纪录表
drop table if exists t_content_puzzle_activity_component_puzzle;

create table t_content_puzzle_activity_component_puzzle(
	contentPuzzleActivityComponentPuzzleId integer not null auto_increment,
	contentPuzzleActivityComponentId integer not null,
	puzzleClientId integer not null,
	puzzleId integer not null,
	type integer not null,
	isRead integer not null,
	createTime timestamp not null default CURRENT_TIMESTAMP,
	modifyTime timestamp not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
	primary key( contentPuzzleActivityComponentPuzzleId )
)engine=innodb default charset=utf8mb4 auto_increment = 10001;

alter table t_content_puzzle_activity_component_puzzle add index contentPuzzleActivityComponentIdIndex(contentPuzzleActivityComponentId);
alter table t_content_puzzle_activity_component_puzzle add index contentPuzzleActivityComponentIdAndPuzzleClientIdIndex(contentPuzzleActivityComponentId, puzzleClientId);
alter table t_content_puzzle_activity_component_puzzle add index contentPuzzleActivityComponentIdAndPuzzleIdIndex(contentPuzzleActivityComponentId, puzzleId);

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

#创建系统配置表
drop table if exists t_config;

create table t_config(
	configId integer not null auto_increment,
	name varchar(256) not null,
	value varchar(256) not null,
	createTime timestamp not null default CURRENT_TIMESTAMP,
	modifyTime timestamp not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
	primary key( configId )
)engine=innodb default charset=utf8mb4 auto_increment = 10001;

alter table t_config add index nameIndex(name);

#初始数据
insert into t_user(userId, name, password, type)values
(10001, 'fish', sha1('123'), 1);

insert into t_client(clientId, name, image, openId)values
(10001, 'fish', 'http://image.hongbeibang.com/FnOs-rk9erEuSVo0abmlGs7CD_Qz?460X460', '1'),
(10002, 'jd', 'http://image.hongbeibang.com/FnOs-rk9erEuSVo0abmlGs7CD_Qz?460X460', '2'),
(10003, 'doing', 'http://image.hongbeibang.com/FnOs-rk9erEuSVo0abmlGs7CD_Qz?460X460', '3'),
(10004, 'winmay0', 'http://image.hongbeibang.com/FnOs-rk9erEuSVo0abmlGs7CD_Qz?460X460', '4'),
(10005, 'winmay1', 'http://image.hongbeibang.com/FnOs-rk9erEuSVo0abmlGs7CD_Qz?460X460', '5'),
(10006, 'winmay2', 'http://image.hongbeibang.com/FnOs-rk9erEuSVo0abmlGs7CD_Qz?460X460', '6'),
(10007, 'winmay3', 'http://image.hongbeibang.com/FnOs-rk9erEuSVo0abmlGs7CD_Qz?460X460', '7'),
(10008, 'winmay4', 'http://image.hongbeibang.com/FnOs-rk9erEuSVo0abmlGs7CD_Qz?460X460', '8'),
(10009, 'winmay5', 'http://image.hongbeibang.com/FnOs-rk9erEuSVo0abmlGs7CD_Qz?460X460', '9'),
(10010, 'winmay6', 'http://image.hongbeibang.com/FnOs-rk9erEuSVo0abmlGs7CD_Qz?460X460', '10'),
(10011, 'winmay7', 'http://image.hongbeibang.com/FnOs-rk9erEuSVo0abmlGs7CD_Qz?460X460', '11'),
(10012, 'winmay8', 'http://image.hongbeibang.com/FnOs-rk9erEuSVo0abmlGs7CD_Qz?460X460', '12'),
(10013, 'winmay9', 'http://image.hongbeibang.com/FnOs-rk9erEuSVo0abmlGs7CD_Qz?460X460', '13'),
(10014, 'winmay10', 'http://image.hongbeibang.com/FnOs-rk9erEuSVo0abmlGs7CD_Qz?460X460', '14'),
(10015, 'winmay11', 'http://image.hongbeibang.com/FnOs-rk9erEuSVo0abmlGs7CD_Qz?460X460', '15'),
(10016, 'winmay12', 'http://image.hongbeibang.com/FnOs-rk9erEuSVo0abmlGs7CD_Qz?460X460', '16'),
(10017, 'winmay13', 'http://image.hongbeibang.com/FnOs-rk9erEuSVo0abmlGs7CD_Qz?460X460', '17'),
(10018, 'winmay14', 'http://image.hongbeibang.com/FnOs-rk9erEuSVo0abmlGs7CD_Qz?460X460', '18'),
(10019, 'winmay15', 'http://image.hongbeibang.com/FnOs-rk9erEuSVo0abmlGs7CD_Qz?460X460', '19'),
(10020, 'winmay16', 'http://image.hongbeibang.com/FnOs-rk9erEuSVo0abmlGs7CD_Qz?460X460', '20'),
(10021, 'winmay17', 'http://image.hongbeibang.com/FnOs-rk9erEuSVo0abmlGs7CD_Qz?460X460', '21'),
(10022, 'winmay18', 'http://image.hongbeibang.com/FnOs-rk9erEuSVo0abmlGs7CD_Qz?460X460', '22'),
(10023, 'winmay19', 'http://image.hongbeibang.com/FnOs-rk9erEuSVo0abmlGs7CD_Qz?460X460', '23'),
(10024, 'winmay20', 'http://image.hongbeibang.com/FnOs-rk9erEuSVo0abmlGs7CD_Qz?460X460', '24'),
(10025, 'winmay21', 'http://image.hongbeibang.com/FnOs-rk9erEuSVo0abmlGs7CD_Qz?460X460', '25'),
(10026, 'winmay22', 'http://image.hongbeibang.com/FnOs-rk9erEuSVo0abmlGs7CD_Qz?460X460', '26'),
(10027, 'winmay23', 'http://image.hongbeibang.com/FnOs-rk9erEuSVo0abmlGs7CD_Qz?460X460', '27'),
(10028, 'winmay24', 'http://image.hongbeibang.com/FnOs-rk9erEuSVo0abmlGs7CD_Qz?460X460', '28'),
(10029, 'winmay25', 'http://image.hongbeibang.com/FnOs-rk9erEuSVo0abmlGs7CD_Qz?460X460', '29'),
(10030, 'winmay26', 'http://image.hongbeibang.com/FnOs-rk9erEuSVo0abmlGs7CD_Qz?460X460', '30');

insert into t_content_puzzle_activity(contentId, title, beginTime, endTime)values
(10001, "拼图游戏", now(), DATE_ADD(now(), INTERVAL 2 DAY));

#insert into t_content_puzzle_activity_component(contentPuzzleActivityComponentId, contentId, clientId, titleId,state)values
#(10001, 10001, 10001, 1, 1);

insert into t_config(configId, name, value)values
(10001, "wxAppId", "wx288c0c78a82ff10e"),
(10002, "wxAppSecret", "90376932298876eee3e0c860870bb450");

select * from t_user;
select * from t_client;
select * from t_content_puzzle_activity;
select * from t_content_puzzle_activity_component;
select * from t_content_puzzle_activity_component_puzzle;
select * from t_content_puzzle_activity_component_address;
