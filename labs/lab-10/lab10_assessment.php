<?php
/*
 * Student ID: 2239457
 * Student Name: Mohammed Rashid Alharbi
 * Course: CPIT-405
 * Lab: 10
 */

echo "<h1>Lab 10 Assessment</h1>";

// ---------------------------------------------------------
// 1. Implement power function (recursive or iterative)
// ---------------------------------------------------------
echo "<h2>1. Power Function</h2>";

function power($base, $exponent) {
    // Recursive implementation
    if ($exponent == 0) {
        return 1;
    }
    return $base * power($base, $exponent - 1);
}

$base = 2;
$exp = 3;
echo "Result of power($base, $exp) is: " . power($base, $exp) . "<br>";

// ---------------------------------------------------------
// 2. Translate diagram with demo code
// ---------------------------------------------------------
echo "<h2>2. Translate Diagram with Demo Code (Generic Demo)</h2>";
// Assuming a typical Class Diagram: Shape as base, Circle and Rectangle as derived.

abstract class Shape {
    protected $color;
    
    public function __construct($color) {
        $this->color = $color;
    }
    
    abstract public function getArea();
}

class Circle extends Shape {
    private $radius;
    
    public function __construct($color, $radius) {
        parent::__construct($color);
        $this->radius = $radius;
    }
    
    public function getArea() {
        return pi() * pow($this->radius, 2);
    }
}

class Rectangle extends Shape {
    private $width;
    private $height;
    
    public function __construct($color, $width, $height) {
        parent::__construct($color);
        $this->width = $width;
        $this->height = $height;
    }
    
    public function getArea() {
        return $this->width * $this->height;
    }
}

$circle = new Circle("Red", 5);
$rectangle = new Rectangle("Blue", 4, 6);
echo "Circle Area: " . $circle->getArea() . "<br>";
echo "Rectangle Area: " . $rectangle->getArea() . "<br>";

// ---------------------------------------------------------
// 3. Simple connection to DB and retrieve all databases names
// ---------------------------------------------------------
echo "<h2>3. Retrieve all database names</h2>";

$host = '127.0.0.1'; // or localhost
$user = 'root';
$pass = ''; // Default XAMPP password is empty, MAMP is root

try {
    // Connect without specifying a DB to just run SHOW DATABASES
    $pdo = new PDO("mysql:host=$host", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo->query("SHOW DATABASES;");
    $databases = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo "<ul>";
    foreach ($databases as $db) {
        echo "<li>" . htmlspecialchars($db['Database']) . "</li>";
    }
    echo "</ul>";
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage() . " (Make sure your local DB server is running without a password, or adjust the script's credentials).";
}
?>
