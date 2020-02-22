-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema FrameWorkGeneratorDB
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `FrameWorkGeneratorDB` ;

-- -----------------------------------------------------
-- Schema FrameWorkGeneratorDB
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `FrameWorkGeneratorDB` DEFAULT CHARACTER SET utf8 ;
USE `FrameWorkGeneratorDB` ;

-- -----------------------------------------------------
-- Table `user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user` ;

CREATE TABLE IF NOT EXISTS `user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(200) NOT NULL,
  `enabled` TINYINT(1) NOT NULL DEFAULT 1,
  `email` VARCHAR(200) NULL,
  `account_id` INT NOT NULL,
  `organization_id` INT NOT NULL,
  `role` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `template`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `template` ;

CREATE TABLE IF NOT EXISTS `template` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `extension` VARCHAR(45) NULL,
  `content` TEXT NULL,
  `access` TINYINT(1) NOT NULL DEFAULT 1,
  `template_type` VARCHAR(45) NULL DEFAULT 'empty',
  `description` VARCHAR(10000) NULL,
  `instructions` VARCHAR(10000) NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_template_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_template_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `favorites`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `favorites` ;

CREATE TABLE IF NOT EXISTS `favorites` (
  `user_id` INT NOT NULL,
  `template_id` INT NOT NULL,
  PRIMARY KEY (`user_id`, `template_id`),
  INDEX `fk_user_has_template_template1_idx` (`template_id` ASC),
  INDEX `fk_user_has_template_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_user_has_template_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_template_template1`
    FOREIGN KEY (`template_id`)
    REFERENCES `template` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `parent_child_template`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `parent_child_template` ;

CREATE TABLE IF NOT EXISTS `parent_child_template` (
  `parent_id` INT NOT NULL,
  `child_id` INT NOT NULL,
  PRIMARY KEY (`parent_id`, `child_id`),
  INDEX `fk_parent_child_template_template1_idx` (`parent_id` ASC),
  INDEX `fk_parent_child_template_template2_idx` (`child_id` ASC),
  CONSTRAINT `fk_parent_child_template_template1`
    FOREIGN KEY (`parent_id`)
    REFERENCES `template` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_parent_child_template_template2`
    FOREIGN KEY (`child_id`)
    REFERENCES `template` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `comments`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `comments` ;

CREATE TABLE IF NOT EXISTS `comments` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `content` VARCHAR(45) NULL,
  `create_date` DATETIME NULL,
  `user_id` INT NOT NULL,
  `template_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_comments_user1_idx` (`user_id` ASC),
  INDEX `fk_comments_template1_idx` (`template_id` ASC),
  CONSTRAINT `fk_comments_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_comments_template1`
    FOREIGN KEY (`template_id`)
    REFERENCES `template` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `rating`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `rating` ;

CREATE TABLE IF NOT EXISTS `rating` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `create_date` DATETIME NULL,
  `user_id` INT NOT NULL,
  `template_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_rating_user1_idx` (`user_id` ASC),
  INDEX `fk_rating_template1_idx` (`template_id` ASC),
  CONSTRAINT `fk_rating_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_rating_template1`
    FOREIGN KEY (`template_id`)
    REFERENCES `template` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET SQL_MODE = '';
DROP USER IF EXISTS user@localhost;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'user'@'localhost' IDENTIFIED BY 'user';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'user'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
