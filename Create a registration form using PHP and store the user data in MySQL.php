<!-- Database -->
<!-- CREATE DATABASE membership_site;

USE membership_site;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
); -->

<!-- config.php -->

<?php
$host = 'localhost'; // or '127.0.0.1'
$db = 'membership_site';
$user = 'root'; // MySQL username (for XAMPP/WAMP)
$pass = ''; // MySQL password (usually empty for XAMPP/WAMP)

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}
?>
<!-- 
register.php -->
<?php
include 'config.php';

$nameError = $emailError = $passwordError = $successMessage = '';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $hashedPassword = password_hash($password, PASSWORD_BCRYPT); // Encrypt the password

    // Basic validation
    if (empty($name)) {
        $nameError = 'Name is required';
    }
    if (empty($email)) {
        $emailError = 'Email is required';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $emailError = 'Invalid email format';
    }
    if (empty($password)) {
        $passwordError = 'Password is required';
    }

    // If validation passes, insert the user into the database
    if (empty($nameError) && empty($emailError) && empty($passwordError)) {
        try {
            $stmt = $pdo->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
            $stmt->execute([$name, $email, $hashedPassword]);

            $successMessage = "Registration successful! Welcome, " . htmlspecialchars($name);
            // Optionally clear the form values
            $_POST['name'] = '';
            $_POST['email'] = '';
            $_POST['password'] = '';
        } catch (PDOException $e) {
            if ($e->getCode() == 23000) {
                $emailError = 'Email already exists. Please use a different email.';
            } else {
                echo "Error: " . $e->getMessage();
            }
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Registration</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        .error { color: red; }
        .success { color: green; }
    </style>
</head>
<body>
<div class="container mt-5">
    <h1>User Registration Form</h1>

    <!-- Success Message -->
    <?php if ($successMessage): ?>
        <p class="success"><?= $successMessage ?></p>
    <?php endif; ?>

    <form method="POST" action="register.php">
        <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input type="text" class="form-control" id="name" name="name" value="<?= htmlspecialchars($_POST['name'] ?? '') ?>">
            <span class="error"><?= $nameError ?></span>
        </div>
        <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input type="email" class="form-control" id="email" name="email" value="<?= htmlspecialchars($_POST['email'] ?? '') ?>">
            <span class="error"><?= $emailError ?></span>
        </div>
        <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" id="password" name="password">
            <span class="error"><?= $passwordError ?></span>
        </div>
        <button type="submit" class="btn btn-primary">Register</button>
    </form>
</div>
</body>
</html>
