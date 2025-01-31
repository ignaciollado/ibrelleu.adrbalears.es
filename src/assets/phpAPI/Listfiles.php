<?php
$uploadDirectory = '../docs/uploads/';

if (is_dir($uploadDirectory)) {
    $files = array_diff(scandir($uploadDirectory), array('.', '..'));
    echo json_encode(['status' => 'success', 'files' => $files]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Upload directory does not exist']);
}
?>