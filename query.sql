CREATE DATABASE funify;
CREATE USER 'denis'@'localhost' IDENTIFIED BY '12345678';
GRANT ALL PRIVILEGES ON *.* TO 'denis'@'localhost' WITH GRANT OPTION;
FLUSH PRIVILEGES;
USE funify;

CREATE TABLE `Order` (
  `order_ID` INT NOT NULL AUTO_INCREMENT,
  `transaction_date` DATETIME,
  `item` VARCHAR(255),
  `qty` INT,
  `amount` DECIMAL(10,2),
  `name` VARCHAR(255),
  `address` VARCHAR(255),
  `email` VARCHAR(255),
  `tel` VARCHAR(255),
  `transaction_status` CHAR(1),
  `delivery_status` CHAR(1),
  PRIMARY KEY (`order_ID`)
);

INSERT INTO `Order` (`transaction_date`, `item`, `qty`, `amount`, `name`, `address`, `email`, `tel`, `transaction_status`, `delivery_status`)
VALUES
('2023-03-21 00:30:00', 'Cabinet', 2, 400, 'Alvin', '九龍塘窩打老道224號', '12345678@life.hkbu.edu.hk', '24242424', 'S', 'C'),
('2023-03-21 00:30:00', 'Wardrobe', 1, 450, 'Alvin', '九龍塘窩打老道224號', '12345678@life.hkbu.edu.hk', '24242424', 'S', 'C'),
('2023-03-21 01:30:00', 'Wardrobe', 1, 200, 'Dennis', '九龍塘窩打老道224號', '87654321@life.hkbu.edu.hk', '25252525', 'P', 'P');


CREATE TABLE Donator (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    salutation VARCHAR(10),
    country VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    tel VARCHAR(255),
    contact CHAR(1)
);

INSERT INTO Donator (name, salutation, country, email, tel, contact)
VALUES ('Alvin', 'Mr', 'JP', '12345@gmail.com', '(03) 1234-5678', 'Y');

INSERT INTO Donator (name, salutation, country, email, tel, contact)
VALUES ('Mary', 'Ms', 'Eng', '54321@gmail.com', NULL, NULL);

INSERT INTO Donator (name, salutation, country, email, tel, contact)
VALUES ('Tom', 'Mr', 'HK', '98765@gmail.com', '85223232323', 'N');

CREATE TABLE `Product` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `item` VARCHAR(255),
  `amount` DECIMAL(10,2),
  PRIMARY KEY (`id`)
);

INSERT INTO `Product` (`item`, `amount`)
VALUES
('Cabinet', 200),
('Wardrobe', 450);
