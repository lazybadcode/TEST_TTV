CREATE TABLE `test`.`slots` (
  `slot_no` INT NOT NULL AUTO_INCREMENT,
  `park_id` VARCHAR(45) NOT NULL,
  `is_available` TINYINT NOT NULL DEFAULT 1,
  `x_pos` INT NOT NULL,
  `y_pos` INT NOT NULL,
  PRIMARY KEY (`slot_no`));