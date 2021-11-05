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
    primary key (id),
    foreign key (frn_user_id) references user(id)
);

CREATE TABLE `reminder_database`.`subtask` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `subtask_id` INT NOT NULL,
  `frn_reminder_id` INT NOT NULL,
  `title` VARCHAR(45) NULL,
  `completed` TINYINT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  INDEX `frn_reminder_id_idx` (`frn_reminder_id` ASC) VISIBLE,
  CONSTRAINT `frn_reminder_id`
    FOREIGN KEY (`frn_reminder_id`)
    REFERENCES `reminder_database`.`user` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT);


CREATE TABLE `reminder_database`.`tag` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `tag_id` INT NOT NULL,
  `frn_reminder_id` INT NOT NULL,
  `tag` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  INDEX `frn_reminder_id_tag_idx` (`frn_reminder_id` ASC) VISIBLE,
  CONSTRAINT `frn_reminder_id_tag`
    FOREIGN KEY (`frn_reminder_id`)
    REFERENCES `reminder_database`.`reminder` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT);



-- Not correct need to check
DELIMITER $$
CREATE TRIGGER before_reminder_delete
 Before Delete ON reminder
 for each row 
BEGIN
 DELETE FROM subtask 
 WHERE subtask.frn_reminder_id=old.id;

 DELETE FROM tag 
 WHERE tag.frn_reminder_id=old.id;
END$$
DELIMITER ;

 and
 DELETE FROM tags 
 WHERE tags.frn_reminder_id=new.id;