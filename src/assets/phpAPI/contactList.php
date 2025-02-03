<?php
require 'config.php';

$stmt = $pdo->query('SELECT * FROM contacts');
$contacts = $stmt->fetchAll();

echo json_encode($contacts);
?>
