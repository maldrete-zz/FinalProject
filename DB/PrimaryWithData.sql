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
  `organization_id` INT NULL,
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

-- -----------------------------------------------------
-- Data for table `user`
-- -----------------------------------------------------
START TRANSACTION;
USE `FrameWorkGeneratorDB`;
INSERT INTO `user` (`id`, `username`, `password`, `enabled`, `email`, `organization_id`, `role`) VALUES (1, 'nealabc', 'nealabc', DEFAULT, 'nealabc@aol.com', NULL, NULL);
INSERT INTO `user` (`id`, `username`, `password`, `enabled`, `email`, `organization_id`, `role`) VALUES (2, 'james', 'james', DEFAULT, 'james@hotmail.com', 1, 'organization admin');
INSERT INTO `user` (`id`, `username`, `password`, `enabled`, `email`, `organization_id`, `role`) VALUES (3, 'shaquille_oatmeal', 'shaq', DEFAULT, 'shaq@yahoo.com', 2, 'contributer');
INSERT INTO `user` (`id`, `username`, `password`, `enabled`, `email`, `organization_id`, `role`) VALUES (4, 'cssgabe', 'gabe', DEFAULT, 'gabe@hotmail.com', NULL, NULL);
INSERT INTO `user` (`id`, `username`, `password`, `enabled`, `email`, `organization_id`, `role`) VALUES (5, 'lonetraveler', 'lonetraveler', DEFAULT, 'lonetraveler@aol.com', NULL, NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `template`
-- -----------------------------------------------------
START TRANSACTION;
USE `FrameWorkGeneratorDB`;
INSERT INTO `template` (`id`, `name`, `extension`, `content`, `access`, `template_type`, `description`, `instructions`, `user_id`) VALUES (1, 'Java Enitiy Mapping', NULL, 'here is the java file', DEFAULT, 'Java', 'here is a description of the java template', 'you need to input name of the entity and the fields', 1);
INSERT INTO `template` (`id`, `name`, `extension`, `content`, `access`, `template_type`, `description`, `instructions`, `user_id`) VALUES (2, 'getter and setter', NULL, 'here is getter ans setter content', DEFAULT, 'Get and Set', NULL, NULL, 2);
INSERT INTO `template` (`id`, `name`, `extension`, `content`, `access`, `template_type`, `description`, `instructions`, `user_id`) VALUES (3, 'getter', NULL, 'getter', DEFAULT, 'getter', 'here is a getter', 'enter the fielld you want a getter for', 3);
INSERT INTO `template` (`id`, `name`, `extension`, `content`, `access`, `template_type`, `description`, `instructions`, `user_id`) VALUES (4, 'setter', NULL, 'setter', DEFAULT, 'setter', 'here is a setter', 'enter the field you want for a setter', 4);
INSERT INTO `template` (`id`, `name`, `extension`, `content`, `access`, `template_type`, `description`, `instructions`, `user_id`) VALUES (5, 'resume', NULL, NULL, DEFAULT, NULL, NULL, NULL, 5);

COMMIT;


-- -----------------------------------------------------
-- Data for table `parent_child_template`
-- -----------------------------------------------------
START TRANSACTION;
USE `FrameWorkGeneratorDB`;
INSERT INTO `parent_child_template` (`parent_id`, `child_id`) VALUES (1, 2);
INSERT INTO `parent_child_template` (`parent_id`, `child_id`) VALUES (2, 3);
INSERT INTO `parent_child_template` (`parent_id`, `child_id`) VALUES (2, 4);

COMMIT;

