<?php
require 'config.php';

if (isset($_GET['id'])) {
    $id = $_GET['id'];

    $stmt = $pdo->prepare('SELECT * FROM contacts WHERE id = ?');
    $stmt->execute([$id]);
    $contact = $stmt->fetch();

    if ($contact) {
        echo json_encode($contact);
    } else {
        echo json_encode(['message' => 'Contact not found']);
    }
} else {
    echo json_encode(['message' => 'No ID provided']);
}
?>
