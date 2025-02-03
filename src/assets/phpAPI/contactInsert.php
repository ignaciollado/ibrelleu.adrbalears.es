<?php
require 'config.php';

// Habilitar la visualización de errores para depuración
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Obtener los datos del cuerpo de la solicitud
$data = json_decode(file_get_contents('php://input'), true);

try {
    // Preparar la consulta SQL
    $sql = 'INSERT INTO contacts (firstName, lastName, dni, dob, profile, gender, 
    acceptTerms, mainPhone, mainMail, 
    localizationAddress, zipCode, localizationCity, councilCity, province, localizationCCAA, country, web_registration) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

    // Preparar la declaración
    $stmt = $pdo->prepare($sql);

    // Ejecutar la declaración con los datos proporcionados
    $stmt->execute([
      $data['firstName'],
      $data['lastName'],
      $data['dni'],
      $data['dob'],
      $data['profile'],
      $data['gender'],
      $data['acceptTerms'],
      $data['mainPhone'],
      $data['mainMail'],
      $data['localizationAddress'],
      $data['zipCode'],
      $data['localizationCity'],
      $data['councilCity'],
      $data['province'],
      $data['localizationCCAA'],
      $data['country'],
      $data['web_registration']
  ]);

    // Devolver una respuesta en formato JSON para éxito
    echo json_encode(['message' => 'Contact created successfully']);
} catch (PDOException $e) {
    // Devolver una respuesta en formato JSON para error
    echo json_encode(['error' => 'Failed to create contact: ' . $e->getMessage()]);
}
?>