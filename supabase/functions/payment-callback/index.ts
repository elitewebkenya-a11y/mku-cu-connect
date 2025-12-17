<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$input = json_decode(file_get_contents('php://input'), true);
if (!$input || !isset($input['status']) || !$input['status']) exit;

$response = $input['response'] ?? null;
$userReference = $response['User_Reference'] ?? ($response['ExternalReference'] ?? null);
$statusText = $response['Status'] ?? null;

if (!$userReference || !$statusText) exit;

$statusMap = [
    'success' => 'success',
    'failed' => 'failed',
    'cancelled' => 'failed',
    'pending' => 'pending'
];
$status = $statusMap[strtolower($statusText)] ?? 'pending';

$supabaseUrl = "https://mcglwbcsyvtbmuegfamt.supabase.co/rest/v1/payments";
$supabaseKey = "YOUR_SERVICE_ROLE_KEY_HERE";

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
    "updated_at" => date('c')
]));

curl_exec($ch);
curl_close($ch);

echo json_encode(['status' => true]);
?>
