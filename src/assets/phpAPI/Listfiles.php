<?php
$uploadDirectory = '../docs/uploads/'; // Tiene que ser dinámico: accounts, cuentas... y, además, por id
if (isset($_GET['foldername'])) {
    $foldername = htmlspecialchars($_GET['foldername']);
    $uploadDirectory .= $foldername . "/";
}
if (isset($_GET['id'])) {
    $id = htmlspecialchars($_GET['id']);
    $uploadDirectory .= $id . "/";
}
if (is_dir($uploadDirectory)) {
    $files = array_diff(scandir($uploadDirectory), array('.', '..'));
    $fileList = [];
    foreach ($files as $file) {
        $fileList[] = $file;
    }

    echo json_encode(['status' => 'success', 'files' => $fileList]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Upload directory does not exist']);
}
?>