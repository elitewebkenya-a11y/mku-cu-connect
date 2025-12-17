<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

file_put_contents("callback_log.txt", date('Y-m-d H:i:s') . " - Raw Input: " . file_get_contents('php://input') . "\n", FILE_APPEND);

$input = json_decode(file_get_contents('php://input'), true);
header('Content-Type: application/json');

$response = $input['response'] ?? null;
$userReference = $response['User_Reference'] ?? ($response['ExternalReference'] ?? null);
$statusText = strtolower($response['Status'] ?? '');

if (!$userReference || !$statusText) {
    echo json_encode(['error'=>"Missing 'User_Reference' or 'Status'"]);
    exit;
}

$statusMap = ['success'=>'success','failed'=>'failed','cancelled'=>'failed','pending'=>'pending'];
$status = $statusMap[$statusText] ?? 'pending';

// Optional fields
$donorName = $response['CustomerName'] ?? null;
$paymentType = $response['PaymentType'] ?? null;
$amount = $response['Amount'] ?? null;

$file = "payments/{$userReference}.json";
$data = file_exists($file) ? json_decode(file_get_contents($file), true) : ['reference'=>$userReference];

$data['status'] = $status;
$data['updated_at'] = time();
if ($donorName) $data['donor_name'] = $donorName;
if ($paymentType) $data['payment_type'] = $paymentType;
if ($amount) $data['amount'] = $amount;

file_put_contents($file, json_encode($data));
echo json_encode(['status'=>true]);
?>
