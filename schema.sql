-- create foregin key constraints for the tables if you'd like
-- user login table to store user credentials
CREATE TABLE `userlogin` (
	`id` int NOT NULL AUTO_INCREMENT,
	`email` varchar(50) NOT NULL,
	`password` varchar(64) NOT NULL,
	`salt` varchar(30) NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_0900_ai_ci;

-- user data table to store user data
CREATE TABLE `userdata` (
	`user_id` int NOT NULL,
	`name` varchar(30) NOT NULL,
	`dob` varchar(10) NOT NULL,
	PRIMARY KEY (`user_id`)
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_0900_ai_ci;

-- posts table to store posts
CREATE TABLE `posts` (
	`post_id` int NOT NULL AUTO_INCREMENT,
	`author` varchar(50) NOT NULL,
	`title` varchar(100) NOT NULL,
	`content` text NOT NULL,
	`date` varchar(24) NOT NULL,
	`upvotes` int NOT NULL,
	`downvotes` int NOT NULL,
	UNIQUE KEY `post_id` (`post_id`)
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_0900_ai_ci;