-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 05, 2025 at 11:46 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `businessmachines`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `DeleteStudent` (IN `p_StudentID` INT)   BEGIN
    DELETE FROM Students WHERE StudentID = p_StudentID;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `GetAllStudents` ()   BEGIN
    SELECT * FROM Students;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `GetStudentById` (IN `p_StudentID` INT)   BEGIN
    SELECT * 
    FROM Students
    WHERE StudentID = p_StudentID;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `InsertStudent` (IN `firstName` VARCHAR(50), IN `lastName` VARCHAR(50), IN `address` VARCHAR(255), IN `age` INT)   BEGIN
    INSERT INTO Students (FirstName, LastName, Address, Age)
    VALUES (firstName, lastName, address, age);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdateStudent` (IN `p_StudentID` INT, IN `p_Address` VARCHAR(255), IN `p_Age` INT)   BEGIN
    UPDATE Students
    SET Address = p_Address, Age = p_Age
    WHERE StudentID = p_StudentID;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `StudentID` int(11) NOT NULL,
  `FirstName` varchar(50) NOT NULL,
  `LastName` varchar(50) NOT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `Age` int(11) DEFAULT NULL,
  `DateRegistered` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`StudentID`, `FirstName`, `LastName`, `Address`, `Age`, `DateRegistered`) VALUES
(1, 'John', 'Doe', '123 Main St', 20, '2025-01-05 16:14:25'),
(2, 'Jane', 'Smith', '456 Elm St', 22, '2025-01-05 16:14:25'),
(3, 'Michael', 'Brown', '789 Oak St', 25, '2025-01-05 16:14:25'),
(4, 'Emily', 'Johnson', '321 Pine St', 19, '2025-01-05 16:14:25'),
(6, 'test', 'test', 'test', 13, '2025-01-05 16:15:09');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`StudentID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `StudentID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
