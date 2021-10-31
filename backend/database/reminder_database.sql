create database reminder_database;
use reminder_database;

create table user(
    id int auto_increment not null,
    email varchar(50) not null,
    password varchar(35) not null,
    profilePic varchar(200),
    primary key (id)
);

create table friend(
    friend_id int auto_increment not null,
    frn_user_id int not null,
    frn_friend_id int not null,
    primary key (friend_id),
    foreign key (frn_user_id) references user(id),
    foreign key (frn_friend_id) references user(id)
);

create table reminder(
    id int auto_increment not null,
    reminder_id int not null,
    frn_user_id int not null,
    title varchar(100) not null,
    description varchar(250) not null,
    completed boolean default false,
    create_date date,
    reminder_date date,
    primary key (reminder_id),
    foreign key (frn_user_id) references user(id)
);

create table subtask(
    id int auto_increment not null,
    subtask_id int not null,
    frn_reminder_id int not null,
    title varchar(100) not null,
    completed boolean default false,
    primary key (subtask_id),
    foreign key (frn_reminder_id) references reminder(reminder_id)
);

create table tag(
    id int auto_increment not null,
    tag_id int not null,
    frn_reminder_id int not null,
    tag varchar(50) not null,
    primary key (tag_id),
    foreign key (frn_reminder_id) references reminder(reminder_id)
);


-- Not correct need to check
DELIMITER $$
CREATE TRIGGER before_reminder_delete
 Before Delete ON reminder
BEGIN
 DELETE FROM subtask 
 WHERE subtask.frn_reminder_id=new.id;

 DELETE FROM tags 
 WHERE tags.frn_reminder_id=new.id;
END$$
DELIMITER ;
