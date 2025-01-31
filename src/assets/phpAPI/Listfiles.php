<?php
$uploadDirectory = '../docs/uploads/accounts'; /* dinámico por accounts, cuentas... y, además, por id */

if (isset($_GET['tipocarpeta'])) {
    $tipoCarpeta=  htmlspecialchars($_GET['tipocarpeta']);
    $uploadDirectory += $tipoCarpeta+"/";
}
if (isset($_GET['id'])) {
    $id = htmlspecialchars($_GET['id']);
    $uploadDirectory += $id+"/";
}
echo $uploadDirectory;

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