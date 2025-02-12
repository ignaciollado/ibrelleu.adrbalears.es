<?php
require 'config.php';

// Habilito la visualización de errores para depuración
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Obtengo los datos del cuerpo de la solicitud
$data = json_decode(file_get_contents('php://input'), true);

try {
    // Preparo la consulta SQL
    $sql = 'INSERT INTO contacts (acceptTerms, dni, dob, firstName, gender, lastName, localizationAddress, mainMail, mainPhone, userProfile,
       council, island, town,  
       zipCode, web_registration) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

    // Preparo la declaración
    $stmt = $pdo->prepare($sql);

    // Ejecuto la declaración con los datos proporcionados
    $stmt->execute([
      $data['acceptTerms'],
      $data['dni'],
      $data['dob'],
      $data['firstName'],
      $data['gender'],
      $data['lastName'],   
      $data['localizationAddress'], 
      $data['mainMail'],
      $data['mainPhone'],
      $data['userProfile'],
      $data['zipCode']['council'],
      $data['zipCode']['island'],
      $data['zipCode']['town'],
      $data['zipCode']['zipCode'],
      true
  ]);

    // Devuelvo una respuesta en formato JSON para éxito
    echo json_encode(['message' => 'Contact created successfully']);
} catch (PDOException $e) {
    // Devuelvo una respuesta en formato JSON para error
    echo json_encode(['error' => 'Failed to create contact: ' . $e->getMessage()]);
}
?>