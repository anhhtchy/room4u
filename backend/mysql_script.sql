CREATE database room4u;
USE room4u;
CREATE TABLE `accounts` (
  `userid` bigint(35) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `fullname` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `address`varchar(255) DEFAULT NULL,
  `usertype` int NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `created` datetime NOT NULL,
  PRIMARY KEY(userid)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;