<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_FILES['files'])) {
        //$uploadDirectory = '../assets/phpAPI/uploads/';
        $uploadDirectory = '../docs/uploads/';
        $errors = [];
        $uploadedFiles = [];

        // Crear la carpeta si no existe
        if (!is_dir($uploadDirectory)) {
            if (!mkdir($uploadDirectory, 0777, true)) {
                echo json_encode(['status' => 'error', 'message' => 'Failed to create upload directory']);
                exit;
            }
        }

        foreach ($_FILES['files']['tmp_name'] as $key => $tmpName) {
            $fileName = basename($_FILES['files']['name'][$key]);
            $targetFilePath = $uploadDirectory . $fileName;

            if ($_FILES['files']['error'][$key] !== UPLOAD_ERR_OK) {
                $errors[] = "Error uploading file: $fileName. Error code: " . $_FILES['files']['error'][$key];
                continue;
            }

            if (move_uploaded_file($tmpName, $targetFilePath)) {
                $uploadedFiles[] = $fileName;
            } else {
                $errors[] = "Error moving file: $fileName";
            }
        }

        if (empty($errors)) {
            echo json_encode(['status' => 'success', 'files' => $uploadedFiles]);
        } else {
            echo json_encode(['status' => 'error', 'errors' => $errors]);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'No files uploaded']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}
?>