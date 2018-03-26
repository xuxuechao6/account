

/*Table structure for table `oauth2_client` */

DROP TABLE IF EXISTS `oauth2_client`;

CREATE TABLE `oauth2_client` (
  `client_id` VARCHAR(32) NOT NULL,
  `name` VARCHAR(255) DEFAULT NULL,
  `client_secret` VARCHAR(64) DEFAULT NULL,
  `redirect_uri` VARCHAR(255) DEFAULT NULL,
  `grant_types` VARCHAR(128) DEFAULT NULL,
  `scope` VARCHAR(32) DEFAULT NULL,
  PRIMARY KEY (`client_id`)
) ENGINE=MYISAM DEFAULT CHARSET=utf8;

/*Data for the table `oauth2_client` */

INSERT  INTO `oauth2_client`(`client_id`,`name`,`client_secret`,`redirect_uri`,`grant_types`,`scope`) VALUES ('101454832','QQ','471cae00074fbfbf2b26cc073097db35','http://localhost:3000/oauth/qq/redirect',NULL,NULL),('wx9a865aa77929c654','WX','964a0c8aaacf9ad56016ed023d32208c','http://localhost:3000/oauth/wx/redirect',NULL,NULL),('123456789','bbs','e10adc3949ba59abbe56e057f20f883e','http://localhost:3000/oauth/bbs/redirect',NULL,NULL),('527345899','sina','372f7194321e5da73661ee13060c8acc','http://localhost:3000/oauth/sina/redirect',NULL,NULL);

/*Table structure for table `qq_token` */

DROP TABLE IF EXISTS `qq_token`;

CREATE TABLE `qq_token` (
  `access_token` VARCHAR(200) COLLATE utf8_bin NOT NULL COMMENT '令牌',
  `expires_in` VARCHAR(10) COLLATE utf8_bin NOT NULL COMMENT '有效期',
  `refresh_token` VARCHAR(200) COLLATE utf8_bin NOT NULL COMMENT '刷新参数',
  `openid` VARCHAR(50) COLLATE utf8_bin NOT NULL COMMENT '用户编号',
  `scope` VARCHAR(50) COLLATE utf8_bin NOT NULL COMMENT '作用域',
  `create_at` VARCHAR(20) COLLATE utf8_bin NOT NULL COMMENT '令牌建立时间'
) ENGINE=INNODB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='微信令牌表';

/*Data for the table `qq_token` */

/*Table structure for table `uc_active_email` */

DROP TABLE IF EXISTS `uc_active_email`;

CREATE TABLE `uc_active_email` (
  `email` VARCHAR(64) NOT NULL,
  `token` VARCHAR(32) NOT NULL,
  `expires` INT(11) NOT NULL DEFAULT '86400',
  `reg_date` VARCHAR(15) NOT NULL,
  `is_active` TINYINT(1) DEFAULT '0'
) ENGINE=MYISAM DEFAULT CHARSET=utf8;

/*Data for the table `uc_active_email` */

/*Table structure for table `uc_oauth2_info` */

DROP TABLE IF EXISTS `uc_oauth2_info`;

CREATE TABLE `uc_oauth2_info` (
  `oauth2_id` INT(11) NOT NULL AUTO_INCREMENT,
  `oauth2_type` VARCHAR(128) DEFAULT NULL,
  `oauth2_appid` VARCHAR(64) DEFAULT NULL,
  `oauth2_appsecret` VARCHAR(64) DEFAULT NULL,
  `oauth2_callback_url` VARCHAR(256) DEFAULT NULL,
  PRIMARY KEY (`oauth2_id`)
) ENGINE=MYISAM DEFAULT CHARSET=latin1;

/*Data for the table `uc_oauth2_info` */

/*Table structure for table `uc_post_email` */

DROP TABLE IF EXISTS `uc_post_email`;

CREATE TABLE `uc_post_email` (
  `email_id` INT(16) NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(32) DEFAULT NULL,
  `from_username` VARCHAR(256) DEFAULT NULL,
  `from_email` VARCHAR(256) DEFAULT NULL,
  `subject` VARCHAR(500) DEFAULT NULL,
  `text` TEXT,
  `html` TEXT,
  PRIMARY KEY (`email_id`)
) ENGINE=MYISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

/*Data for the table `uc_post_email` */

INSERT  INTO `uc_post_email`(`email_id`,`type`,`from_username`,`from_email`,`subject`,`text`,`html`) VALUES (1,'register','RT-Thread用户中心','xuxuechao@rt-thread.com','[RT-Thread] 帐户激活通知！','        \r\n        感谢您注册RT-Thread，您只需要点击下面链接，激活您的帐户，您便可以享受RT-Thread各项业务。\r\n        \r\n        url\r\n        \r\n       (如果无法点击该URL链接地址，请将它复制并粘帖到浏览器的地址输入框，然后单击回车即可。该链接使用后将立即失效。\r\n        \r\n        注意:重复发送激活码，则历史激活码失效。请您在收到邮件24小时进行激活，否则该激活码将会失效。7天后您的帐户将会失效。',NULL);

/*Table structure for table `uc_users` */

DROP TABLE IF EXISTS `uc_users`;

CREATE TABLE `uc_users` (
  `uid` INT(10) NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(64) DEFAULT NULL,
  `password` VARCHAR(64) DEFAULT NULL,
  `email` VARCHAR(64) DEFAULT NULL,
  `phone` INT(15) DEFAULT NULL,
  `companyName` VARCHAR(128) DEFAULT NULL,
  `companyType` VARCHAR(128) DEFAULT NULL,
  `regdate` INT(11) DEFAULT NULL,
  `lastloginip` VARCHAR(16) DEFAULT NULL,
  `lastlogintime` INT(11) DEFAULT NULL,
  `salt` VARCHAR(6) DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=MYISAM AUTO_INCREMENT=48 DEFAULT CHARSET=utf8;

/*Data for the table `uc_users` */

/*Table structure for table `wx_token` */

DROP TABLE IF EXISTS `wx_token`;

CREATE TABLE `wx_token` (
  `access_token` VARCHAR(200) COLLATE utf8_bin NOT NULL COMMENT '令牌',
  `expires_in` VARCHAR(10) COLLATE utf8_bin NOT NULL COMMENT '有效期',
  `refresh_token` VARCHAR(200) COLLATE utf8_bin NOT NULL COMMENT '刷新参数',
  `openid` VARCHAR(50) COLLATE utf8_bin NOT NULL COMMENT '用户编号',
  `scope` VARCHAR(50) COLLATE utf8_bin NOT NULL COMMENT '作用域',
  `create_at` VARCHAR(20) COLLATE utf8_bin NOT NULL COMMENT '令牌建立时间'
) ENGINE=INNODB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='微信令牌表';

/*Data for the table `wx_token` */

/*Table structure for table `wx_user_info` */

DROP TABLE IF EXISTS `wx_user_info`;

CREATE TABLE `wx_user_info` (
  `openid` VARCHAR(32) NOT NULL,
  `nickname` CHAR(20) DEFAULT NULL,
  `sex` INT(2) DEFAULT NULL,
  `language` VARCHAR(24) NOT NULL DEFAULT '',
  `city` VARCHAR(24) NOT NULL DEFAULT '',
  `province` VARCHAR(24) NOT NULL DEFAULT '',
  `country` VARCHAR(24) NOT NULL DEFAULT '',
  `headimgurl` VARCHAR(1000) NOT NULL DEFAULT '',
  `privilege` VARCHAR(128) NOT NULL DEFAULT '[]',
  `unionid` VARCHAR(32) DEFAULT NULL,
  PRIMARY KEY (`openid`)
) ENGINE=MYISAM DEFAULT CHARSET=utf8;

/*Data for the table `wx_user_info` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
