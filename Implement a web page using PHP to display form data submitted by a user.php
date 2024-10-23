<?php
// Start the session to store comments
session_start();

// Initialize an array to hold comments
if (!isset($_SESSION['comments'])) {
    $_SESSION['comments'] = [];
}

// Handle form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST' && !empty($_POST['comment'])) {
    $comment = htmlspecialchars(trim($_POST['comment'])); // Sanitize input
    $_SESSION['comments'][] = $comment; // Add comment to session array
}

$comments = $_SESSION['comments']; // Get comments from session
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Feedback Form</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
</head>
<body>
    <div class="container mt-5">
        <h1>Feedback Form</h1>
        <form method="POST" action="">
            <div class="form-group">
                <label for="comment">Your Comment:</label>
                <textarea class="form-control" id="comment" name="comment" rows="3" required></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>

        <h2 class="mt-4">Comments</h2>
        <ul class="list-group">
            <?php if (!empty($comments)): ?>
                <?php foreach ($comments as $cmt): ?>
                    <li class="list-group-item"><?php echo $cmt; ?></li>
                <?php endforeach; ?>
            <?php else: ?>
                <li class="list-group-item">No comments yet.</li>
            <?php endif; ?>
        </ul>
    </div>

    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.2/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>
</html>
