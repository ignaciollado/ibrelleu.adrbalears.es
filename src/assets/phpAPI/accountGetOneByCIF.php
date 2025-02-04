<?php
require 'config.php';
echo json_encode(['message' => 'Account not found']);

return;
if (isset($_GET['cif'])) {
    $cif = $_GET['cif'];

    $stmt = $pdo->prepare('SELECT * FROM accounts WHERE cif = ?');
    $stmt->execute([$cif]);
    $account = $stmt->fetch();

    if ($account) {
        echo json_encode($account);
    } else {
        echo json_encode(['message' => 'Account not found']);
    }
} else {
    echo json_encode(['message' => 'No CIF provided']);
}
?>
