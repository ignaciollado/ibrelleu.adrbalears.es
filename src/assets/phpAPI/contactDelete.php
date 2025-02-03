<?php
require 'config.php';

if (isset($_GET['id'])) {
    $id = $_GET['id'];

    $stmt = $pdo->prepare('DELETE FROM contacts WHERE id = ?');
    $stmt->execute([$id]);

    echo json_encode(['message' => 'Contact deleted successfully']);
} else {
    echo json_encode(['message' => 'No ID provided']);
}
?>
