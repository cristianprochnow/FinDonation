-- MySQL Workbench Synchronization
-- Generated: 2020-06-24 14:10
-- Model: New Model
-- Version: 1.0
-- Project: Name of the project
-- Author: crist

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

CREATE TABLE IF NOT EXISTS `doajuda`.`item_category` (
  `item_id` INT(11) NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(50) CHARACTER SET 'utf8' COLLATE 'utf8_general_ci' NOT NULL,
  `icon_url` VARCHAR(100) CHARACTER SET 'utf8' COLLATE 'utf8_general_ci' NOT NULL,
  PRIMARY KEY (`item_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `doajuda`.`collect_points` (
  `point_id` INT(11) NOT NULL AUTO_INCREMENT,
  `ong_id` INT(11) NOT NULL,
  `title` VARCHAR(250) CHARACTER SET 'utf8' COLLATE 'utf8_general_ci' NOT NULL,
  `description` VARCHAR(500) CHARACTER SET 'utf8' COLLATE 'utf8_general_ci' NOT NULL,
  `image` VARCHAR(100) NULL DEFAULT NULL,
  `uf` CHAR(2) CHARACTER SET 'utf8' COLLATE 'utf8_general_ci' NOT NULL,
  `city` VARCHAR(100) NOT NULL,
  `street` VARCHAR(100) CHARACTER SET 'utf8' COLLATE 'utf8_general_ci' NOT NULL,
  `number` INT(11) NOT NULL,
  `latitude` DECIMAL NOT NULL,
  `longitude` DECIMAL NOT NULL,
  PRIMARY KEY (`point_id`),
  INDEX `fk_collect_points_ongs1_idx` (`ong_id` ASC),
  CONSTRAINT `fk_collect_points_ongs1`
    FOREIGN KEY (`ong_id`)
    REFERENCES `doajuda`.`ongs` (`ong_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `doajuda`.`item_collect_points` (
  `item_id` INT(11) NOT NULL,
  `point_id` INT(11) NOT NULL,
  INDEX `fk_item_category_has_collect_point_collect_point1_idx` (`point_id` ASC),
  INDEX `fk_item_category_has_collect_point_item_category_idx` (`item_id` ASC),
  CONSTRAINT `fk_item_category_has_collect_point_item_category`
    FOREIGN KEY (`item_id`)
    REFERENCES `doajuda`.`item_category` (`item_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_item_category_has_collect_point_collect_point1`
    FOREIGN KEY (`point_id`)
    REFERENCES `doajuda`.`collect_points` (`point_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `doajuda`.`ongs` (
  `ong_id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(250) CHARACTER SET 'utf8' COLLATE 'utf8_general_ci' NOT NULL,
  `email` VARCHAR(250) CHARACTER SET 'utf8' COLLATE 'utf8_general_ci' NOT NULL,
  `whatsapp` VARCHAR(50) CHARACTER SET 'utf8' COLLATE 'utf8_general_ci' NOT NULL,
  `password` VARCHAR(100) CHARACTER SET 'utf8' COLLATE 'utf8_general_ci' NOT NULL,
  `description` VARCHAR(500) CHARACTER SET 'utf8' COLLATE 'utf8_general_ci' NULL DEFAULT NULL,
  `image` VARCHAR(100) CHARACTER SET 'utf8' COLLATE 'utf8_general_ci' NULL DEFAULT NULL,
  `uf` CHAR(2) CHARACTER SET 'utf8' COLLATE 'utf8_general_ci' NOT NULL,
  `city` VARCHAR(100) CHARACTER SET 'utf8' COLLATE 'utf8_general_ci' NOT NULL,
  `street` VARCHAR(100) CHARACTER SET 'utf8' COLLATE 'utf8_general_ci' NOT NULL,
  `number` INT(11) NOT NULL,
  `latitude` DECIMAL NOT NULL,
  `longitude` DECIMAL NOT NULL,
  PRIMARY KEY (`ong_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `doajuda`.`donations` (
  `donation_id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_id` INT(11) NOT NULL,
  `title` VARCHAR(250) CHARACTER SET 'utf8' COLLATE 'utf8_general_ci' NOT NULL,
  `description` VARCHAR(250) CHARACTER SET 'utf8' COLLATE 'utf8_general_ci' NOT NULL,
  `image` VARCHAR(100) CHARACTER SET 'utf8' COLLATE 'utf8_general_ci' NULL DEFAULT NULL,
  `uf` CHAR(2) CHARACTER SET 'utf8' COLLATE 'utf8_general_ci' NOT NULL,
  `city` VARCHAR(100) CHARACTER SET 'utf8' COLLATE 'utf8_general_ci' NOT NULL,
  `street` VARCHAR(100) CHARACTER SET 'utf8' COLLATE 'utf8_general_ci' NOT NULL,
  `number` INT(11) NOT NULL,
  `latitude` DECIMAL NOT NULL,
  `longitude` DECIMAL NOT NULL,
  PRIMARY KEY (`donation_id`),
  INDEX `fk_donations_users1_idx` (`user_id` ASC),
  CONSTRAINT `fk_donations_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `doajuda`.`users` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `doajuda`.`item_donations` (
  `item_id` INT(11) NOT NULL,
  `donation_id` INT(11) NOT NULL,
  INDEX `fk_item_category_has_donations_donations1_idx` (`donation_id` ASC),
  INDEX `fk_item_category_has_donations_item_category1_idx` (`item_id` ASC),
  CONSTRAINT `fk_item_category_has_donations_item_category1`
    FOREIGN KEY (`item_id`)
    REFERENCES `doajuda`.`item_category` (`item_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_item_category_has_donations_donations1`
    FOREIGN KEY (`donation_id`)
    REFERENCES `doajuda`.`donations` (`donation_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `doajuda`.`users` (
  `user_id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(250) CHARACTER SET 'utf8' COLLATE 'utf8_general_ci' NOT NULL,
  `email` VARCHAR(250) CHARACTER SET 'utf8' COLLATE 'utf8_general_ci' NOT NULL,
  `whatsapp` VARCHAR(250) CHARACTER SET 'utf8' COLLATE 'utf8_general_ci' NOT NULL,
  `password` VARCHAR(100) CHARACTER SET 'utf8' COLLATE 'utf8_general_ci' NOT NULL,
  PRIMARY KEY (`user_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
