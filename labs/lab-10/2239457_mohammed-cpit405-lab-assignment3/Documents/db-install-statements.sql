-- Create Database
CREATE DATABASE IF NOT EXISTS `product_manager`;
USE `product_manager`;

-- Create Products Table
CREATE TABLE IF NOT EXISTS `products` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL,
    `description` TEXT,
    `price` DECIMAL(10, 2) NOT NULL,
    `image_path` VARCHAR(255),
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert Sample Data
INSERT INTO `products` (`name`, `description`, `price`, `image_path`) VALUES
('Laptop Pro', 'High performance laptop for professionals.', 1200.00, 'uploads/laptop.jpg'),
('Wireless Mouse', 'Ergonomic wireless mouse.', 25.50, 'uploads/mouse.jpg'),
('Mechanical Keyboard', 'RGB mechanical keyboard with blue switches.', 80.00, 'uploads/keyboard.jpg');
