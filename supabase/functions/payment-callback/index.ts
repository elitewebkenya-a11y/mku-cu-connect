<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Log raw input for debugging
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

$userReference = $response['User_Reference'] ?? ($response['ExternalReference'] ?? null);
$statusText = $response['Status'] ?? null;
$donorName = $response['CustomerName'] ?? null;
$paymentType = $response['PaymentType'] ?? null;
$amount = $response['Amount'] ?? null;

if (!$userReference || !$statusText) {
    file_put_contents("callback_log.txt", date('Y-m-d H:i:s') . " - ERROR: Missing User_Reference or Status\n", FILE_APPEND);
    echo json_encode(['error' => "Missing 'User_Reference' or 'Status'"]);
    exit;
}

$statusMap = [
    'success' => 'success',
    'failed' => 'failed',
    'cancelled' => 'failed',
    'pending' => 'pending'
];

$status = $statusMap[strtolower($statusText)] ?? 'pending';

// Supabase REST API insert/update
$supabaseUrl = "https://mcglwbcsyvtbmuegfamt.supabase.co"; // your Supabase URL
$supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."; // service_role key

$ch = curl_init("$supabaseUrl/rest/v1/payments?external_reference=eq.$userReference");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "apikey: $supabaseKey",
    "Authorization: Bearer $supabaseKey",
    "Content-Type: application/json",
    "Prefer: return=representation"
]);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PATCH");
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
    "status" => $status,
    "updated_at" => date('c'),
    "donor_name" => $donorName,
    "payment_type" => $paymentType,
    "amount" => $amount
]));

$responseData = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode >= 200 && $httpCode < 300) {
    echo json_encode(['status' => true, 'updated' => $userReference]);
} else {
    file_put_contents("callback_log.txt", date('Y-m-d H:i:s') . " - Supabase update failed: $responseData\n", FILE_APPEND);
    echo json_encode(['status' => false, 'error' => $responseData]);
}
?>
