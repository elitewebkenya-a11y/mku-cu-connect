<?php
// Allow CORS so your frontend can communicate with this API
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Log callback requests for debugging
file_put_contents("callback_log.txt", date('Y-m-d H:i:s') . " - Raw Input: " . file_get_contents('php://input') . "\n", FILE_APPEND);

$input = json_decode(file_get_contents('php://input'), true);

header('Content-Type: application/json');

if (!$input || !isset($input['status']) || !$input['status']) {
    echo json_encode(['error' => 'Invalid callback data']);
    exit;
}

$response = $input['response'] ?? null;

if (!$response) {
    echo json_encode(['error' => 'Invalid callback data']);
    exit;
}

// Determine the correct User_Reference and Status from different possible payloads
$userReference = $response['User_Reference'] ?? ($response['ExternalReference'] ?? null);
$statusText = $response['Status'] ?? null;

// Optional additional fields
$donorName = $response['CustomerName'] ?? null;
$paymentType = $response['PaymentType'] ?? null;
$amount = $response['Amount'] ?? null;

if (!$userReference || !$statusText) {
    file_put_contents("callback_log.txt", date('Y-m-d H:i:s') . " - ERROR: Missing 'User_Reference' or 'Status' in response.\n", FILE_APPEND);
    echo json_encode(['error' => "Missing 'User_Reference' or 'Status' in response"]);
    exit;
}

$statusText = strtolower($statusText); // e.g. "success" or "failed"

// Map PayHero status to local status keys
$statusMap = [
    'success' => 'success',
    'failed' => 'failed',
    'cancelled' => 'failed',
    'pending' => 'pending'
];

$status = $statusMap[$statusText] ?? 'pending';

$file = "payments/{$userReference}.json";

// Load existing data if exists
if (file_exists($file)) {
    $data = json_decode(file_get_contents($file), true);
} else {
    $data = ['reference' => $userReference];
}

// Update payment info
$data['status'] = $status;
$data['updated_at'] = time();
if ($donorName) $data['donor_name'] = $donorName;
if ($paymentType) $data['payment_type'] = $paymentType;
if ($amount) $data['amount'] = $amount;

// Save updated data
file_put_contents($file, json_encode($data));

echo json_encode(['status' => true]);
?>
