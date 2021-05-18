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

CREATE TABLE `posts` (
  `postid` bigint(35) NOT NULL AUTO_INCREMENT,
  `userid` bigint(35) NOT NULL,
  `title` varchar(1024) NOT NULL,
  `estatetype` int NOT NULL,
  `address` varchar(255) NOT NULL,
  `ward` varchar(50) DEFAULT NULL,
  `district` varchar(50) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `area` float NOT NULL,  
  `price` float NOT NULL,
  `description` varchar(2048) DEFAULT NULL,
  `roomnum` int DEFAULT 0,
  `restroom` varchar(50) DEFAULT NULL,
  `electricity` float DEFAULT 0,
  `water` float DEFAULT 0,
  `wifi` varchar(50) DEFAULT NULL,
  `ultility` varchar(1024) DEFAULT NULL,
  `rented` int DEFAULT 0,
  `created` datetime NOT NULL,
  `updated` datetime NOT NULL,
  `expired` datetime NOT NULL,
  PRIMARY KEY(postid),
  FOREIGN KEY (userid) REFERENCES accounts(userid)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `images` (
  `imaggeid` bigint(35) NOT NULL AUTO_INCREMENT,
  `postid` bigint(35) NOT NULL,
  `url` varchar(255) NOT NULL,
  `created` datetime NOT NULL,
   PRIMARY KEY(imaggeid),
   FOREIGN KEY (postid) REFERENCES posts(postid)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `ratings` (
    `postid` BIGINT(35) NOT NULL,
    `userid` BIGINT(35) NOT NULL,
    `rate` INT DEFAULT 0,
    `created` DATETIME NOT NULL,
    `updated` DATETIME NOT NULL,
    FOREIGN KEY (postid) REFERENCES posts(postid),
    FOREIGN KEY (userid) REFERENCES accounts(userid)
)  ENGINE=INNODB DEFAULT CHARSET=UTF8;


CREATE TABLE `comments` (
  `postid` bigint(35) NOT NULL,
  `userid` bigint(35) NOT NULL,
  `content` varchar(2048) NOT NULL,
  `created` datetime NOT NULL,
  `updated` datetime NOT NULL,
  FOREIGN KEY (postid) REFERENCES posts(postid),
  FOREIGN KEY (userid) REFERENCES accounts(userid)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `savedPosts` (
    `saveid` bigint(35) NOT NULL AUTO_INCREMENT,
    `postid` BIGINT(35) NOT NULL,
    `userid` BIGINT(35) NOT NULL,
    PRIMARY KEY(saveid),
    FOREIGN KEY (postid) REFERENCES posts(postid),
    FOREIGN KEY (userid) REFERENCES accounts(userid)
)  ENGINE=INNODB DEFAULT CHARSET=UTF8; 