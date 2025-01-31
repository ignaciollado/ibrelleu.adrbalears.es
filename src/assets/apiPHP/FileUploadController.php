<?php

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $uploadDir = 'uploads/'; // Directorio donde se guardarán los archivos subidos
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true); // Crear el directorio si no existe
    }

    $files = $_FILES['files'];
    $numFiles = count($files['name']);

    for ($i = 0; $i < $numFiles; $i++) {
        $fileName = basename($files['name'][$i]);
        $targetFilePath = $uploadDir . $fileName;

        // Verificar si el archivo se subió sin errores
        if ($files['error'][$i] === UPLOAD_ERR_OK) {
            // Mover el archivo subido al directorio de destino
            if (move_uploaded_file($files['tmp_name'][$i], $targetFilePath)) {
                echo "El archivo $fileName se subió correctamente.<br>";
            } else {
                echo "Hubo un error al subir el archivo $fileName.<br>";
            }
        } else {
            echo "Error al subir el archivo $fileName: " . $files['error'][$i] . "<br>";
        }
    }
} else {
    echo "Método de solicitud no permitido.";
}
?>