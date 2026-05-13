<?php
/*
 * Student ID: 2239457
 * Student Name: Mohammed Rashid Alharbi
 * Course: CPIT-405
 * Lab: 10
 */

class Product {
    private $pdo;

    public function __construct() {
        $host = '127.0.0.1'; // or localhost
        $db   = 'product_manager';
        $user = 'root';
        $pass = ''; // Default XAMPP. Change to 'root' if using MAMP.
        $charset = 'utf8mb4';

        $dsn = "mysql:host=$host;dbname=$db;charset=$charset";
        $options = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ];

        try {
            $this->pdo = new PDO($dsn, $user, $pass, $options);
        } catch (\PDOException $e) {
            // Throw exception or handle error
            throw new \PDOException($e->getMessage(), (int)$e->getCode());
        }
    }

    public function getAllProducts() {
        $stmt = $this->pdo->query('SELECT * FROM products ORDER BY created_at DESC');
        return $stmt->fetchAll();
    }

    public function getProductById($id) {
        $stmt = $this->pdo->prepare('SELECT * FROM products WHERE id = ?');
        $stmt->execute([$id]);
        return $stmt->fetch();
    }

    public function addProduct($name, $description, $price, $imagePath) {
        $stmt = $this->pdo->prepare('INSERT INTO products (name, description, price, image_path) VALUES (?, ?, ?, ?)');
        return $stmt->execute([$name, $description, $price, $imagePath]);
    }

    public function deleteProduct($id) {
        // Find product image to optionally delete it (simplified here)
        $stmt = $this->pdo->prepare('DELETE FROM products WHERE id = ?');
        return $stmt->execute([$id]);
    }
}
?>
