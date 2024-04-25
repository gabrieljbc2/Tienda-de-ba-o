-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: pineapplesea
-- ------------------------------------------------------
-- Server version	8.0.35

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
-- Table structure for table `enviofisico`
--

DROP TABLE IF EXISTS `enviofisico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `enviofisico` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `nombreApellido` varchar(255) DEFAULT NULL,
  `totalProductos` decimal(10,2) DEFAULT NULL,
  `codigoAleatorio` int DEFAULT NULL,
  `estado` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enviofisico`
--

LOCK TABLES `enviofisico` WRITE;
/*!40000 ALTER TABLE `enviofisico` DISABLE KEYS */;
INSERT INTO `enviofisico` VALUES (8,1,'Gabrielas Bermudez',12500.00,7300,'Finalizado'),(9,1,'Gabrielas Bermudez',12500.00,6824,'Finalizado'),(10,1,'Gabrielas Bermudez',12500.00,912,'Finalizado'),(11,1,'Gabrielas Bermudez',12500.00,2262,'Finalizado'),(12,1,'Gabrielas Bermudez',12500.00,8696,'Finalizado'),(13,1,'Gabrielas Bermudez',8000.00,1403,'Pendiente'),(14,1,'Gabrielas Bermudez',8000.00,7337,'Pendiente'),(15,1,'Gabrielas Bermudez',20500.00,3094,'Pendiente'),(16,1,'Gabrielas Bermudez',28500.00,718,'Finalizado'),(17,1,'Gabrielas Bermudez',12500.00,2526,'Finalizado');
/*!40000 ALTER TABLE `enviofisico` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-24 21:34:44
