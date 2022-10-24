-- MySQL dump 10.13  Distrib 8.0.31, for Linux (x86_64)
--
-- Host: localhost    Database: tubeswbd
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(256) NOT NULL,
  `email` varchar(256) NOT NULL,
  `password` varchar(256) NOT NULL,
  `username` varchar(256) NOT NULL,
  `isadmin` tinyint(1) DEFAULT false,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `album`
--

DROP TABLE IF EXISTS `album`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `album` (
  `album_id` int NOT NULL AUTO_INCREMENT,
  `judul` varchar(64) NOT NULL,
  `penyanyi` varchar(128) DEFAULT NULL,
  `total_duration` int NOT NULL,
  `image_path` varchar(256) NOT NULL,
  `tanggal_terbit` date NOT NULL,
  `genre` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`album_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `album`
--

LOCK TABLES `album` WRITE;
/*!40000 ALTER TABLE `album` DISABLE KEYS */;
/*!40000 ALTER TABLE `album` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `song`
--

DROP TABLE IF EXISTS `song`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `song` (
  `song_id` int NOT NULL AUTO_INCREMENT,
  `judul` varchar(64) NOT NULL,
  `penyanyi` varchar(128) DEFAULT NULL,
  `tanggal_terbit` date NOT NULL,
  `genre` varchar(64) DEFAULT NULL,
  `duration` int NOT NULL,
  `audio_path` varchar(256) NOT NULL,
  `image_path` varchar(256) DEFAULT NULL,
  `album_id` int DEFAULT NULL,
  PRIMARY KEY (`song_id`),
  KEY `fk_album_id` (`album_id`),
  CONSTRAINT `song_ibfk_1` FOREIGN KEY (`album_id`) REFERENCES `album` (`album_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `song`
--

LOCK TABLES `song` WRITE;
/*!40000 ALTER TABLE `song` DISABLE KEYS */;
/*!40000 ALTER TABLE `song` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-19 13:10:43

INSERT INTO `user` (`name`, `email`, `password`, `username`, `isadmin`) 
VALUES ('Admin', 'admin@binotify.com', '7dd12f3a9afa0282a575b8ef99dea2a0c1becb51', 'admin', true);

INSERT INTO `user` (`name`, `email`, `password`, `username`, `isadmin`) VALUES
('User 01', 'user01@binotify.com', '5f108ff6214b4b6bf0be36f3f1b4ae4f2f348064', 'user01', false),
('User 02', 'user02@binotify.com', '5f108ff6214b4b6bf0be36f3f1b4ae4f2f348064', 'user02', false),
('User 03', 'user03@binotify.com', '5f108ff6214b4b6bf0be36f3f1b4ae4f2f348064', 'user03', false),
('User 04', 'user04@binotify.com', '5f108ff6214b4b6bf0be36f3f1b4ae4f2f348064', 'user04', false),
('User 05', 'user05@binotify.com', '5f108ff6214b4b6bf0be36f3f1b4ae4f2f348064', 'user05', false),
('User 06', 'user06@binotify.com', '5f108ff6214b4b6bf0be36f3f1b4ae4f2f348064', 'user06', false),
('User 07', 'user07@binotify.com', '5f108ff6214b4b6bf0be36f3f1b4ae4f2f348064', 'user07', false),
('User 08', 'user08@binotify.com', '5f108ff6214b4b6bf0be36f3f1b4ae4f2f348064', 'user08', false),
('User 09', 'user09@binotify.com', '5f108ff6214b4b6bf0be36f3f1b4ae4f2f348064', 'user09', false),
('User 10', 'user10@binotify.com', '5f108ff6214b4b6bf0be36f3f1b4ae4f2f348064', 'user10', false),
('User 11', 'user11@binotify.com', '5f108ff6214b4b6bf0be36f3f1b4ae4f2f348064', 'user11', false),
('User 12', 'user12@binotify.com', '5f108ff6214b4b6bf0be36f3f1b4ae4f2f348064', 'user12', false),
('User 13', 'user13@binotify.com', '5f108ff6214b4b6bf0be36f3f1b4ae4f2f348064', 'user13', false),
('User 14', 'user14@binotify.com', '5f108ff6214b4b6bf0be36f3f1b4ae4f2f348064', 'user14', false),
('User 15', 'user15@binotify.com', '5f108ff6214b4b6bf0be36f3f1b4ae4f2f348064', 'user15', false),
('User 16', 'user16@binotify.com', '5f108ff6214b4b6bf0be36f3f1b4ae4f2f348064', 'user16', false),
('User 17', 'user17@binotify.com', '5f108ff6214b4b6bf0be36f3f1b4ae4f2f348064', 'user17', false),
('User 18', 'user18@binotify.com', '5f108ff6214b4b6bf0be36f3f1b4ae4f2f348064', 'user18', false),
('User 19', 'user19@binotify.com', '5f108ff6214b4b6bf0be36f3f1b4ae4f2f348064', 'user19', false),
('User 20', 'user20@binotify.com', '5f108ff6214b4b6bf0be36f3f1b4ae4f2f348064', 'user20', false);


INSERT INTO `album` (`judul`, `penyanyi`, `total_duration`, `image_path`, `tanggal_terbit`, `genre`) VALUES
('Gajah', 'Tulus', 1500, 'assets/images/album_gajah.jpg', '2014-02-19', 'Pop'),
('Manusia', 'Tulus', 1500, 'assets/images/album_manusia.jpg', '2022-03-03', 'Pop'),
('Monokrom', 'Tulus', 1500, 'assets/images/album_monokrom.jpg', '2016-08-03', 'Pop');

INSERT INTO `song` (`judul`, `penyanyi`, `tanggal_terbit`, `genre`, `duration`, `audio_path`, `image_path`, `album_id`) VALUES
('Baru', 'Tulus', '2014-02-19', 'Pop', 300, 'null', 'assets/images/album_gajah.jpg', 1),
('Sepatu', 'Tulus', '2014-02-19', 'Pop', 300, 'null', 'assets/images/album_gajah.jpg', 1),
('Tanggal Merah', 'Tulus', '2014-02-19', 'Pop', 300, 'null', 'assets/images/album_gajah.jpg', 1),
('Gajah', 'Tulus', '2014-02-19', 'Pop', 300, 'null', 'assets/images/album_gajah.jpg', 1),
('Jangan Cintai Aku Apa Adanya', 'Tulus', '2014-02-19', 'Pop', 300, 'null', 'assets/images/album_gajah.jpg', 1),
('Tujuh Belas', 'Tulus', '2022-03-03', 'Pop', 300, 'null', 'assets/images/album_manusia.jpg', 2),
('Diri', 'Tulus', '2022-03-03', 'Pop', 300, 'null', 'assets/images/album_manusia.jpg', 2),
('Hati-Hati di Jalan', 'Tulus', '2022-03-03', 'Pop', 300, 'null', 'assets/images/album_manusia.jpg', 2),
('Manusia', 'Tulus', '2022-03-03', 'Pop', 300, 'null', 'assets/images/album_manusia.jpg', 2),
('Satu Kali', 'Tulus', '2022-03-03', 'Pop', 300, 'null', 'assets/images/album_manusia.jpg', 2),
('Manusia Kuat', 'Tulus', '2016-08-03', 'Pop', 300, 'null', 'assets/images/album_monokrom.jpg', 3),
('Ruang Sendiri', 'Tulus', '2016-08-03', 'Pop', 300, 'null', 'assets/images/album_monokrom.jpg', 3),
('Tergila-gila', 'Tulus', '2016-08-03', 'Pop', 300, 'null', 'assets/images/album_monokrom.jpg', 3),
('Pamit', 'Tulus', '2016-08-03', 'Pop', 300, 'null', 'assets/images/album_monokrom.jpg', 3),
('Monokrom', 'Tulus', '2016-08-03', 'Pop', 300, 'null', 'assets/images/album_monokrom.jpg', 3);