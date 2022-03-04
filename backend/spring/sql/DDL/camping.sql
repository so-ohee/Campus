-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema camping
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema camping
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `camping` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `camping` ;

-- -----------------------------------------------------
-- Table `camping`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `camping`.`user` (
    `user_uid` VARCHAR(45) NOT NULL,
    `user_name` VARCHAR(45) NOT NULL,
    `user_state` TINYINT NOT NULL,
    `user_profile` VARCHAR(45) NULL,
    PRIMARY KEY (`user_uid`))
    ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `camping`.`camping`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `camping`.`camping` (
                                                   `camping_id` INT NOT NULL AUTO_INCREMENT,
                                                   `faclt_nm` VARCHAR(45) NULL,
    `line_intro` VARCHAR(45) NULL,
    `intro` VARCHAR(1000) NULL,
    `allar` INT NULL,
    PRIMARY KEY (`camping_id`))
    ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `camping`.`review`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `camping`.`review` (
                                                  `review_id` INT NOT NULL AUTO_INCREMENT,
                                                  `content` TEXT NOT NULL,
                                                  `title` VARCHAR(45) NOT NULL,
    `user_uid` VARCHAR(45) NOT NULL,
    `camping_id` INT NOT NULL,
    `hit` INT NOT NULL DEFAULT 0,
    `create_time` DATETIME NOT NULL DEFAULT current_timestamp,
    `update_state` TINYINT NOT NULL DEFAULT 0,
    `update_time` DATETIME NULL,
    `delete_state` TINYINT NOT NULL DEFAULT 0,
    PRIMARY KEY (`review_id`),
    INDEX `fk_review_user_idx` (`user_uid` ASC) VISIBLE,
    INDEX `fk_review_camping1_idx` (`camping_id` ASC) VISIBLE,
    CONSTRAINT `fk_review_user`
    FOREIGN KEY (`user_uid`)
    REFERENCES `camping`.`user` (`user_uid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
    CONSTRAINT `fk_review_camping1`
    FOREIGN KEY (`camping_id`)
    REFERENCES `camping`.`camping` (`camping_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
    ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `camping`.`rating`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `camping`.`rating` (
                                                  `rating_id` INT NOT NULL AUTO_INCREMENT,
                                                  `environment` INT NOT NULL,
                                                  `facility` INT NOT NULL,
                                                  `service` VARCHAR(45) NOT NULL,
    `review_no` INT NOT NULL,
    PRIMARY KEY (`rating_id`),
    INDEX `fk_rating_review1_idx` (`review_no` ASC) VISIBLE,
    CONSTRAINT `fk_rating_review1`
    FOREIGN KEY (`review_no`)
    REFERENCES `camping`.`review` (`review_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
    ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `camping`.`visit`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `camping`.`visit` (
                                                 `visit_id` INT NOT NULL AUTO_INCREMENT,
                                                 `user_uid` VARCHAR(45) NOT NULL,
    `camping_id` INT NOT NULL,
    PRIMARY KEY (`visit_id`),
    INDEX `fk_visit_user1_idx` (`user_uid` ASC) VISIBLE,
    INDEX `fk_visit_camping1_idx` (`camping_id` ASC) VISIBLE,
    CONSTRAINT `fk_visit_user1`
    FOREIGN KEY (`user_uid`)
    REFERENCES `camping`.`user` (`user_uid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
    CONSTRAINT `fk_visit_camping1`
    FOREIGN KEY (`camping_id`)
    REFERENCES `camping`.`camping` (`camping_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
    ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `camping`.`notice`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `camping`.`notice` (
                                                  `notice_id` INT NOT NULL AUTO_INCREMENT,
                                                  `title` VARCHAR(45) NOT NULL,
    `content` TEXT NOT NULL,
    `create_time` DATETIME NOT NULL DEFAULT current_timestamp,
    `update_state` TINYINT NOT NULL DEFAULT 0,
    `update_time` DATETIME NULL,
    `hit` INT NOT NULL DEFAULT 0,
    `delete_state` TINYINT NOT NULL DEFAULT 0,
    `category` VARCHAR(45) NOT NULL,
    `user_uid` VARCHAR(45) NOT NULL,
    PRIMARY KEY (`notice_id`),
    INDEX `fk_notice_user1_idx` (`user_uid` ASC) VISIBLE,
    CONSTRAINT `fk_notice_user1`
    FOREIGN KEY (`user_uid`)
    REFERENCES `camping`.`user` (`user_uid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
    ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `camping`.`comment_review`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `camping`.`comment_review` (
                                                          `comment_id` INT NOT NULL AUTO_INCREMENT,
                                                          `comment` VARCHAR(45) NOT NULL,
    `create_time` DATETIME NOT NULL DEFAULT current_timestamp,
    `review_id` INT NOT NULL,
    PRIMARY KEY (`comment_id`),
    INDEX `fk_comment_review_review1_idx` (`review_id` ASC) VISIBLE,
    CONSTRAINT `fk_comment_review_review1`
    FOREIGN KEY (`review_id`)
    REFERENCES `camping`.`review` (`review_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
    ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `camping`.`comment_notice`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `camping`.`comment_notice` (
                                                          `comment_id` INT NOT NULL AUTO_INCREMENT,
                                                          `comment` VARCHAR(45) NOT NULL,
    `create_time` DATETIME NOT NULL DEFAULT current_timestamp,
    `notice_notice_id` INT NOT NULL,
    PRIMARY KEY (`comment_id`, `notice_notice_id`),
    INDEX `fk_comment_notice_notice1_idx` (`notice_notice_id` ASC) VISIBLE,
    CONSTRAINT `fk_comment_notice_notice1`
    FOREIGN KEY (`notice_notice_id`)
    REFERENCES `camping`.`notice` (`notice_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
    ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `camping`.`follow`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `camping`.`follow` (
                                                  `follow_id` INT NOT NULL AUTO_INCREMENT,
                                                  `user_uid` VARCHAR(45) NOT NULL,
    `get_user_uid` VARCHAR(45) NOT NULL,
    PRIMARY KEY (`follow_id`),
    INDEX `fk_follow_user1_idx` (`user_uid` ASC) VISIBLE,
    INDEX `fk_follow_user2_idx` (`get_user_uid` ASC) VISIBLE,
    CONSTRAINT `fk_follow_user1`
    FOREIGN KEY (`user_uid`)
    REFERENCES `camping`.`user` (`user_uid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
    CONSTRAINT `fk_follow_user2`
    FOREIGN KEY (`get_user_uid`)
    REFERENCES `camping`.`user` (`user_uid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
    ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `camping`.`bookmark`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `camping`.`bookmark` (
                                                    `bookmark_id` INT NOT NULL AUTO_INCREMENT,
                                                    `user_uid` VARCHAR(45) NOT NULL,
    `camping_id` INT NOT NULL,
    PRIMARY KEY (`bookmark_id`),
    INDEX `fk_bookmark_user1_idx` (`user_uid` ASC) VISIBLE,
    INDEX `fk_bookmark_camping1_idx` (`camping_id` ASC) VISIBLE,
    CONSTRAINT `fk_bookmark_user1`
    FOREIGN KEY (`user_uid`)
    REFERENCES `camping`.`user` (`user_uid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
    CONSTRAINT `fk_bookmark_camping1`
    FOREIGN KEY (`camping_id`)
    REFERENCES `camping`.`camping` (`camping_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
    ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `camping`.`view_log`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `camping`.`view_log` (
                                                    `view_id` INT NOT NULL AUTO_INCREMENT,
                                                    `camping_id` INT NOT NULL,
                                                    `user_uid` VARCHAR(45) NOT NULL,
    PRIMARY KEY (`view_id`),
    INDEX `fk_view_log_camping1_idx` (`camping_id` ASC) VISIBLE,
    INDEX `fk_view_log_user1_idx` (`user_uid` ASC) VISIBLE,
    CONSTRAINT `fk_view_log_camping1`
    FOREIGN KEY (`camping_id`)
    REFERENCES `camping`.`camping` (`camping_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
    CONSTRAINT `fk_view_log_user1`
    FOREIGN KEY (`user_uid`)
    REFERENCES `camping`.`user` (`user_uid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
    ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
