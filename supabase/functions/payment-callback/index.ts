<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$input = json_decode(file_get_contents('php://input'), true);
if (!$input || !isset($input['status']) || !$input['status']) {
    echo json_encode(['error' => 'Invalid callback data']);
    exit;
}

$response = $input['response'] ?? null;
$userReference = $response['User_Reference'] ?? ($response['ExternalReference'] ?? null);
$statusText = $response['Status'] ?? null;
$donorName = $response['CustomerName'] ?? null;
$paymentType = $response['PaymentType'] ?? null;
$amount = $response['Amount'] ?? null;

if (!$userReference || !$statusText) {
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

// Supabase REST API credentials
$supabaseUrl = "https://mcglwbcsyvtbmuegfamt.supabase.co/rest/v1/payments";
$supabaseKey = "YOUR_SERVICE_ROLE_KEY_HERE";

// PATCH request to update payment status
$ch = curl_init("$supabaseUrl?external_reference=eq.$userReference");
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

echo json_encode(['status' => $httpCode >= 200 && $httpCode < 300]);
?>
