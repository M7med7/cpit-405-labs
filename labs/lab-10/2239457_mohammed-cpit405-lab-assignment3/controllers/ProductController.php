<?php
/*
 * Student ID: 2239457
 * Student Name: Mohammed Rashid Alharbi
 * Course: CPIT-405
 * Lab: 10
 */

session_start();

// Include the Product model
require_once '../models/Product.php';

$action = $_GET['action'] ?? '';
$productModel = null;

try {
    $productModel = new Product();
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => 'Database connection failed.']);
    exit;
}

if ($action == 'list') {
    // Handle request to get all products
    $products = $productModel->getAllProducts();
    echo json_encode(['status' => 'success', 'data' => $products]);
    exit;
}

if ($action == 'add' && $_SERVER['REQUEST_METHOD'] == 'POST') {
    // Handle form submission via AJAX
    $name = $_POST['name'] ?? '';
    $description = $_POST['description'] ?? '';
    $price = $_POST['price'] ?? 0;
    $imagePath = '';

    // Simple validation
    if (empty($name) || empty($price)) {
        echo json_encode(['status' => 'error', 'message' => 'Name and price are required.']);
        exit;
    }

    // Handle File Upload
    if (isset($_FILES['image']) && $_FILES['image']['error'] == 0) {
        $uploadDir = '../views/uploads/';
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }
        
        $filename = time() . '_' . basename($_FILES['image']['name']);
        $targetFile = $uploadDir . $filename;
        
        if (move_uploaded_file($_FILES['image']['tmp_name'], $targetFile)) {
            $imagePath = 'uploads/' . $filename;
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Failed to upload image.']);
            exit;
        }
    }

    // Save to Database
    $success = $productModel->addProduct($name, $description, $price, $imagePath);
    if ($success) {
        $_SESSION['last_added'] = $name; // Store in session
        // Set a cookie to remember the last time a product was added
        setcookie('last_added_time', date('Y-m-d H:i:s'), time() + (86400 * 30), "/"); 
        
        echo json_encode(['status' => 'success', 'message' => 'Product added successfully.']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to add product.']);
    }
    exit;
}

if ($action == 'delete' && $_SERVER['REQUEST_METHOD'] == 'POST') {
    $id = $_POST['id'] ?? 0;
    if ($id) {
        $success = $productModel->deleteProduct($id);
        if ($success) {
            echo json_encode(['status' => 'success', 'message' => 'Product deleted.']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Failed to delete.']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid ID.']);
    }
    exit;
}

echo json_encode(['status' => 'error', 'message' => 'Invalid action.']);
exit;
?>
