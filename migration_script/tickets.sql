CREATE TABLE `test`.`tickets` (
  `ticket_no` INT NOT NULL AUTO_INCREMENT,
  `car_regist_no` VARCHAR(45) NOT NULL,
  `car_type` VARCHAR(45) NOT NULL,
  `slot_no` VARCHAR(45) NOT NULL,
  `entry_date` DATETIME NOT NULL,
  `exit_date` DATETIME NULL,
  PRIMARY KEY (`ticket_no`));

