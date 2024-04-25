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
-- Table structure for table `facturacion`
--

DROP TABLE IF EXISTS `facturacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `facturacion` (
  `facturaID` int NOT NULL AUTO_INCREMENT,
  `carritoID` int DEFAULT NULL,
  `userID` int DEFAULT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `apellido` varchar(50) DEFAULT NULL,
  `pais` varchar(50) DEFAULT NULL,
  `direccion` varchar(100) DEFAULT NULL,
  `provincia` varchar(50) DEFAULT NULL,
  `canton` varchar(50) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `correo` varchar(100) DEFAULT NULL,
  `distrito` varchar(255) DEFAULT NULL,
  `estado` int DEFAULT '2',
  `productos` text,
  PRIMARY KEY (`facturaID`)
) ENGINE=InnoDB AUTO_INCREMENT=149 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `facturacion`
--

LOCK TABLES `facturacion` WRITE;
/*!40000 ALTER TABLE `facturacion` DISABLE KEYS */;
INSERT INTO `facturacion` VALUES (145,NULL,1,'Gabriel','Bermudez','Costa Rica','San Josse, Vasquez de Coronado, Patalillo, Urb. La Coralia, Casa F20','San José','Curridabat','+50686058414','test10@gmail.com','Granadilla',2,'\"[{\\\"productoID\\\":47,\\\"nombre\\\":\\\"test3dasdasd\\\",\\\"descripcion\\\":\\\"sdfsdf\\\",\\\"imagen\\\":\\\"https://ibb.co/C6fThV5\\\",\\\"precio\\\":\\\"12500.00\\\",\\\"stock\\\":7,\\\"categoria\\\":\\\"femenino\\\",\\\"cantidad\\\":0},{\\\"productoID\\\":49,\\\"nombre\\\":\\\"test3dasdasd\\\",\\\"descripcion\\\":\\\"asSAsAS\\\",\\\"imagen\\\":\\\"https://ibb.co/C6fThV5\\\",\\\"precio\\\":\\\"8000.00\\\",\\\"stock\\\":-19,\\\"categoria\\\":\\\"masculino\\\",\\\"cantidad\\\":1}]\"'),(146,NULL,1,'Gabriel','Bermudez','Costa Rica','San Josse, Vasquez de Coronado, Patalillo, Urb. La Coralia, Casa F20','San José','Dota','+50686058414','test10@gmail.com','Jardín',2,'\"[{\\\"productoID\\\":47,\\\"nombre\\\":\\\"test3dasdasd\\\",\\\"descripcion\\\":\\\"sdfsdf\\\",\\\"imagen\\\":\\\"https://ibb.co/C6fThV5\\\",\\\"precio\\\":\\\"12500.00\\\",\\\"stock\\\":7,\\\"categoria\\\":\\\"femenino\\\",\\\"cantidad\\\":1},{\\\"productoID\\\":49,\\\"nombre\\\":\\\"test3dasdasd\\\",\\\"descripcion\\\":\\\"asSAsAS\\\",\\\"imagen\\\":\\\"https://ibb.co/C6fThV5\\\",\\\"precio\\\":\\\"8000.00\\\",\\\"stock\\\":-20,\\\"categoria\\\":\\\"masculino\\\",\\\"cantidad\\\":1}]\"'),(147,NULL,1,'Gabriel','Bermudez','Costa Rica','San Josse, Vasquez de Coronado, Patalillo, Urb. La Coralia, Casa F20','San José','Dota','+50686058414','test10@gmail.com','Jardín',2,'\"[{\\\"productoID\\\":47,\\\"nombre\\\":\\\"test3dasdasd\\\",\\\"descripcion\\\":\\\"sdfsdf\\\",\\\"imagen\\\":\\\"https://ibb.co/C6fThV5\\\",\\\"precio\\\":\\\"12500.00\\\",\\\"stock\\\":6,\\\"categoria\\\":\\\"femenino\\\",\\\"cantidad\\\":1},{\\\"productoID\\\":49,\\\"nombre\\\":\\\"test3dasdasd\\\",\\\"descripcion\\\":\\\"asSAsAS\\\",\\\"imagen\\\":\\\"https://ibb.co/C6fThV5\\\",\\\"precio\\\":\\\"8000.00\\\",\\\"stock\\\":-21,\\\"categoria\\\":\\\"masculino\\\",\\\"cantidad\\\":1}]\"'),(148,NULL,1,'Gabriel','Bermudez','Costa Rica','San Josse, Vasquez de Coronado, Patalillo, Urb. La Coralia, Casa F20','San José','Curridabat','+50686058414','test10@gmail.com',NULL,2,'\"[{\\\"productoID\\\":47,\\\"nombre\\\":\\\"test3dasdasd\\\",\\\"descripcion\\\":\\\"sdfsdf\\\",\\\"imagen\\\":\\\"https://ibb.co/C6fThV5\\\",\\\"precio\\\":\\\"12500.00\\\",\\\"stock\\\":5,\\\"categoria\\\":\\\"femenino\\\",\\\"cantidad\\\":1},{\\\"productoID\\\":49,\\\"nombre\\\":\\\"test3dasdasd\\\",\\\"descripcion\\\":\\\"asSAsAS\\\",\\\"imagen\\\":\\\"https://ibb.co/C6fThV5\\\",\\\"precio\\\":\\\"8000.00\\\",\\\"stock\\\":-22,\\\"categoria\\\":\\\"masculino\\\",\\\"cantidad\\\":1}]\"');
/*!40000 ALTER TABLE `facturacion` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-24 21:34:43
