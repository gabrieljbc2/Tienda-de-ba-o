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
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `userID` int NOT NULL AUTO_INCREMENT,
  `correo` varchar(255) DEFAULT NULL,
  `contraseña` varchar(64) DEFAULT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `apellido` varchar(50) DEFAULT NULL,
  `estado` tinyint(1) DEFAULT '1',
  `errorContraseña` tinyint(1) DEFAULT '0',
  `tokenRecuperacion` varchar(255) DEFAULT NULL,
  `intentosFallidos` int DEFAULT '0',
  `rol` int DEFAULT NULL,
  `cedula` int DEFAULT NULL,
  PRIMARY KEY (`userID`),
  UNIQUE KEY `correo` (`correo`),
  UNIQUE KEY `cedula` (`cedula`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'test@gmail.com','0007e7a2b6af9c8232c6f318ce9f84589330af7ed3f7d9118a3520f6a08ce790','Gabrielas','Bermudez',1,0,NULL,0,2,999999),(13,'darojas@gmail.com','12345','Daniele','Rojas',1,0,NULL,0,2,NULL),(19,'test10@gmail.com','12345','Daniel','Rojas',1,0,NULL,0,1,NULL),(22,'repartidor2@prueba.com','12345','Repartidor ','Prueba2',1,0,NULL,0,3,NULL),(24,'dabolivar@gmail.com','12345','Daniel','Bolivar',1,0,NULL,0,1,NULL),(25,'danieberca@ufide.ac.cr','12345','Gabriel','Bermudez',1,0,NULL,0,1,NULL),(26,'test121@gmail.com','1x6x-osq5-S719.()','Gabriel','Bermudez123',1,0,NULL,0,1,NULL),(27,'test12ss1@gmail.com','1x6x-osq5-S719.()','Gabriel','Bermudez123',1,0,NULL,0,3,NULL),(31,'gbermudez1sdasd0662@ufide.ac.cr','0007e7a2b6af9c8232c6f318ce9f84589330af7ed3f7d9118a3520f6a08ce790','dasd','Bermudez',1,0,NULL,0,1,NULL),(32,'gbermusdadsadez10662@ufide.ac.cr','0007e7a2b6af9c8232c6f318ce9f84589330af7ed3f7d9118a3520f6a08ce790','Gabriel','Bermudez',1,0,NULL,0,1,NULL),(33,'tesasdsdst@gmail.com','0007e7a2b6af9c8232c6f318ce9f84589330af7ed3f7d9118a3520f6a08ce790','Gabriel','Bermudez',1,0,NULL,0,1,NULL),(38,'tsadsadasest@gmail.com','0007e7a2b6af9c8232c6f318ce9f84589330af7ed3f7d9118a3520f6a08ce790','Gabriel','Bermudez',1,0,NULL,0,1,NULL),(39,'tsadsasasadasest@gmail.com','0007e7a2b6af9c8232c6f318ce9f84589330af7ed3f7d9118a3520f6a08ce790','Gabriel','Bermudez',1,0,NULL,0,1,11810662),(41,'tsaasadsadasasdasdadsadest@gmail.com','0007e7a2b6af9c8232c6f318ce9f84589330af7ed3f7d9118a3520f6a08ce790','Gabriel','Bermudez',1,0,NULL,0,3,118106621),(42,'gabrieljasdasdadsasdbc2@gmail.com','0007e7a2b6af9c8232c6f318ce9f84589330af7ed3f7d9118a3520f6a08ce790','Gabriel','Bermudez',1,0,NULL,0,1,NULL),(43,'gaasabrieljasdasdadsasdbc2@gmail.com','0007e7a2b6af9c8232c6f318ce9f84589330af7ed3f7d9118a3520f6a08ce790','Gabriel','Bermudez',1,0,NULL,0,1,NULL),(44,'saasgaasabrieljasdasdadsasdbc2@gmail.com','0007e7a2b6af9c8232c6f318ce9f84589330af7ed3f7d9118a3520f6a08ce790','Gabriel','Bermudez',1,0,NULL,0,1,118106622),(45,'saasgaaassabrieljasdasdadsasdbc2@gmail.com','0007e7a2b6af9c8232c6f318ce9f84589330af7ed3f7d9118a3520f6a08ce790','Gabriel','Bermudez',1,0,NULL,0,1,1123123);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
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
