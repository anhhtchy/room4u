/* NHỚ SỬA ĐƯỜNG DẪN BÊN DƯỚI */

USE room4u;
DROP TABLE ratings;
DROP TABLE comments;
DROP TABLE images;
DROP TABLE posts;

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
  `imageid` bigint(35) NOT NULL AUTO_INCREMENT,
  `postid` bigint(35) NOT NULL,
  `url` varchar(255) NOT NULL,
  `created` datetime NOT NULL,
   PRIMARY KEY(imageid),
   FOREIGN KEY (postid) REFERENCES posts(postid)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `reviews` (
    `postid` BIGINT(35) NOT NULL,
    `userid` BIGINT(35) NOT NULL,
    `rating` INT NOT NULL,
    `comment` varchar(2048) DEFAULT NULL,
    `created` DATETIME NOT NULL,
    `updated` DATETIME NOT NULL,
    FOREIGN KEY (postid) REFERENCES posts(postid),
    FOREIGN KEY (userid) REFERENCES accounts(userid)
)  ENGINE=INNODB DEFAULT CHARSET=UTF8;

/*Sửa đường dẫn TUYỆT ĐỐI đến file posts_data chứa 100 bản ghi cho bảng posts ngay bên dưới. Lưu ý dấu "\" cần  chuyển thành "\"  */

LOAD DATA INFILE '\\Users\\Fourier_Sp\\Desktop\\SQL_dataprep\\posts_data.csv'
INTO TABLE posts
FIELDS TERMINATED BY ',' ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(userid, title, estatetype,	address,ward,district,city,area,price,description,roomnum,restroom,electricity,water,wifi,ultility,rented,created, updated, expired);

/*Sửa đường dẫn TUYỆT ĐỐI đến file images_data chứa 100 bản ghi cho bảng images ngay bên dưới. Lưu ý dấu "\" cần  chuyển thành "\"  */
LOAD DATA INFILE '\\Users\\Fourier_Sp\\Desktop\\SQL_dataprep\\images_data.csv'
INTO TABLE images
FIELDS TERMINATED BY ',' ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(postid,url)
SET created = NOW();

