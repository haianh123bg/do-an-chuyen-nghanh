-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: elearning_program
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `blog`
--

DROP TABLE IF EXISTS `blog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blog` (
  `item_id` int NOT NULL,
  `content` tinytext,
  PRIMARY KEY (`item_id`),
  CONSTRAINT `FKb4uo30m56bqaqnyycttui306r` FOREIGN KEY (`item_id`) REFERENCES `item` (`item_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blog`
--

LOCK TABLES `blog` WRITE;
/*!40000 ALTER TABLE `blog` DISABLE KEYS */;
/*!40000 ALTER TABLE `blog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `cart_id` int NOT NULL,
  `total_course` int DEFAULT NULL,
  `total_price` int DEFAULT NULL,
  PRIMARY KEY (`cart_id`),
  CONSTRAINT `FK5l2hhyr6durcorle1yc7xpjov` FOREIGN KEY (`cart_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart_detail`
--

DROP TABLE IF EXISTS `cart_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_detail` (
  `id` int NOT NULL AUTO_INCREMENT,
  `course_id` int DEFAULT NULL,
  `cart_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKrg4yopd2252nwj8bfcgq5f4jp` (`cart_id`),
  CONSTRAINT `FKrg4yopd2252nwj8bfcgq5f4jp` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`cart_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_detail`
--

LOCK TABLES `cart_detail` WRITE;
/*!40000 ALTER TABLE `cart_detail` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(100) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `total_course` int DEFAULT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coding_exercise`
--

DROP TABLE IF EXISTS `coding_exercise`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coding_exercise` (
  `item_id` int NOT NULL,
  `url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`item_id`),
  CONSTRAINT `FKl1f9imp3lod6mcq70rsvv3smt` FOREIGN KEY (`item_id`) REFERENCES `item` (`item_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coding_exercise`
--

LOCK TABLES `coding_exercise` WRITE;
/*!40000 ALTER TABLE `coding_exercise` DISABLE KEYS */;
/*!40000 ALTER TABLE `coding_exercise` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `comment_parent` int DEFAULT NULL,
  `comment_text` varchar(255) DEFAULT NULL,
  `created_at` varchar(45) DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `item_id` int DEFAULT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `FK3sv41rtg7i6je9xvyog9xo9dp` (`created_by`),
  KEY `FKihmv7q173gqi1xqgtsvw4s96m` (`item_id`),
  CONSTRAINT `FK3sv41rtg7i6je9xvyog9xo9dp` FOREIGN KEY (`created_by`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FKihmv7q173gqi1xqgtsvw4s96m` FOREIGN KEY (`item_id`) REFERENCES `item` (`item_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course` (
  `course_id` int NOT NULL AUTO_INCREMENT,
  `coursecol` varchar(45) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `detail_description` tinytext,
  `language` varchar(45) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` int DEFAULT NULL,
  `price_real` int DEFAULT NULL,
  `short_description` varchar(500) DEFAULT NULL,
  `teacher_id` int DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  PRIMARY KEY (`course_id`),
  KEY `FKkyes7515s3ypoovxrput029bh` (`category_id`),
  CONSTRAINT `FKkyes7515s3ypoovxrput029bh` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_has_tag`
--

DROP TABLE IF EXISTS `course_has_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course_has_tag` (
  `course_id` int NOT NULL,
  `tag_id` int NOT NULL,
  PRIMARY KEY (`course_id`,`tag_id`),
  KEY `FK1jwaff7oy711m96r7m83rv1si` (`tag_id`),
  CONSTRAINT `FK1jwaff7oy711m96r7m83rv1si` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`tag_id`),
  CONSTRAINT `FKn1migp8jausxt55n7lo9acx3i` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_has_tag`
--

LOCK TABLES `course_has_tag` WRITE;
/*!40000 ALTER TABLE `course_has_tag` DISABLE KEYS */;
/*!40000 ALTER TABLE `course_has_tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `discount`
--

DROP TABLE IF EXISTS `discount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `discount` (
  `discount_id` int NOT NULL AUTO_INCREMENT,
  `activity` bit(1) DEFAULT b'1',
  `expired_date` datetime(6) DEFAULT NULL,
  `lower_limit` int DEFAULT NULL,
  `percent` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL,
  `value` int DEFAULT NULL,
  PRIMARY KEY (`discount_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discount`
--

LOCK TABLES `discount` WRITE;
/*!40000 ALTER TABLE `discount` DISABLE KEYS */;
/*!40000 ALTER TABLE `discount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `item`
--

DROP TABLE IF EXISTS `item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `item` (
  `item_id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `description` tinytext,
  `title` varchar(255) NOT NULL,
  `type` varchar(45) NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `module_id` int DEFAULT NULL,
  `order` int DEFAULT NULL,
  PRIMARY KEY (`item_id`),
  KEY `FKj8d5bhnyrdmu93hfbg1a0fyhp` (`module_id`),
  CONSTRAINT `FKj8d5bhnyrdmu93hfbg1a0fyhp` FOREIGN KEY (`module_id`) REFERENCES `module` (`module_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item`
--

LOCK TABLES `item` WRITE;
/*!40000 ALTER TABLE `item` DISABLE KEYS */;
/*!40000 ALTER TABLE `item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `message`
--

DROP TABLE IF EXISTS `message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `message` (
  `message_id` int NOT NULL,
  `user_to` int DEFAULT NULL,
  `user_from` int DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `type` varchar(20) DEFAULT NULL,
  `create_at` datetime DEFAULT NULL,
  PRIMARY KEY (`message_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message`
--

LOCK TABLES `message` WRITE;
/*!40000 ALTER TABLE `message` DISABLE KEYS */;
/*!40000 ALTER TABLE `message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `module`
--

DROP TABLE IF EXISTS `module`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `module` (
  `module_id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `description` tinytext,
  `name` varchar(255) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `course_id` int NOT NULL,
  `order` int DEFAULT NULL,
  PRIMARY KEY (`module_id`),
  KEY `FKfq09oddpwjoxcirvkh9vnfnsg` (`course_id`),
  CONSTRAINT `FKfq09oddpwjoxcirvkh9vnfnsg` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `module`
--

LOCK TABLES `module` WRITE;
/*!40000 ALTER TABLE `module` DISABLE KEYS */;
/*!40000 ALTER TABLE `module` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `amount_discount` int DEFAULT NULL,
  `bank_name` varchar(45) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `discount` int DEFAULT NULL,
  `price` int DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `total` int DEFAULT NULL,
  `vnd_ref` varchar(100) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  KEY `FKcpl0mjoeqhxvgeeeq5piwpd3i` (`user_id`),
  CONSTRAINT `FKcpl0mjoeqhxvgeeeq5piwpd3i` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_line`
--

DROP TABLE IF EXISTS `order_line`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_line` (
  `order_line_id` int NOT NULL AUTO_INCREMENT,
  `amount` int DEFAULT NULL,
  `amount_discount` int DEFAULT NULL,
  `total` int DEFAULT NULL,
  `course_id` int DEFAULT NULL,
  `order_id` int DEFAULT NULL,
  PRIMARY KEY (`order_line_id`),
  KEY `FKwvik4ax21pqxrn0hlklosxsu` (`course_id`),
  KEY `FKkfx57nvwbbfh2ygrm3qpkr6cj` (`order_id`),
  CONSTRAINT `FKkfx57nvwbbfh2ygrm3qpkr6cj` FOREIGN KEY (`order_id`) REFERENCES `order` (`order_id`),
  CONSTRAINT `FKwvik4ax21pqxrn0hlklosxsu` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_line`
--

LOCK TABLES `order_line` WRITE;
/*!40000 ALTER TABLE `order_line` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_line` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permission`
--

DROP TABLE IF EXISTS `permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(100) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permission`
--

LOCK TABLES `permission` WRITE;
/*!40000 ALTER TABLE `permission` DISABLE KEYS */;
/*!40000 ALTER TABLE `permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `role_id` int NOT NULL AUTO_INCREMENT,
  `role_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_has_permission`
--

DROP TABLE IF EXISTS `role_has_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role_has_permission` (
  `status` bit(1) DEFAULT b'1',
  `permission_id` int NOT NULL,
  `role_id` int NOT NULL,
  PRIMARY KEY (`permission_id`,`role_id`),
  KEY `FKc616yaiie179glys9ee1gwsod` (`role_id`),
  CONSTRAINT `FK2h8xukv5c6o207f1iyj555146` FOREIGN KEY (`permission_id`) REFERENCES `permission` (`id`),
  CONSTRAINT `FKc616yaiie179glys9ee1gwsod` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_has_permission`
--

LOCK TABLES `role_has_permission` WRITE;
/*!40000 ALTER TABLE `role_has_permission` DISABLE KEYS */;
/*!40000 ALTER TABLE `role_has_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tag`
--

DROP TABLE IF EXISTS `tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tag` (
  `tag_id` int NOT NULL AUTO_INCREMENT,
  `tag_name` varchar(45) NOT NULL,
  `total_course` int DEFAULT NULL,
  PRIMARY KEY (`tag_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag`
--

LOCK TABLES `tag` WRITE;
/*!40000 ALTER TABLE `tag` DISABLE KEYS */;
/*!40000 ALTER TABLE `tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teacher`
--

DROP TABLE IF EXISTS `teacher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teacher` (
  `user_id` int NOT NULL,
  `qualification` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `FKpb6g6pahj1mr2ijg92r7m1xlh` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teacher`
--

LOCK TABLES `teacher` WRITE;
/*!40000 ALTER TABLE `teacher` DISABLE KEYS */;
/*!40000 ALTER TABLE `teacher` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ticket`
--

DROP TABLE IF EXISTS `ticket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ticket` (
  `ticket_id` int NOT NULL AUTO_INCREMENT,
  `assignee_name` varchar(45) DEFAULT NULL,
  `assignee_to` int DEFAULT NULL,
  `attachments` varchar(255) DEFAULT NULL,
  `category` varchar(45) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `creator_name` varchar(45) DEFAULT NULL,
  `description` varchar(45) DEFAULT NULL,
  `feedback` float DEFAULT NULL,
  `priority` varchar(45) DEFAULT NULL,
  `resolved_at` datetime(6) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `title` varchar(45) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`ticket_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ticket`
--

LOCK TABLES `ticket` WRITE;
/*!40000 ALTER TABLE `ticket` DISABLE KEYS */;
/*!40000 ALTER TABLE `ticket` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(45) DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `is_enable` bit(1) DEFAULT NULL,
  `is_verify` bit(1) DEFAULT NULL,
  `name` varchar(40) DEFAULT NULL,
  `password` varchar(500) DEFAULT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `phone_number_UNIQUE` (`phone_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_2fa_setting`
--

DROP TABLE IF EXISTS `user_2fa_setting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_2fa_setting` (
  `user_id` int NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `google_authenticator_enabled` bit(1) DEFAULT NULL,
  `google_authenticator_secret` varchar(500) DEFAULT NULL,
  `otp_email_enabled` bit(1) DEFAULT NULL,
  `otp_sms_enabled` bit(1) DEFAULT NULL,
  `update_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `FKovytgj4onf7c610fa785jpn7c` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_2fa_setting`
--

LOCK TABLES `user_2fa_setting` WRITE;
/*!40000 ALTER TABLE `user_2fa_setting` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_2fa_setting` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_has_course`
--

DROP TABLE IF EXISTS `user_has_course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_has_course` (
  `buy_date` datetime(6) DEFAULT NULL,
  `expired_time` datetime(6) DEFAULT NULL,
  `is_used` bit(1) DEFAULT NULL,
  `progress` int DEFAULT NULL,
  `course_id` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`course_id`,`user_id`),
  KEY `FKh2o2kcdcfkaksk5dxfhnpcfbc` (`user_id`),
  CONSTRAINT `FK61vspvp5bhh983xb6alg6mrbn` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`),
  CONSTRAINT `FKh2o2kcdcfkaksk5dxfhnpcfbc` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_has_course`
--

LOCK TABLES `user_has_course` WRITE;
/*!40000 ALTER TABLE `user_has_course` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_has_course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_has_discount`
--

DROP TABLE IF EXISTS `user_has_discount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_has_discount` (
  `expired_date` datetime(6) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `discount` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`discount`,`user_id`),
  KEY `FKe8iqok3udthwik2ro77c9iih7` (`user_id`),
  CONSTRAINT `FKe8iqok3udthwik2ro77c9iih7` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FKq7kd8qe9ru60r8of78jv5uv8t` FOREIGN KEY (`discount`) REFERENCES `discount` (`discount_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_has_discount`
--

LOCK TABLES `user_has_discount` WRITE;
/*!40000 ALTER TABLE `user_has_discount` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_has_discount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_has_permission`
--

DROP TABLE IF EXISTS `user_has_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_has_permission` (
  `permission_id` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`permission_id`,`user_id`),
  KEY `FK8utwo4kml2gqrry728b1k6uld` (`user_id`),
  CONSTRAINT `FK8utwo4kml2gqrry728b1k6uld` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FKa75cbxvwx1qjd95qhghxmhty2` FOREIGN KEY (`permission_id`) REFERENCES `permission` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_has_permission`
--

LOCK TABLES `user_has_permission` WRITE;
/*!40000 ALTER TABLE `user_has_permission` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_has_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_has_role`
--

DROP TABLE IF EXISTS `user_has_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_has_role` (
  `role_id` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`role_id`,`user_id`),
  KEY `FKdtkvc2iy3ph1rkvd67yl2t13m` (`user_id`),
  CONSTRAINT `FKc1m07gjgx777ukpfw6wa94dfh` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`),
  CONSTRAINT `FKdtkvc2iy3ph1rkvd67yl2t13m` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_has_role`
--

LOCK TABLES `user_has_role` WRITE;
/*!40000 ALTER TABLE `user_has_role` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_has_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_otp`
--

DROP TABLE IF EXISTS `user_otp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_otp` (
  `otp_id` bigint NOT NULL AUTO_INCREMENT,
  `available_after` datetime(6) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `expires_at` datetime(6) DEFAULT NULL,
  `max_attempts` int DEFAULT NULL,
  `otp_code` varchar(45) DEFAULT NULL,
  `otp_method` varchar(45) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`otp_id`),
  KEY `FKbvr6ctaxbtiehuoh6m96b9iqi` (`user_id`),
  CONSTRAINT `FKbvr6ctaxbtiehuoh6m96b9iqi` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_otp`
--

LOCK TABLES `user_otp` WRITE;
/*!40000 ALTER TABLE `user_otp` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_otp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `video_lectures`
--

DROP TABLE IF EXISTS `video_lectures`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `video_lectures` (
  `item_id` int NOT NULL,
  `description` tinytext,
  `url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`item_id`),
  CONSTRAINT `FKkytpy674h57ssiovivudm8xg` FOREIGN KEY (`item_id`) REFERENCES `item` (`item_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `video_lectures`
--

LOCK TABLES `video_lectures` WRITE;
/*!40000 ALTER TABLE `video_lectures` DISABLE KEYS */;
/*!40000 ALTER TABLE `video_lectures` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-31  2:07:49
