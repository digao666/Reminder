create database reminder_database;
use reminder_database;

create table user(
    id int auto_increment not null,
    email varchar(50) not null,
    password varchar(35) not null,
    profilePic varchar(200),
    primary key (id)
)ENGINE = INNODB;

CREATE TABLE `reminder_database`.`friend` (
  `friend_id` INT NOT NULL AUTO_INCREMENT,
  `frn_user_friend_id` INT NOT NULL,
  `frn_friend_user_id` INT NOT NULL,
  PRIMARY KEY (`friend_id`),
  CONSTRAINT `frn_user_friend_id`
    FOREIGN KEY (`frn_user_friend_id`)
    REFERENCES `reminder_database`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `frn_friend_user_id`
    FOREIGN KEY (`frn_friend_user_id`)
    REFERENCES `reminder_database`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)ENGINE = INNODB;

CREATE TABLE `reminder_database`.`reminder` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `reminder_id` INT NOT NULL,
  `frn_user_reminder_id` INT NOT NULL,
  `title` VARCHAR(100) NOT NULL,
  `description` VARCHAR(250) NOT NULL,
  `completed` INT NOT NULL DEFAULT 1,
  `create_date` DATE NULL,
  `reminder_date` DATE NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `frn_user_reminder_id`
    FOREIGN KEY (`frn_user_reminder_id`)
    REFERENCES `reminder_database`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)ENGINE = INNODB;

CREATE TABLE `reminder_database`.`subtask` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `subtask_id` INT NOT NULL,
  `frn_reminder_subtask_id` INT NOT NULL,
  `title` VARCHAR(45) NULL,
  `completed` TINYINT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  CONSTRAINT `frn_reminder_subtask_id`
    FOREIGN KEY (`frn_reminder_subtask_id`)
    REFERENCES `reminder_database`.`reminder` (`id`)
    ON DELETE NO action
    ON UPDATE NO action)
    ENGINE = INNODB;


CREATE TABLE `reminder_database`.`tag` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `frn_reminder_tag_id` INT NOT NULL,
  `tag` VARCHAR(100) NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `frn_reminder_tag_id`
    FOREIGN KEY (`frn_reminder_tag_id`)
    REFERENCES `reminder_database`.`reminder` (`id`)
    ON DELETE NO action
    ON UPDATE NO action)ENGINE = INNODB;



-- delete the child row before the main table
DELIMITER $$
CREATE TRIGGER before_reminder_delete
 Before Delete ON reminder
 for each row 
BEGIN
 DELETE FROM subtask 
 WHERE subtask.frn_reminder_subtask_id=old.id;

 DELETE FROM tag 
 WHERE tag.frn_reminder_tag_id=old.id;
END$$
DELIMITER ;

