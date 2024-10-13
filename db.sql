-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema elearning-programmin
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema elearning-programmin
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `elearning-programmin` DEFAULT CHARACTER SET utf8 ;
USE `elearning-programmin` ;

-- -----------------------------------------------------
-- Table `elearning-programmin`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `elearning-programmin`.`user` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(40) NULL,
  `phone_number` VARCHAR(20) NULL,
  `gender` VARCHAR(10) NULL,
  `email` VARCHAR(45) NULL,
  `is_verify` TINYINT NULL,
  `is_enable` TINYINT NULL,
  PRIMARY KEY (`user_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `elearning-programmin`.`user_2fa_setting`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `elearning-programmin`.`user_2fa_setting` (
  `user_id` INT NOT NULL,
  `otp_sms_enabled` TINYINT NULL DEFAULT 0,
  `otp_email_enabled` TINYINT NULL DEFAULT 0,
  `google_authenticator_enabled` TINYINT NULL DEFAULT 0,
  `google_authenticator_secret` VARCHAR(500) NULL,
  `created_at` DATETIME GENERATED ALWAYS AS (),
  `update_at` DATETIME GENERATED ALWAYS AS () VIRTUAL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `fk_user_2fa_setting_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `elearning-programmin`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `elearning-programmin`.`user_otp`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `elearning-programmin`.`user_otp` (
  `otp_id` BIGINT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `otp_code` VARCHAR(45) NULL,
  `otp_method` VARCHAR(45) NULL,
  `created_at` DATETIME NULL,
  `expires_at` DATETIME NULL,
  `available_after` DATETIME NULL,
  `max_attempts` INT NULL,
  `user_user_id` INT NOT NULL,
  PRIMARY KEY (`otp_id`),
  INDEX `fk_user_otp_user1_idx` (`user_user_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_otp_user1`
    FOREIGN KEY (`user_user_id`)
    REFERENCES `elearning-programmin`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `elearning-programmin`.`message`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `elearning-programmin`.`message` (
  `to` INT NOT NULL,
  `from` INT NOT NULL,
  `message_id` BIGINT NOT NULL AUTO_INCREMENT,
  `content` TEXT NULL,
  `type` VARCHAR(20) NULL,
  `create_at` DATETIME GENERATED ALWAYS AS () VIRTUAL,
  PRIMARY KEY (`message_id`),
  INDEX `user_has_message_fk_idx` (`to` ASC, `from` ASC) VISIBLE,
  CONSTRAINT `user_has_message_fk`
    FOREIGN KEY (`to` , `from`)
    REFERENCES `elearning-programmin`.`user` (`user_id` , `user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `elearning-programmin`.`role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `elearning-programmin`.`role` (
  `role_id` INT NOT NULL AUTO_INCREMENT,
  `role_name` VARCHAR(45) NULL,
  PRIMARY KEY (`role_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `elearning-programmin`.`user_has_role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `elearning-programmin`.`user_has_role` (
  `user_id` INT NOT NULL,
  `role_id` INT NOT NULL,
  PRIMARY KEY (`user_id`, `role_id`),
  INDEX `fk_user_has_role_role1_idx` (`role_id` ASC) VISIBLE,
  INDEX `fk_user_has_role_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_has_role_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `elearning-programmin`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_role_role1`
    FOREIGN KEY (`role_id`)
    REFERENCES `elearning-programmin`.`role` (`role_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `elearning-programmin`.`ticket`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `elearning-programmin`.`ticket` (
  `ticket_id` INT NOT NULL AUTO_INCREMENT,
  `created_by` INT NULL,
  `creator_name` VARCHAR(45) NULL,
  `assignee_to` INT NULL,
  `assignee_name` VARCHAR(45) NULL,
  `title` VARCHAR(45) NULL,
  `description` VARCHAR(45) NULL,
  `priority` VARCHAR(45) NULL,
  `status` VARCHAR(45) NULL,
  `created_at` DATETIME NULL,
  `updated_at` DATETIME NULL,
  `resolved_at` DATETIME NULL,
  `category` VARCHAR(45) NULL,
  `attachments` VARCHAR(255) NULL,
  `feedback` FLOAT NULL,
  PRIMARY KEY (`ticket_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `elearning-programmin`.`category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `elearning-programmin`.`category` (
  `category_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NULL,
  `description` VARCHAR(100) NULL,
  `total_course` INT NULL,
  PRIMARY KEY (`category_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `elearning-programmin`.`tag`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `elearning-programmin`.`tag` (
  `tag_name` VARCHAR(45) NOT NULL,
  `tag_id` INT NOT NULL AUTO_INCREMENT,
  `total_course` INT NULL,
  PRIMARY KEY (`tag_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `elearning-programmin`.`permission`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `elearning-programmin`.`permission` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `description` VARCHAR(100) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `elearning-programmin`.`role_has_permission`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `elearning-programmin`.`role_has_permission` (
  `role_id` INT NOT NULL,
  `permission_id` INT NOT NULL,
  `status` TINYINT NULL DEFAULT 1,
  PRIMARY KEY (`role_id`, `permission_id`),
  INDEX `role_has_permission_fk_permission_idx` (`permission_id` ASC) VISIBLE,
  CONSTRAINT `role_has_permission_fk_role`
    FOREIGN KEY (`role_id`)
    REFERENCES `elearning-programmin`.`role` (`role_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `role_has_permission_fk_permission`
    FOREIGN KEY (`permission_id`)
    REFERENCES `elearning-programmin`.`permission` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `elearning-programmin`.`user_has_permission`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `elearning-programmin`.`user_has_permission` (
  `user_id` INT NOT NULL,
  `permission_id` INT NOT NULL,
  PRIMARY KEY (`user_id`, `permission_id`),
  INDEX `user_has_permission_fk_permission_idx` (`permission_id` ASC) VISIBLE,
  CONSTRAINT `user_has_permission_fk_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `elearning-programmin`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `user_has_permission_fk_permission`
    FOREIGN KEY (`permission_id`)
    REFERENCES `elearning-programmin`.`permission` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `elearning-programmin`.`teacher`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `elearning-programmin`.`teacher` (
  `user_id` INT NOT NULL,
  `qualification` VARCHAR(100) NULL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `teacher_fk_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `elearning-programmin`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `elearning-programmin`.`course`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `elearning-programmin`.`course` (
  `course_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL,
  `coursecol` VARCHAR(45) NULL,
  `short_description` VARCHAR(500) NULL,
  `detail_description` TEXT NULL,
  `created_at` DATETIME NULL,
  `updated_at` DATETIME NULL,
  `created_by` INT NULL,
  `updated_by` INT NULL,
  `teacher_id` INT NULL,
  `category_id` INT NULL,
  `language` VARCHAR(45) NULL,
  `price` INT NULL,
  `category_id` INT NULL,
  `price_real` INT NULL,
  PRIMARY KEY (`course_id`),
  INDEX `course_fk_category_idx` (`category_id` ASC) VISIBLE,
  CONSTRAINT `course_fk_category`
    FOREIGN KEY (`category_id`)
    REFERENCES `elearning-programmin`.`category` (`category_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `elearning-programmin`.`user_has_course`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `elearning-programmin`.`user_has_course` (
  `user_id` INT NOT NULL,
  `course_id` INT NOT NULL,
  `buy_date` DATETIME NULL,
  `is_used` TINYINT NULL,
  `expired_time` DATETIME NULL,
  `progress` INT NULL,
  PRIMARY KEY (`user_id`, `course_id`),
  INDEX `user_has_course_fk_course_idx` (`course_id` ASC) VISIBLE,
  CONSTRAINT `user_has_course_fk_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `elearning-programmin`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `user_has_course_fk_course`
    FOREIGN KEY (`course_id`)
    REFERENCES `elearning-programmin`.`course` (`course_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `elearning-programmin`.`course_has_tag`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `elearning-programmin`.`course_has_tag` (
  `course_id` INT NOT NULL,
  `tag_id` INT NOT NULL,
  PRIMARY KEY (`course_id`, `tag_id`),
  INDEX `course_has_tag_fk_tag_idx` (`tag_id` ASC) VISIBLE,
  CONSTRAINT `course_has_tag_fk_tag`
    FOREIGN KEY (`tag_id`)
    REFERENCES `elearning-programmin`.`tag` (`tag_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `course_has_tag_fk_course`
    FOREIGN KEY (`course_id`)
    REFERENCES `elearning-programmin`.`course` (`course_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `elearning-programmin`.`module`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `elearning-programmin`.`module` (
  `module_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL,
  `description` TEXT NULL,
  `created_at` DATETIME NULL,
  `updated_at` DATETIME NULL,
  `course_id` INT NOT NULL,
  PRIMARY KEY (`module_id`),
  INDEX `module_fk_course_idx` (`course_id` ASC) VISIBLE,
  CONSTRAINT `module_fk_course`
    FOREIGN KEY (`course_id`)
    REFERENCES `elearning-programmin`.`course` (`course_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `elearning-programmin`.`item`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `elearning-programmin`.`item` (
  `item_id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT NULL,
  `created_at` DATETIME NULL,
  `updated_at` DATETIME NULL,
  `type` VARCHAR(45) NOT NULL,
  `module_id` INT NULL,
  PRIMARY KEY (`item_id`),
  INDEX `item_fk_module_idx` (`module_id` ASC) VISIBLE,
  CONSTRAINT `item_fk_module`
    FOREIGN KEY (`module_id`)
    REFERENCES `elearning-programmin`.`module` (`module_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `elearning-programmin`.`coding_exercise`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `elearning-programmin`.`coding_exercise` (
  `item_id` INT NOT NULL,
  `url` VARCHAR(255) NULL,
  PRIMARY KEY (`item_id`),
  CONSTRAINT `coding_exercise_fk_item`
    FOREIGN KEY (`item_id`)
    REFERENCES `elearning-programmin`.`item` (`item_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `elearning-programmin`.`video_lectures`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `elearning-programmin`.`video_lectures` (
  `item_id` INT NOT NULL,
  `description` TEXT NULL,
  `url` VARCHAR(255) NULL,
  PRIMARY KEY (`item_id`),
  CONSTRAINT `video_lectures`
    FOREIGN KEY (`item_id`)
    REFERENCES `elearning-programmin`.`item` (`item_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `elearning-programmin`.`blog`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `elearning-programmin`.`blog` (
  `item_id` INT NOT NULL,
  `content` TEXT NULL,
  PRIMARY KEY (`item_id`),
  CONSTRAINT `blog_fk_content`
    FOREIGN KEY (`item_id`)
    REFERENCES `elearning-programmin`.`item` (`item_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `elearning-programmin`.`comment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `elearning-programmin`.`comment` (
  `comment_id` INT NOT NULL,
  `item_id` INT NULL,
  `comment_parent` INT NULL,
  `comment_text` VARCHAR(255) NULL,
  `created_at` VARCHAR(45) NULL,
  `created_by` INT NULL,
  PRIMARY KEY (`comment_id`),
  INDEX `comment_fk_user_idx` (`created_by` ASC) VISIBLE,
  INDEX `comment_fk_item_idx` (`item_id` ASC) VISIBLE,
  CONSTRAINT `comment_fk_user`
    FOREIGN KEY (`created_by`)
    REFERENCES `elearning-programmin`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `comment_fk_item`
    FOREIGN KEY (`item_id`)
    REFERENCES `elearning-programmin`.`item` (`item_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `elearning-programmin`.`discount`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `elearning-programmin`.`discount` (
  `discount_id` INT NOT NULL AUTO_INCREMENT,
  `percent` INT NULL,
  `value` INT NULL,
  `type` VARCHAR(45) NULL,
  `lower_limit` INT NULL,
  `quantity` INT NULL,
  `expired_date` DATETIME NULL,
  `activity` TINYINT NULL DEFAULT 1,
  PRIMARY KEY (`discount_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `elearning-programmin`.`user_has_discount`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `elearning-programmin`.`user_has_discount` (
  `user_id` INT NOT NULL,
  `discount` INT NOT NULL,
  `quantity` INT NULL,
  `expired_date` DATETIME NULL,
  PRIMARY KEY (`user_id`, `discount`),
  INDEX `user_has_discount_fk_discount_idx` (`discount` ASC) VISIBLE,
  CONSTRAINT `user_has_discount_fk_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `elearning-programmin`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `user_has_discount_fk_discount`
    FOREIGN KEY (`discount`)
    REFERENCES `elearning-programmin`.`discount` (`discount_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `elearning-programmin`.`cart`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `elearning-programmin`.`cart` (
  `cart_id` INT NOT NULL AUTO_INCREMENT,
  `total_price` INT NULL,
  `total_course` INT NULL,
  PRIMARY KEY (`cart_id`),
  CONSTRAINT `cart_fk_user`
    FOREIGN KEY (`cart_id`)
    REFERENCES `elearning-programmin`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `elearning-programmin`.`cart_detail`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `elearning-programmin`.`cart_detail` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `course_id` INT NULL,
  `cart_id` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `cart_detail_fk_cart_idx` (`cart_id` ASC) VISIBLE,
  CONSTRAINT `cart_detail_fk_cart`
    FOREIGN KEY (`cart_id`)
    REFERENCES `elearning-programmin`.`cart` (`cart_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `elearning-programmin`.`order`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `elearning-programmin`.`order` (
  `order_id` INT NOT NULL AUTO_INCREMENT,
  `bank_name` VARCHAR(45) NULL,
  `discount` INT NULL,
  `user_id` INT NULL,
  `created_at` DATETIME NULL,
  `price` INT NULL,
  `total` INT NULL,
  `amount_discount` INT NULL,
  `status` VARCHAR(45) NULL,
  `vnd_ref` VARCHAR(100) NULL,
  PRIMARY KEY (`order_id`),
  INDEX `order_fk_user_idx` (`user_id` ASC) VISIBLE,
  UNIQUE INDEX `vnd_ref_UNIQUE` (`vnd_ref` ASC) VISIBLE,
  CONSTRAINT `order_fk_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `elearning-programmin`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `elearning-programmin`.`order_line`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `elearning-programmin`.`order_line` (
  `order_line_id` INT NOT NULL AUTO_INCREMENT,
  `order_id` INT NULL,
  `course_id` INT NULL,
  `amount` INT NULL,
  `amount_discount` INT NULL,
  `total` INT NULL,
  PRIMARY KEY (`order_line_id`),
  INDEX `order_line_idx` (`order_id` ASC) VISIBLE,
  INDEX `order_line_fk_course_idx` (`course_id` ASC) VISIBLE,
  CONSTRAINT `order_line_fk_order`
    FOREIGN KEY (`order_id`)
    REFERENCES `elearning-programmin`.`order` (`order_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `order_line_fk_course`
    FOREIGN KEY (`course_id`)
    REFERENCES `elearning-programmin`.`course` (`course_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
