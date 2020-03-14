-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema templace
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema templace
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `templace` DEFAULT CHARACTER SET utf8 ;
USE `templace` ;

-- -----------------------------------------------------
-- Table `templace`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `templace`.`user` (
  `user_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_email` VARCHAR(300) CHARACTER SET 'utf8' COLLATE 'utf8_general_ci' NOT NULL,
  `user_passwd` VARCHAR(100) CHARACTER SET 'utf8' COLLATE 'utf8_general_ci' NOT NULL,
  `user_name` VARCHAR(300) CHARACTER SET 'utf8' COLLATE 'utf8_general_ci' NULL,
  `user_phone_num` VARCHAR(100) CHARACTER SET 'utf8' COLLATE 'utf8_general_ci' NULL,
  `user_address` LONGTEXT CHARACTER SET 'utf8' COLLATE 'utf8_general_ci' NULL,
  `user_bio` VARCHAR(600) CHARACTER SET 'utf8' COLLATE 'utf8_general_ci' NULL,
  `user_photo` VARCHAR(100) CHARACTER SET 'utf8' COLLATE 'utf8_general_ci' NULL,
  `user_dt_creation` TIMESTAMP NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `user_id_UNIQUE` (`user_id` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `templace`.`user_type`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `templace`.`user_type` (
  `user_type_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_type_desc` VARCHAR(100) CHARACTER SET 'utf8' COLLATE 'utf8_general_ci' NOT NULL,
  PRIMARY KEY (`user_type_id`),
  UNIQUE INDEX `user_type_id_UNIQUE` (`user_type_id` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `templace`.`user__user_type`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `templace`.`user__user_type` (
  `user_user_id` INT UNSIGNED NOT NULL,
  `user_type_user_type_id` INT UNSIGNED NOT NULL,
  `user_privilege_refresh` TIMESTAMP NOT NULL,
  INDEX `fk_user_has_user_type_user_type1_idx` (`user_type_user_type_id` ASC),
  INDEX `fk_user_has_user_type_user_idx` (`user_user_id` ASC),
  CONSTRAINT `fk_user_has_user_type_user`
    FOREIGN KEY (`user_user_id`)
    REFERENCES `templace`.`user` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_user_has_user_type_user_type1`
    FOREIGN KEY (`user_type_user_type_id`)
    REFERENCES `templace`.`user_type` (`user_type_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `templace`.`offer_type`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `templace`.`offer_type` (
  `offer_type_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `offer_type_desc` VARCHAR(100) CHARACTER SET 'utf8' COLLATE 'utf8_general_ci' NOT NULL,
  PRIMARY KEY (`offer_type_id`),
  UNIQUE INDEX `offer_type_id_UNIQUE` (`offer_type_id` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `templace`.`offer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `templace`.`offer` (
  `offer_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `lea_cost` DECIMAL(10,2) NOT NULL,
  `offer_name` VARCHAR(200) CHARACTER SET 'utf8' COLLATE 'utf8_general_ci' NULL,
  `offer_address` LONGTEXT CHARACTER SET 'utf8' COLLATE 'utf8_general_ci' NULL,
  `offer_specs` LONGTEXT CHARACTER SET 'utf8' COLLATE 'utf8_general_ci' NULL,
  `offer_desc` VARCHAR(600) CHARACTER SET 'utf8' COLLATE 'utf8_general_ci' NULL,
  `offer_dt_creation` TIMESTAMP NOT NULL,
  `offer_type_offer_type_id` INT UNSIGNED NOT NULL,
  `offer_user_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`offer_id`),
  UNIQUE INDEX `offer_id_UNIQUE` (`offer_id` ASC),
  INDEX `fk_offer_offer_type1_idx` (`offer_type_offer_type_id` ASC),
  INDEX `fk_offer_user1_idx` (`offer_user_id` ASC),
  CONSTRAINT `fk_offer_offer_type1`
    FOREIGN KEY (`offer_type_offer_type_id`)
    REFERENCES `templace`.`offer_type` (`offer_type_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_offer_user1`
    FOREIGN KEY (`offer_user_id`)
    REFERENCES `templace`.`user` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `templace`.`leasing`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `templace`.`leasing` (
  `lea_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `lea_dt_start` DATETIME NULL,
  `lea_dt_end` DATETIME NULL,
  `lea_user_id` INT UNSIGNED NOT NULL,
  `lea_offer_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`lea_id`),
  INDEX `fk_leasing_user1_idx` (`lea_user_id` ASC),
  INDEX `fk_leasing_offer1_idx` (`lea_offer_id` ASC),
  UNIQUE INDEX `lea_id_UNIQUE` (`lea_id` ASC),
  CONSTRAINT `fk_leasing_user1`
    FOREIGN KEY (`lea_user_id`)
    REFERENCES `templace`.`user` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_leasing_offer1`
    FOREIGN KEY (`lea_offer_id`)
    REFERENCES `templace`.`offer` (`offer_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `templace`.`comment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `templace`.`comment` (
  `comm_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `comm_title` VARCHAR(100) CHARACTER SET 'utf8' COLLATE 'utf8_general_ci' NOT NULL,
  `comm_text` VARCHAR(600) CHARACTER SET 'utf8' COLLATE 'utf8_general_ci' NOT NULL,
  `comm_rating` INT(2) NULL,
  `comm_dt` TIMESTAMP NOT NULL,
  `comm_user_id` INT UNSIGNED NOT NULL,
  `comm_offer_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`comm_id`),
  UNIQUE INDEX `comm_id_UNIQUE` (`comm_id` ASC),
  INDEX `fk_comment_user1_idx` (`comm_user_id` ASC),
  INDEX `fk_comment_offer1_idx` (`comm_offer_id` ASC),
  CONSTRAINT `fk_comment_user1`
    FOREIGN KEY (`comm_user_id`)
    REFERENCES `templace`.`user` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_comment_offer1`
    FOREIGN KEY (`comm_offer_id`)
    REFERENCES `templace`.`offer` (`offer_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `templace`.`favorite`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `templace`.`favorite` (
  `fav_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `fav_dt` TIMESTAMP NOT NULL,
  `fav_user_id` INT UNSIGNED NOT NULL,
  `fav_offer_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`fav_id`),
  UNIQUE INDEX `fav_id_UNIQUE` (`fav_id` ASC),
  INDEX `fk_favorite_user1_idx` (`fav_user_id` ASC),
  INDEX `fk_favorite_offer1_idx` (`fav_offer_id` ASC),
  CONSTRAINT `fk_favorite_user1`
    FOREIGN KEY (`fav_user_id`)
    REFERENCES `templace`.`user` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_favorite_offer1`
    FOREIGN KEY (`fav_offer_id`)
    REFERENCES `templace`.`offer` (`offer_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `templace`.`chat`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `templace`.`chat` (
  `chat_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `chat_dt_creation` TIMESTAMP NOT NULL,
  `chat_offer_id` INT UNSIGNED NOT NULL,
  `chat_host_id` INT UNSIGNED NOT NULL,
  INDEX `fk_chat_offer1_idx` (`chat_offer_id` ASC),
  INDEX `fk_chat_user1_idx` (`chat_host_id` ASC),
  PRIMARY KEY (`chat_id`),
  UNIQUE INDEX `chat_id_UNIQUE` (`chat_id` ASC),
  CONSTRAINT `fk_chat_offer1`
    FOREIGN KEY (`chat_offer_id`)
    REFERENCES `templace`.`offer` (`offer_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_chat_user1`
    FOREIGN KEY (`chat_host_id`)
    REFERENCES `templace`.`user` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `templace`.`interaction`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `templace`.`interaction` (
  `inter_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `inter_dt` TIMESTAMP NOT NULL,
  `inter_text` VARCHAR(600) CHARACTER SET 'utf8' COLLATE 'utf8_general_ci' NOT NULL,
  `inter_to` INT UNSIGNED NOT NULL,
  `inter_from` INT UNSIGNED NOT NULL,
  `inter_chat_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`inter_id`),
  INDEX `fk_interaction_user1_idx` (`inter_to` ASC),
  INDEX `fk_interaction_user2_idx` (`inter_from` ASC),
  INDEX `fk_interaction_chat1_idx` (`inter_chat_id` ASC),
  UNIQUE INDEX `inter_id_UNIQUE` (`inter_id` ASC),
  CONSTRAINT `fk_interaction_user1`
    FOREIGN KEY (`inter_to`)
    REFERENCES `templace`.`user` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_interaction_user2`
    FOREIGN KEY (`inter_from`)
    REFERENCES `templace`.`user` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_interaction_chat1`
    FOREIGN KEY (`inter_chat_id`)
    REFERENCES `templace`.`chat` (`chat_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
