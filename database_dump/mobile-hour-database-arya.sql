-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: mobile-hour
-- ------------------------------------------------------
-- Server version	8.1.0

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
-- Table structure for table `change_log`
--

DROP TABLE IF EXISTS `change_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `change_log` (
  `change_log_id` int NOT NULL,
  `date_created` datetime NOT NULL,
  `date_last_modified` datetime NOT NULL,
  `staff_user_id` int NOT NULL,
  `product_id` int NOT NULL,
  PRIMARY KEY (`change_log_id`),
  KEY `staff_user_id_idx` (`staff_user_id`),
  KEY `product_id_idx` (`product_id`),
  CONSTRAINT `product_id_change_log` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`),
  CONSTRAINT `staff_user_id` FOREIGN KEY (`staff_user_id`) REFERENCES `staff_user` (`staff_user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `change_log`
--

LOCK TABLES `change_log` WRITE;
/*!40000 ALTER TABLE `change_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `change_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `customer_id` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `cust_phone` varchar(20) NOT NULL,
  `cust_email` varchar(100) NOT NULL,
  `cust_address` varchar(255) NOT NULL,
  `postcode` varchar(10) NOT NULL,
  `city` varchar(45) NOT NULL,
  `state` varchar(45) NOT NULL,
  PRIMARY KEY (`customer_id`),
  UNIQUE KEY `customer_id_UNIQUE` (`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feature`
--

DROP TABLE IF EXISTS `feature`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feature` (
  `feature_id` int NOT NULL AUTO_INCREMENT,
  `weight` decimal(5,0) DEFAULT NULL,
  `dimensions` varchar(100) DEFAULT NULL,
  `os` varchar(45) DEFAULT NULL,
  `screensize` decimal(4,1) DEFAULT NULL,
  `resolution` varchar(45) DEFAULT NULL,
  `chipset` varchar(45) DEFAULT NULL,
  `ram` int DEFAULT NULL,
  `storage_capacity` int DEFAULT NULL,
  `battery_capacity` int DEFAULT NULL,
  `rear_camera` varchar(70) DEFAULT NULL,
  `front_camera` varchar(70) DEFAULT NULL,
  PRIMARY KEY (`feature_id`)
) ENGINE=InnoDB AUTO_INCREMENT=118 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feature`
--

LOCK TABLES `feature` WRITE;
/*!40000 ALTER TABLE `feature` DISABLE KEYS */;
INSERT INTO `feature` VALUES (93,240,'160.7 x 77.6 x 7.9 ','Android 10',6.7,'1290 x 2796','Snapdragon 888',6,512,4234,'48 MP','48 MP'),(103,240,'160.7 x 77.6 x 7.9 ','Android 12',6.7,'1290 x 2796','A16 Bionic',6,256,4234,'48 MP','12 MP'),(109,240,'160.7 x 77.6 x 7.9 ','IOS17',6.7,'1290 x 2796','A16 Bionic',6,256,4234,'48 MP','48 MP'),(110,240,'160.7 x 77.6 x 7.9 ','Android 12',6.1,'1290 x 2796','Snapdragon 789',6,128,4500,'108 MP, 48 MP','12 MP'),(112,240,'160.7 x 77.6 x 7.9 mm','Android 12',6.7,'1290 x 2796','Snapdragon 888',6,256,4234,'48 MP','48 MP'),(115,240,'160.7 x 77.6 x 7.9 ','Android 12',6.1,'1290 x 2796','Snapdragon 888',6,256,4500,'48 MP','48 MP'),(116,240,'160.7 x 77.6 x 7.9 ','Android 10',6.1,'1290 x 2796','Snapdragon 888',6,256,4234,'48 MP','48 MP'),(117,434,'160.7 x 77.6 x 7.9 mm','IOS17',6.7,'1290 x 2796','A16 Bionic',6,256,4500,'108 MP, 48 MP','48 MP');
/*!40000 ALTER TABLE `feature` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_detail`
--

DROP TABLE IF EXISTS `order_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_detail` (
  `order_detail_id` int NOT NULL AUTO_INCREMENT,
  `quantity` int NOT NULL,
  `price_sold` decimal(10,2) NOT NULL,
  `product_id` int NOT NULL,
  `order_id` int NOT NULL,
  PRIMARY KEY (`order_detail_id`),
  UNIQUE KEY `order_detail_id_UNIQUE` (`order_detail_id`),
  KEY `product_id_idx` (`product_id`),
  KEY `order_id_idx` (`order_id`),
  CONSTRAINT `order_id` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  CONSTRAINT `product_id_order_detail` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_detail`
--

LOCK TABLES `order_detail` WRITE;
/*!40000 ALTER TABLE `order_detail` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `order_date` datetime NOT NULL,
  `order_delivery_date` datetime NOT NULL,
  `customer_id` int NOT NULL,
  PRIMARY KEY (`order_id`),
  UNIQUE KEY `order_id_UNIQUE` (`order_id`),
  KEY `customer_id_idx` (`customer_id`),
  CONSTRAINT `customer_id` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `product_name` varchar(100) NOT NULL,
  `product_brand` varchar(50) NOT NULL,
  `color` varchar(45) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `stock_quantity` int NOT NULL,
  `feature_id` int NOT NULL,
  PRIMARY KEY (`product_id`),
  KEY `feature_id_idx` (`feature_id`) /*!80000 INVISIBLE */,
  CONSTRAINT `feature_id_product` FOREIGN KEY (`feature_id`) REFERENCES `feature` (`feature_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=120 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (95,'Galaxy S23 ultra','Samsung','Purple',2099.00,99,93),(111,'Iphone 14 Pro Max','Apple','black',1899.00,30,109),(112,'Reno 10','Oppo','Black',999.00,8,110),(118,'Pixel 7 Pro','Google','black',999.00,89,116),(119,'Iphone 14 Pro Max','Apple','White',1799.00,23,117);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `staff_user`
--

DROP TABLE IF EXISTS `staff_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `staff_user` (
  `staff_user_id` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `staff_role` enum('manager','staff') NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`staff_user_id`),
  UNIQUE KEY `staff_user_id_UNIQUE` (`staff_user_id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staff_user`
--

LOCK TABLES `staff_user` WRITE;
/*!40000 ALTER TABLE `staff_user` DISABLE KEYS */;
INSERT INTO `staff_user` VALUES (4,'Arya','Suwegatama','manager','arya','$2a$10$UHKRFmb8LwJplDCMzOpM8etgh2fkk88MwXBjKHc1FnIZj3SrwxDeS'),(14,'Maya','Suwegatama','manager','maya','$2a$10$B73BP8HqyX2lX5g6xJk.IeHD95DF.4CHnA6w/K9KLS07Z3oYlWEXm'),(50,'John','Doe','staff','john','$2a$10$Sju.O86UtNdzhNRTF6Im0O1PXPcCJ7giupt/gX7XKpHfjJU/I3Vxe'),(56,'Kontama','Suwegatama','staff','kontama','$2a$10$H.eFaFg7mZ29xD22uCW0q.KuU9bf0bxEyDZzJNpDj.egH2gemKJQa');
/*!40000 ALTER TABLE `staff_user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-15 23:38:23
