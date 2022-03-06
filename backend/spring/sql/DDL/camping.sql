-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema camping
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema camping
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `camping` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `camping` ;

-- -----------------------------------------------------
-- Table `camping`.`camping`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `camping`.`camping` (
                                                   `camping_id` INT NOT NULL AUTO_INCREMENT,
                                                   `faclt_nm` VARCHAR(45) NULL DEFAULT NULL,
    `line_intro` VARCHAR(45) NULL DEFAULT NULL,
    `intro` VARCHAR(1000) NULL DEFAULT NULL,
    `allar` INT NULL DEFAULT NULL,
    PRIMARY KEY (`camping_id`))
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
    COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `camping`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `camping`.`user` (
    `user_uid` VARCHAR(45) NOT NULL,
    `user_name` VARCHAR(45) NOT NULL,
    `user_state` TINYINT NOT NULL DEFAULT 0,
    `user_profile` VARCHAR(45) NULL DEFAULT NULL,
    PRIMARY KEY (`user_uid`))
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
    COLLATE = utf8mb4_0900_ai_ci;


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
    CONSTRAINT `fk_bookmark_camping1`
    FOREIGN KEY (`camping_id`)
    REFERENCES `camping`.`camping` (`camping_id`),
    CONSTRAINT `fk_bookmark_user1`
    FOREIGN KEY (`user_uid`)
    REFERENCES `camping`.`user` (`user_uid`))
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
    COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `camping`.`notice`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `camping`.`notice` (
                                                  `notice_id` INT NOT NULL AUTO_INCREMENT,
                                                  `user_uid` VARCHAR(45) NOT NULL,
    `category` VARCHAR(45) NOT NULL,
    `title` VARCHAR(45) NOT NULL,
    `content` TEXT NOT NULL,
    `create_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `update_state` TINYINT NOT NULL DEFAULT '0',
    `update_time` DATETIME NULL DEFAULT NULL,
    `delete_state` TINYINT NOT NULL DEFAULT '0',
    `hit` INT NOT NULL DEFAULT '0',
    PRIMARY KEY (`notice_id`),
    INDEX `fk_notice_user1_idx` (`user_uid` ASC) VISIBLE,
    CONSTRAINT `fk_notice_user1`
    FOREIGN KEY (`user_uid`)
    REFERENCES `camping`.`user` (`user_uid`))
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
    COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `camping`.`comment_notice`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `camping`.`comment_notice` (
                                                          `comment_id` INT NOT NULL AUTO_INCREMENT,
                                                          `notice_id` INT NOT NULL,
                                                          `comment` VARCHAR(400) NOT NULL,
    `create_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `update_state` TINYINT NOT NULL DEFAULT 0,
    `update_time` DATETIME NULL DEFAULT NULL,
    PRIMARY KEY (`comment_id`),
    INDEX `fk_comment_notice_notice1_idx` (`notice_id` ASC) VISIBLE,
    CONSTRAINT `fk_comment_notice_notice1`
    FOREIGN KEY (`notice_id`)
    REFERENCES `camping`.`notice` (`notice_id`))
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
    COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `camping`.`review`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `camping`.`review` (
                                                  `review_id` INT NOT NULL AUTO_INCREMENT,
                                                  `user_uid` VARCHAR(45) NOT NULL,
    `camping_id` INT NOT NULL,
    `title` VARCHAR(45) NOT NULL,
    `content` TEXT NOT NULL,
    `create_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `update_state` TINYINT NOT NULL DEFAULT '0',
    `update_time` DATETIME NULL DEFAULT NULL,
    `delete_state` TINYINT NOT NULL DEFAULT '0',
    `hit` INT NOT NULL DEFAULT '0',
    PRIMARY KEY (`review_id`),
    INDEX `fk_review_user_idx` (`user_uid` ASC) VISIBLE,
    INDEX `fk_review_camping1_idx` (`camping_id` ASC) VISIBLE,
    CONSTRAINT `fk_review_camping1`
    FOREIGN KEY (`camping_id`)
    REFERENCES `camping`.`camping` (`camping_id`),
    CONSTRAINT `fk_review_user`
    FOREIGN KEY (`user_uid`)
    REFERENCES `camping`.`user` (`user_uid`))
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
    COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `camping`.`comment_review`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `camping`.`comment_review` (
                                                          `comment_id` INT NOT NULL AUTO_INCREMENT,
                                                          `review_id` INT NOT NULL,
                                                          `comment` VARCHAR(400) NOT NULL,
    `create_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `update_state` TINYINT NOT NULL DEFAULT 0,
    `update_time` DATETIME NULL DEFAULT NULL,
    PRIMARY KEY (`comment_id`),
    INDEX `fk_comment_review_review1_idx` (`review_id` ASC) VISIBLE,
    CONSTRAINT `fk_comment_review_review1`
    FOREIGN KEY (`review_id`)
    REFERENCES `camping`.`review` (`review_id`))
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
    COLLATE = utf8mb4_0900_ai_ci;


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
    REFERENCES `camping`.`user` (`user_uid`),
    CONSTRAINT `fk_follow_user2`
    FOREIGN KEY (`get_user_uid`)
    REFERENCES `camping`.`user` (`user_uid`))
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
    COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `camping`.`rating`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `camping`.`rating` (
                                                  `rating_id` INT NOT NULL AUTO_INCREMENT,
                                                  `review_id` INT NOT NULL,
                                                  `environment` INT NOT NULL,
                                                  `facility` INT NOT NULL,
                                                  `service` VARCHAR(45) NOT NULL,
    PRIMARY KEY (`rating_id`),
    INDEX `fk_rating_review1_idx` (`review_id` ASC) VISIBLE,
    CONSTRAINT `fk_rating_review1`
    FOREIGN KEY (`review_id`)
    REFERENCES `camping`.`review` (`review_id`))
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
    COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `camping`.`view_log`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `camping`.`view_log` (
                                                    `view_id` INT NOT NULL AUTO_INCREMENT,
                                                    `user_uid` VARCHAR(45) NOT NULL,
    `camping_id` INT NOT NULL,
    PRIMARY KEY (`view_id`),
    INDEX `fk_view_log_camping1_idx` (`camping_id` ASC) VISIBLE,
    INDEX `fk_view_log_user1_idx` (`user_uid` ASC) VISIBLE,
    CONSTRAINT `fk_view_log_camping1`
    FOREIGN KEY (`camping_id`)
    REFERENCES `camping`.`camping` (`camping_id`),
    CONSTRAINT `fk_view_log_user1`
    FOREIGN KEY (`user_uid`)
    REFERENCES `camping`.`user` (`user_uid`))
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
    COLLATE = utf8mb4_0900_ai_ci;


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
    CONSTRAINT `fk_visit_camping1`
    FOREIGN KEY (`camping_id`)
    REFERENCES `camping`.`camping` (`camping_id`),
    CONSTRAINT `fk_visit_user1`
    FOREIGN KEY (`user_uid`)
    REFERENCES `camping`.`user` (`user_uid`))
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
    COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `camping`.`file_review`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `camping`.`file_review` (
                                                       `file_id` INT NOT NULL AUTO_INCREMENT,
                                                       `review_id` INT NOT NULL,
                                                       `fil_path` VARCHAR(100) NOT NULL,
    PRIMARY KEY (`file_id`),
    INDEX `fk_review_file_review1_idx` (`review_id` ASC) VISIBLE,
    CONSTRAINT `fk_review_file_review1`
    FOREIGN KEY (`review_id`)
    REFERENCES `camping`.`review` (`review_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
    ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `camping`.`file_notice`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `camping`.`file_notice` (
                                                       `file_id` INT NOT NULL AUTO_INCREMENT,
                                                       `notice_id` INT NOT NULL,
                                                       `fil_path` VARCHAR(100) NOT NULL,
    PRIMARY KEY (`file_id`),
    INDEX `fk_notice_file_notice1_idx` (`notice_id` ASC) VISIBLE,
    CONSTRAINT `fk_notice_file_notice1`
    FOREIGN KEY (`notice_id`)
    REFERENCES `camping`.`notice` (`notice_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
    ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;