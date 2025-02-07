<?php
require 'config.php';

// Habilito la visualización de errores para depuración
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
try {
  // Preparo la consulta SQL
  $stmt = $pdo->query('SELECT * FROM contacts');
  $contacts = $stmt->fetchAll();

  echo json_encode($contacts);
} catch (PDOException $e) {
  // Devuelvo una respuesta en formato JSON para error
  echo json_encode(['error' => 'Failed to list contacts: ' . $e->getMessage()]);
}
?>
