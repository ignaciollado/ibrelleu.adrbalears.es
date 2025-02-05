<?php
require 'config.php';

if (isset($_GET['dni'])) {
    $dni = $_GET['dni'];

    $stmt = $pdo->prepare('SELECT * FROM contacts WHERE dni = ?');
    $stmt->execute([$dni]);
    $contact = $stmt->fetch();

    if ($contact) {
        echo json_encode($contact);
    } else {
        echo json_encode(['message' => 'Contact not found']);
    }
} else {
    echo json_encode(['message' => 'No DNI provided']);
}
?>
