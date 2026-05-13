<?php
/*
 * Student ID: 2239457
 * Student Name: Mohammed Rashid Alharbi
 * Course: CPIT-405
 * Lab: 10
 */
session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Product Management</title>
    <link rel="stylesheet" href="../css/style.css">
</head>
<body>
    <div class="container">
        <header>
            <h1>Product Management System</h1>
            <p>
                <?php 
                if (isset($_SESSION['last_added'])) {
                    echo "Last product added in this session: <strong>" . htmlspecialchars($_SESSION['last_added']) . "</strong>. ";
                }
                if (isset($_COOKIE['last_added_time'])) {
                    echo "Last addition time: <em>" . htmlspecialchars($_COOKIE['last_added_time']) . "</em>.";
                }
                ?>
            </p>
        </header>

        <section class="add-product-section">
            <h2>Add New Product</h2>
            <!-- The form action points to the controller, but we intercept it with AJAX in app.js -->
            <form id="addProductForm" action="../controllers/ProductController.php?action=add" method="POST" enctype="multipart/form-data">
                <div class="form-group">
                    <label for="name">Product Name:</label>
                    <input type="text" id="name" name="name" required>
                </div>
                <div class="form-group">
                    <label for="description">Description:</label>
                    <textarea id="description" name="description"></textarea>
                </div>
                <div class="form-group">
                    <label for="price">Price ($):</label>
                    <input type="number" id="price" name="price" step="0.01" required>
                </div>
                <div class="form-group">
                    <label for="image">Product Image:</label>
                    <input type="file" id="image" name="image" accept="image/*">
                </div>
                <button type="submit" class="btn">Add Product</button>
                <div id="formMessage"></div>
            </form>
        </section>

        <section class="product-list-section">
            <h2>Product List</h2>
            <div id="productList" class="product-grid">
                <!-- Products will be loaded here via AJAX -->
            </div>
        </section>
    </div>

    <script src="../js/app.js"></script>
</body>
</html>
