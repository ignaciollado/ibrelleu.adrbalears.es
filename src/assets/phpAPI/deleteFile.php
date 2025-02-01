<?php
if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    
    $filename = htmlspecialchars($_GET['filename']);
    $foldername = htmlspecialchars($_GET['foldername']);
    $id = htmlspecialchars($_GET['id']);

    $uploadDirectory = '../docs/uploads/';
    $folderPath = $uploadDirectory . $foldername . '/' . $id . '/';
    $filePath = $folderPath . $filename;

    if (file_exists($filePath)) {
        if (unlink($filePath)) {
            echo json_encode(['status' => 'success', 'message' => 'File deleted successfully']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Error deleting the file']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'File does not exist']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}
?>