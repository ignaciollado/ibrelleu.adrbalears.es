<?php
$uploadDirectory = '../docs/uploads/';

if (is_dir($uploadDirectory)) {
    $files = array_diff(scandir($uploadDirectory), array('.', '..'));
    $fileList = [];
    foreach ($files as $index => $file) {
        $fileList[$index] = $file;
    }

    echo json_encode(['status' => 'success', 'files' => $fileList]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Upload directory does not exist']);
}
?>