DROP TABLE IF EXISTS `accounts`;
CREATE TABLE `accounts` (
  `account_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` ENUM('staff', 'customer') NOT NULL,
  PRIMARY KEY (`account_id`),
  UNIQUE KEY `account_id` (`account_id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `customers`;
CREATE TABLE `customers` (
  `account_id` bigint unsigned NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `phone` char(10) NOT NULL,
  PRIMARY KEY (`account_id`),
  UNIQUE KEY `account_id` (`account_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `staffs`;
CREATE TABLE `staffs` (
  `account_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`account_id`),
  UNIQUE KEY `account_id` (`account_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `reviews`;
CREATE TABLE `reviews` (
  `review_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `account_id` int NOT NULL,
  `room_id` int NOT NULL,
  `review` TEXT NOT NULL,
  `review_datetime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`review_id`),
  UNIQUE KEY `review_id` (`review_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `reservations`;
CREATE TABLE `reservations` (
  `reserve_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `account_id` int NOT NULL,
  `room_id` int NOT NULL,
  `reserve_date` DATE NOT NULL,
  `reserve_hours` varchar(255) NOT NULL,
  `inform_datetime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `reserve_status` ENUM('pending', 'approved', 'rejected') NOT NULL,
  `reserve_remark` TEXT DEFAULT NULL,
  PRIMARY KEY (`reserve_id`),
  UNIQUE KEY `reserve_id` (`reserve_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `rooms`;
CREATE TABLE `rooms` (
  `room_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `room_name` varchar(255) NOT NULL,
  `room_type` ENUM('ห้องซ้อมดนตรี', 'ห้องซ้อมเต้น', 'ห้องอัดเสียง') NOT NULL,
  `room_status` ENUM('พร้อมใช้งาน', 'ไม่พร้อมใช้งาน') NOT NULL,
  `room_price` FLOAT NOT NULL,
  `room_description` TEXT NOT NULL,
  PRIMARY KEY (`room_id`),
  UNIQUE KEY `room_id` (`room_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `instruments`;
CREATE TABLE `instruments` (
  `instrument_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `room_id` int NOT NULL,
  `quantity` int NOT NULL,
  `instrument_name` varchar(255) NOT NULL,
  PRIMARY KEY (`instrument_id`),
  UNIQUE KEY `instrument_id` (`instrument_id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `images`;
CREATE TABLE `images` (
  `image_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `room_id` int NOT NULL,
  `file_path` varchar(255) NOT NULL,
  `banner` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`image_id`),
  UNIQUE KEY `image_id` (`image_id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `accounts` (`account_id`, `username`, `password`, `role`) VALUES
(1, 'admin', 'admin', 'staff'), (2, 'salinya', '123456', 'customer'), (3, 'kulasatee', '123456', 'customer'), (4, 'chaiyawat', '123456', 'customer');

INSERT INTO `staffs` (`account_id`) VALUES
(1);

INSERT INTO `customers` (`account_id`, `firstname`, `lastname`, `phone`) VALUES
(2, 'Salinya', 'Timklip', '0812345678'), (3, 'Kulasatee', 'Dul', '0826527820'), (4, 'Chaiyawat', 'Roongruenng', '0892453254');

INSERT INTO `reviews` (`review_id`, `account_id`, `room_id`, `review`, `review_datetime`) VALUES
(1, 2, 1, 'ห้องสะอาดมากค่ะ อุปกรณ์ครบครัน ไว้มาใช้บริการใหม่นะคะ', CURRENT_TIMESTAMP), (2, 3, 1, 'ดีมากครับ แอร์เย็น สะอาด ไม่อับ ไมค์ไม่จี่ ไม่เหม็นน้ำลาย', CURRENT_TIMESTAMP), (3, 4, 1, 'พนักงานบริการดี เป็นกันเองค่ะ แต่แอร์ดังไปหน่อยค่ะ', CURRENT_TIMESTAMP);

INSERT INTO `reservations` (`reserve_id`, `account_id`, `room_id`, `reserve_date`, `reserve_hours`, `inform_datetime`, `reserve_status`, `reserve_remark`) VALUES
(1, 2, 1, '2022-05-25', '11,12,13', CURRENT_TIMESTAMP, 'pending', CURRENT_TIMESTAMP), (2, 3, 1, '2022-04-28', '11,12,13,14,15,16', CURRENT_TIMESTAMP, 'approved', 'ครั้งที่แล้วน้องลืมเก็บขยะภายในห้อง กรุณารักษาความสะอาดด้วยนะครับ'), (3, 4, 1, '2022-04-13', '11,12,13,14', CURRENT_TIMESTAMP, 'rejected', 'เนื่องจากเป็นวันหยุดยาว ทางร้านปิดให้บริการชั่วคราว ต้องขออภัยด้วยครับผม');

INSERT INTO `rooms` (`room_id`, `room_name`, `room_type`, `room_status`, `room_price`, `room_description`) VALUES
(1, 'ห้องซ้อม P01', 'ห้องซ้อมดนตรี', 'พร้อมใช้งาน', '300', 'Beside the Studio area we also have a private lounge for both Studio A and B, a courtyard with outdoor seating, and a big garden with bar and BBQ stove,…'),
(2, 'ห้องซ้อม P02', 'ห้องซ้อมดนตรี', 'ไม่พร้อมใช้งาน', '300', 'Beside the Studio area we also have a private lounge for both Studio A and B, a courtyard with outdoor seating, and a big garden with bar and BBQ stove,…'),
(3, 'ห้องสตูดิโอ R01', 'ห้องอัดเสียง', 'พร้อมใช้งาน', '700', 'Beside the Studio area we also have a private lounge for both Studio A and B, a courtyard with outdoor seating, and a big garden with bar and BBQ stove,…'),
(4, 'ห้องสตูดิโอ R02', 'ห้องอัดเสียง', 'ไม่พร้อมใช้งาน', '700', 'Beside the Studio area we also have a private lounge for both Studio A and B, a courtyard with outdoor seating, and a big garden with bar and BBQ stove,…'),
(5, 'ห้องซ้อม D01', 'ห้องซ้อมเต้น', 'พร้อมใช้งาน', '500', 'Beside the Studio area we also have a private lounge for both Studio A and B, a courtyard with outdoor seating, and a big garden with bar and BBQ stove,…'),
(6, 'ห้องซ้อม D02', 'ห้องซ้อมเต้น', 'พร้อมใช้งาน', '500', 'Beside the Studio area we also have a private lounge for both Studio A and B, a courtyard with outdoor seating, and a big garden with bar and BBQ stove,…');

INSERT INTO `instruments` (`instrument_id`, `room_id`, `quantity`, `instrument_name`) VALUES
(1, 1, 1, 'VOX TELSTAR MAPLE (Drum)'),
(2, 1, 2, 'FENDER STRATOCASTER JAPAN (Guitar)'),
(3, 1, 1, 'BLACKSTAR DEBUT 15E BLACK (Amp)'),
(4, 1, 1, 'FENDER PRO JUNIOR IV (Amp)'),
(5, 1, 2, 'SQUIER JAGUAR (Bass)'),
(6, 1, 1, 'FENDER BASSMAN 800 HEAD (Amp)'),
(7, 1, 2, 'KORG KRONOS (Keyboard)'),
(8, 1, 3, 'Audio-Technica AT2020 (Mic)'),

(9, 2, 1, 'VOX TELSTAR MAPLE (Drum)'),
(10, 2, 2, 'FENDER STRATOCASTER JAPAN (Guitar)'),
(11, 2, 1, 'BLACKSTAR DEBUT 15E BLACK (Amp)'),
(12, 2, 1, 'FENDER PRO JUNIOR IV (Amp)'),
(13, 2, 2, 'SQUIER JAGUAR (Bass)'),
(14, 2, 1, 'FENDER BASSMAN 800 HEAD (Amp)'),
(15, 2, 2, 'KORG KRONOS (Keyboard)'),
(16, 2, 3, 'Audio-Technica AT2020 (Mic)'),

(17, 3, 1, 'VOX TELSTAR MAPLE (Drum)'),
(18, 3, 2, 'FENDER STRATOCASTER JAPAN (Guitar)'),
(19, 3, 1, 'BLACKSTAR DEBUT 15E BLACK (Amp)'),
(20, 3, 1, 'FENDER PRO JUNIOR IV (Amp)'),
(21, 3, 2, 'SQUIER JAGUAR (Bass)'),
(22, 3, 1, 'FENDER BASSMAN 800 HEAD (Amp)'),
(23, 3, 2, 'KORG KRONOS (Keyboard)'),
(24, 3, 3, 'Audio-Technica AT2020 (Mic)'),

(25, 4, 1, 'VOX TELSTAR MAPLE (Drum)'),
(26, 4, 2, 'FENDER STRATOCASTER JAPAN (Guitar)'),
(27, 4, 1, 'BLACKSTAR DEBUT 15E BLACK (Amp)'),
(28, 4, 1, 'FENDER PRO JUNIOR IV (Amp)'),
(29, 4, 2, 'SQUIER JAGUAR (Bass)'),
(30, 4, 1, 'FENDER BASSMAN 800 HEAD (Amp)'),
(31, 4, 2, 'KORG KRONOS (Keyboard)'),
(32, 4, 3, 'Audio-Technica AT2020 (Mic)'),

(33, 5, 1, 'VOX TELSTAR MAPLE (Drum)'),
(34, 5, 2, 'FENDER STRATOCASTER JAPAN (Guitar)'),
(35, 5, 1, 'BLACKSTAR DEBUT 15E BLACK (Amp)'),
(36, 5, 1, 'FENDER PRO JUNIOR IV (Amp)'),
(37, 5, 2, 'SQUIER JAGUAR (Bass)'),
(38, 5, 1, 'FENDER BASSMAN 800 HEAD (Amp)'),
(39, 5, 2, 'KORG KRONOS (Keyboard)'),
(40, 5, 3, 'Audio-Technica AT2020 (Mic)'),

(41, 6, 1, 'VOX TELSTAR MAPLE (Drum)'),
(42, 6, 2, 'FENDER STRATOCASTER JAPAN (Guitar)'),
(43, 6, 1, 'BLACKSTAR DEBUT 15E BLACK (Amp)'),
(44, 6, 1, 'FENDER PRO JUNIOR IV (Amp)'),
(45, 6, 2, 'SQUIER JAGUAR (Bass)'),
(46, 6, 1, 'FENDER BASSMAN 800 HEAD (Amp)'),
(47, 6, 2, 'KORG KRONOS (Keyboard)'),
(48, 6, 3, 'Audio-Technica AT2020 (Mic)');


INSERT INTO `images` (`image_id`, `room_id`, `file_path`, `banner`) VALUES
(1, 1, '/uploads/banner.jpg', 1),
(2, 1, '/uploads/roomImage1.jpg', 0),
(3, 1, '/uploads/roomImage2.jpg', 0),
(4, 1, '/uploads/roomImage3.jpg', 0),
(5, 1, '/uploads/roomImage4.jpg', 0),

(6, 2, '/uploads/banner.jpg', 1),
(7, 2, '/uploads/roomImage1.jpg', 0),
(8, 2, '/uploads/roomImage2.jpg', 0),
(9, 2, '/uploads/roomImage3.jpg', 0),
(10, 2, '/uploads/roomImage4.jpg', 0),

(11, 3, '/uploads/banner.jpg', 1),
(12, 3, '/uploads/roomImage1.jpg', 0),
(13, 3, '/uploads/roomImage2.jpg', 0),
(14, 3, '/uploads/roomImage3.jpg', 0),
(15, 3, '/uploads/roomImage4.jpg', 0),

(16, 4, '/uploads/banner.jpg', 1),
(17, 4, '/uploads/roomImage1.jpg', 0),
(18, 4, '/uploads/roomImage2.jpg', 0),
(19, 4, '/uploads/roomImage3.jpg', 0),
(20, 4, '/uploads/roomImage4.jpg', 0),

(21, 5, '/uploads/banner.jpg', 1),
(22, 5, '/uploads/roomImage1.jpg', 0),
(23, 5, '/uploads/roomImage2.jpg', 0),
(24, 5, '/uploads/roomImage3.jpg', 0),
(25, 5, '/uploads/roomImage4.jpg', 0),

(26, 6, '/uploads/banner.jpg', 1),
(27, 6, '/uploads/roomImage1.jpg', 0),
(28, 6, '/uploads/roomImage2.jpg', 0),
(29, 6, '/uploads/roomImage3.jpg', 0),
(30, 6, '/uploads/roomImage4.jpg', 0);