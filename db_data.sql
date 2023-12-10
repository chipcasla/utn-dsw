CREATE DATABASE  IF NOT EXISTS `restaurante_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `restaurante_db`;
-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: restaurante_db
-- ------------------------------------------------------
-- Server version	8.0.33

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
-- Table structure for table `mesa`
--

DROP TABLE IF EXISTS `mesa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mesa` (
  `id` int NOT NULL AUTO_INCREMENT,
  `capacidad` int NOT NULL,
  `ubicacion` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mesa`
--

LOCK TABLES `mesa` WRITE;
/*!40000 ALTER TABLE `mesa` DISABLE KEYS */;
INSERT INTO `mesa` VALUES (1,4,'adentro'),(2,6,'afuera'),(4,6,'afuera'),(5,4,'afuera'),(6,8,'adentro');
/*!40000 ALTER TABLE `mesa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `persona`
--

DROP TABLE IF EXISTS `persona`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `persona` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tipo` varchar(255) NOT NULL,
  `dni` varchar(255) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) NOT NULL,
  `telefono` varchar(255) DEFAULT NULL,
  `mail` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `dni` (`dni`),
  UNIQUE KEY `dni_2` (`dni`),
  UNIQUE KEY `dni_3` (`dni`),
  UNIQUE KEY `dni_4` (`dni`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `persona`
--

LOCK TABLES `persona` WRITE;
/*!40000 ALTER TABLE `persona` DISABLE KEYS */;
INSERT INTO `persona` VALUES (1,'cliente','23232324','Alex','Turner','5055055057','alexam@gmail.com','asd','2023-10-20 07:32:24','2023-12-08 02:59:54'),(2,'cliente','32323232','Adam','Bareiro','3413334387','ab9@gmail.com','asd','2023-10-27 19:42:35','2023-10-27 19:42:35'),(15,'cliente','43378663','Nahuel','Barrios','3413334310','nbp@gmail.com','$2b$10$8GrKKHzpmt1fVoF98ZbXDuzuKULtqUAGFLw0PB8QpOamXXfKPIW4y','2023-11-08 04:36:11','2023-11-08 04:36:11'),(17,'admin','12312312','Arbiter','Garion','434343424','head@city.com','$2b$10$P57gp.XiExrsnXM0Y5crx.K8IZlk5C6jy2/FhGLFCNu/cfvUKAyLe','2023-12-05 05:31:05','2023-12-08 04:19:39'),(20,'cliente','3','asd','asd','asd','asd','$2b$10$J5lms0KNVi9qJ5lckPgEg.cl3v.wFmAPqXn6/mPcZbDykVwdy9hbO','2023-12-05 18:23:22','2023-12-05 18:23:22'),(28,'cliente','87654321','Pepino','Spaghetti','3411234567','pizza@tower.com','$2b$10$KvDjUVgECvFUOZff9HsIOeXweleBcdFa33Hz1YjgTwPnDngti7bme','2023-12-10 22:58:48','2023-12-10 23:11:10');
/*!40000 ALTER TABLE `persona` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plato`
--

DROP TABLE IF EXISTS `plato`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plato` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ingredientes` varchar(255) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plato`
--

LOCK TABLES `plato` WRITE;
/*!40000 ALTER TABLE `plato` DISABLE KEYS */;
INSERT INTO `plato` VALUES (2,'salchicha, pan','pancho cuestionable','https://www.misjuguetes.com.ar/wp-content/uploads/2019/10/Pancho1.jpg'),(3,'Horrores mas alla de la comprension humana, papas','Horror lovecraftiano','https://i.imgur.com/BmqFUPw.jpg'),(4,'Huevo, carne, queso','Milanesa3p','https://i.imgur.com/3H2GWXW.jpg'),(5,'Chocolate, harina, camaron','Galletita agridulce','https://i.imgur.com/Cb51zyC.jpg'),(6,'arroz, pescado de tierra','Sushi','https://i.imgur.com/5rw0nSz.jpg'),(7,'Nuggets de pollo, papa, lentejas','La extincion','https://i.imgur.com/YQ8xwHi.jpg'),(8,'Lechuga, tomate, pan casero','Chegusan','https://i.imgur.com/uuctu1Q.jpg');
/*!40000 ALTER TABLE `plato` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reserva`
--

DROP TABLE IF EXISTS `reserva`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reserva` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fechaHora` datetime NOT NULL,
  `cantidadPersonas` int NOT NULL,
  `estado` varchar(255) DEFAULT NULL,
  `idCliente` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idCliente` (`idCliente`),
  CONSTRAINT `reserva_ibfk_1` FOREIGN KEY (`idCliente`) REFERENCES `persona` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reserva`
--

LOCK TABLES `reserva` WRITE;
/*!40000 ALTER TABLE `reserva` DISABLE KEYS */;
INSERT INTO `reserva` VALUES (4,'2023-10-12 17:00:00',2,'Cancelada',1),(7,'2023-10-29 15:00:00',6,'Pendiente',1),(8,'2023-10-19 12:00:00',5,'Completa',1),(9,'2023-10-29 22:00:00',5,'Cancelada',2),(11,'2023-10-29 22:00:00',5,'Cancelada',2),(12,'2023-12-08 19:58:00',3,'Pendiente',17),(13,'2023-12-11 18:22:00',1,'Pendiente',17),(14,'2023-12-25 00:00:00',2,'Pendiente',28),(15,'2023-12-25 00:00:00',4,'Pendiente',15),(16,'2023-12-29 23:10:00',4,'Pendiente',28);
/*!40000 ALTER TABLE `reserva` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reserva_mesa`
--

DROP TABLE IF EXISTS `reserva_mesa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reserva_mesa` (
  `MesaId` int NOT NULL,
  `reservaId` int NOT NULL,
  PRIMARY KEY (`MesaId`,`reservaId`),
  KEY `reservaId` (`reservaId`),
  CONSTRAINT `reserva_mesa_ibfk_1` FOREIGN KEY (`MesaId`) REFERENCES `mesa` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reserva_mesa_ibfk_2` FOREIGN KEY (`reservaId`) REFERENCES `reserva` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reserva_mesa`
--

LOCK TABLES `reserva_mesa` WRITE;
/*!40000 ALTER TABLE `reserva_mesa` DISABLE KEYS */;
INSERT INTO `reserva_mesa` VALUES (2,4),(1,7),(2,7),(2,8),(2,9),(2,11),(2,12),(4,13),(4,14),(5,15),(6,16);
/*!40000 ALTER TABLE `reserva_mesa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reseña`
--

DROP TABLE IF EXISTS `reseña`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reseña` (
  `id` int NOT NULL AUTO_INCREMENT,
  `comentario` varchar(255) DEFAULT NULL,
  `puntaje` int NOT NULL,
  `idCliente` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idCliente` (`idCliente`),
  CONSTRAINT `reseña_ibfk_1` FOREIGN KEY (`idCliente`) REFERENCES `persona` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reseña`
--

LOCK TABLES `reseña` WRITE;
/*!40000 ALTER TABLE `reseña` DISABLE KEYS */;
INSERT INTO `reseña` VALUES (1,'Buena atencion',3,2,'2023-12-06 18:34:32','2023-12-06 18:34:32'),(7,'una cagada',2,17,'2023-12-08 03:49:40','2023-12-08 03:49:40'),(8,'Una lujuria',5,28,'2023-12-10 23:14:48','2023-12-10 23:14:48');
/*!40000 ALTER TABLE `reseña` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-10 20:18:18
