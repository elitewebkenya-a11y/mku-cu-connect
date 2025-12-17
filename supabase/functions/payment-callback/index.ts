<?php
// Allow CORS so your frontend can communicate with this API
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Log all incoming requests for debugging
$rawInput = file_get_contents('php://input');
file_put_contents("callback_log.txt", date('Y-m-d H:i:s') . " - Raw Input: " . $rawInput . "\n", FILE_APPEND);

// Parse JSON payload
$input = json_decode($rawInput, true);
header('Content-Type: application/json');

// Validate input
if (!$input || !isset($input['status']) || !$input['status']) {
    echo json_encode(['error' => 'Invalid callback data']);
    exit;
}

$response = $input['response'] ?? null;
if (!$response) {
    echo json_encode(['error' => 'Invalid callback data']);
    exit;
}

// Determine the correct User_Reference and Status from payload
$userReference = $response['User_Reference'] ?? ($response['ExternalReference'] ?? null);
$statusText = $response['Status'] ?? null;

if (!$userReference || !$statusText) {
    file_put_contents("callback_log.txt", date('Y-m-d H:i:s') . " - ERROR: Missing 'User_Reference' or 'Status' in response.\n", FILE_APPEND);
    echo json_encode(['error' => "Missing 'User_Reference' or 'Status' in response"]);
    exit;
}

// Normalize status
$statusText = strtolower($statusText); // "success", "failed", etc.
$statusMap = [
    'success'   => 'success',
    'failed'    => 'failed',
    'cancelled' => 'failed',
    'pending'   => 'pending'
];
$status = $statusMap[$statusText] ?? 'pending';

// Prepare file storage
$paymentsDir = __DIR__ . "/payments";
if (!file_exists($paymentsDir)) {
    mkdir($paymentsDir, 0755, true);
}

$file = "{$paymentsDir}/{$userReference}.json";
if (!file_exists($file)) {
    $data = ['reference' => $userReference];
} else {
    $data = json_decode(file_get_contents($file), true);
}

// Update payment data
$data['status'] = $status;
$data['updated_at'] = time();

// Save back to file
file_put_contents($file, json_encode($data));

// Respond to PayHero
echo json_encode(['status' => true]);
?>
