use web01board;

drop table if exists post;
drop table if exists user;

create table user
(
  id bigint primary key auto_increment,
  account varchar(100) not null unique,
  password varchar(100),
  username varchar(100),
  email varchar(50) not null unique,
  created datetime default current_timestamp,
  updated datetime default current_timestamp on update current_timestamp
) default charset utf8mb4 engine = InnoDB;

create table post (
  id bigint primary key auto_increment,
  author bigint,
  title varchar(255),
  content text,
  created datetime default current_timestamp,
  updated datetime default current_timestamp on update current_timestamp
) default charset utf8mb4 engine = InnoDB;