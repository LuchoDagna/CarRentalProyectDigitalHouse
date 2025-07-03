-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: rentalcar
-- ------------------------------------------------------
-- Server version	8.0.41

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
-- Table structure for table `appointments`
--

DROP TABLE IF EXISTS `appointments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appointments` (
  `appointment_id` int NOT NULL AUTO_INCREMENT,
  `start_date` datetime(6) DEFAULT NULL,
  `end_date` datetime(6) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `car_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`appointment_id`),
  KEY `FK1_Appointments_idx` (`car_id`),
  KEY `FK2_Appointments_idx` (`user_id`),
  CONSTRAINT `FK1_Appointments` FOREIGN KEY (`car_id`) REFERENCES `cars` (`car_id`),
  CONSTRAINT `FK2_Appointments` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointments`
--

LOCK TABLES `appointments` WRITE;
/*!40000 ALTER TABLE `appointments` DISABLE KEYS */;
INSERT INTO `appointments` VALUES (32,'2025-06-13 00:00:00.000000','2025-06-21 00:00:00.000000','PENDIENTE',2,22),(33,'2025-06-13 00:00:00.000000','2025-06-20 00:00:00.000000','PENDIENTE',1,NULL),(42,'2025-06-23 00:00:00.000000','2025-06-27 00:00:00.000000','PENDIENTE',1,22),(43,'2025-06-24 00:00:00.000000','2025-06-28 00:00:00.000000','PENDIENTE',2,22);
/*!40000 ALTER TABLE `appointments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `car_categories`
--

DROP TABLE IF EXISTS `car_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `car_categories` (
  `car_category_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`car_category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `car_categories`
--

LOCK TABLES `car_categories` WRITE;
/*!40000 ALTER TABLE `car_categories` DISABLE KEYS */;
INSERT INTO `car_categories` VALUES (1,'Hatchback'),(2,'Sedán'),(3,'Familiar'),(4,'Coupé'),(5,'SUV');
/*!40000 ALTER TABLE `car_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `car_imgs`
--

DROP TABLE IF EXISTS `car_imgs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `car_imgs` (
  `car_imgs_id` int NOT NULL AUTO_INCREMENT,
  `url` varchar(255) DEFAULT NULL,
  `car_id` int NOT NULL,
  PRIMARY KEY (`car_imgs_id`),
  KEY `FK1_idx` (`car_id`),
  CONSTRAINT `FK1` FOREIGN KEY (`car_id`) REFERENCES `cars` (`car_id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `car_imgs`
--

LOCK TABLES `car_imgs` WRITE;
/*!40000 ALTER TABLE `car_imgs` DISABLE KEYS */;
INSERT INTO `car_imgs` VALUES (3,'https://http2.mlstatic.com/D_NQ_NP_942337-MLA83228838803_032025-O.webp',1),(4,'https://http2.mlstatic.com/D_NQ_NP_2X_960501-MLA82295752612_022025-F.webp',2),(5,'https://http2.mlstatic.com/D_NQ_NP_2X_905327-MLA82295782198_022025-F.webp',2),(22,'https://http2.mlstatic.com/D_NQ_NP_825742-MLA83228838099_032025-O.webp',1),(24,'https://http2.mlstatic.com/D_NQ_NP_721666-MLA83228663441_032025-O.webp',1),(27,'https://http2.mlstatic.com/D_NQ_NP_2X_873177-MLA85057818790_052025-F.webp',20),(28,'https://http2.mlstatic.com/D_NQ_NP_2X_734390-MLA85359509481_052025-F.webp',20),(29,'https://http2.mlstatic.com/D_NQ_NP_2X_639388-MLA85057533686_052025-F.webp',20),(30,'https://http2.mlstatic.com/D_NQ_NP_904182-MLA82799910336_032025-O.webp',21),(31,'https://http2.mlstatic.com/D_NQ_NP_2X_940023-MLA82799910326_032025-F.webp',21),(32,'https://http2.mlstatic.com/D_NQ_NP_2X_802735-MLA82799910338_032025-F.webp',21);
/*!40000 ALTER TABLE `car_imgs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cars`
--

DROP TABLE IF EXISTS `cars`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cars` (
  `car_id` int NOT NULL AUTO_INCREMENT,
  `model` varchar(255) DEFAULT NULL,
  `year` int NOT NULL,
  `price_a_day` double DEFAULT NULL,
  `doors` int NOT NULL,
  `transmition` varchar(255) DEFAULT NULL,
  `main_img_url` varchar(255) DEFAULT NULL,
  `available` bit(1) DEFAULT NULL,
  `car_category_id` int NOT NULL,
  PRIMARY KEY (`car_id`),
  KEY `FK1_cars_idx` (`car_category_id`),
  CONSTRAINT `FK1_cars` FOREIGN KEY (`car_category_id`) REFERENCES `car_categories` (`car_category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cars`
--

LOCK TABLES `cars` WRITE;
/*!40000 ALTER TABLE `cars` DISABLE KEYS */;
INSERT INTO `cars` VALUES (1,'Peugeot 308 1.6 Active',2015,80069,5,'manual','https://http2.mlstatic.com/D_NQ_NP_740092-MLA83228945643_032025-O.webp',_binary '',5),(2,'Hyundai Tucson 1.6 ',2018,80000,5,'automático','https://http2.mlstatic.com/D_NQ_NP_920864-MLA82579634141_022025-O.webp',_binary '',5),(17,'BMW Serie 2 3.0 240i',2017,290000,2,'Automatico','https://http2.mlstatic.com/D_NQ_NP_772558-MLA80469149193_112024-O.webp',_binary '',4),(20,'Volskwagen Polo 1.8 Ti',2017,290000,5,'Automatico','https://http2.mlstatic.com/D_NQ_NP_617434-MLA85359538499_052025-O.webp',_binary '',1),(21,'Subaru WRX Imperza',2025,400000,5,'manual','https://http2.mlstatic.com/D_NQ_NP_894218-MLA82799910356_032025-O.webp',_binary '',2),(22,'Renault Captur 2.0 Intens',2025,89000,5,'manual','https://http2.mlstatic.com/D_NQ_NP_923385-MLA84221845968_052025-O.webp',_binary '',1),(23,'Toyota Corolla 1.8',2015,65000,5,'manual','https://http2.mlstatic.com/D_NQ_NP_600991-MLA83561348140_042025-O.webp',_binary '',2),(24,'Mercedes-Benz Clase C 3.0 C400',2017,140000,5,'Automatico','https://http2.mlstatic.com/D_NQ_NP_835835-MLA85771734334_062025-O.webp',_binary '',4),(25,'Toyota Hilux Pick-Up 2.4',2023,110000,5,'manual','https://http2.mlstatic.com/D_NQ_NP_865797-MLA85028780703_052025-O.webp',_binary '',5),(26,'Toyota Corolla 1.6',2016,45000,5,'manual','https://www.hauswagenolavarria.com.ar/wp-content/uploads/2018/06/WhatsApp-Image-2018-12-18-at-15.34.49-1.jpeg',_binary '',2);
/*!40000 ALTER TABLE `cars` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (22,'Lucho','Dagna','lucianodagna03@gmail.com','$2a$10$AWWeyFthSdMgLTvSl5PjruxHe27gp8G.UGoh06B4KGhCrCDv5.zue','ADMIN'),(29,'Admin','Admin','admin@admin.com','$2a$10$qXOfmrq8EcBHZfOt6EhqROJnTplpGV4bSo.GTxI/VsgblyGRf.rTC','ADMIN');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'rentalcar'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-03 13:51:34
