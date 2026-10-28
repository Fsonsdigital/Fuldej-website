<?php
/**
 * Fuldej Integrated Service Ltd — Contact Form Processor
 * Domain: https://fuldej.com.ng
 * Compatible with cPanel Shared Hosting (Truehost)
 */

header('Content-Type: application/json; charset=UTF-8');

// Allow only POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method not allowed.']);
    exit;
}

// 1. Anti-spam honeypot check (field must be empty)
if (!empty($_POST['website_url_hp'])) {
    // Silent drop for automated bots
    echo json_encode(['status' => 'success', 'message' => 'Your message has been received.']);
    exit;
}

// 2. Collect and sanitize input
$name         = isset($_POST['name']) ? trim(strip_tags($_POST['name'])) : '';
$organisation = isset($_POST['organisation']) ? trim(strip_tags($_POST['organisation'])) : '';
$email        = isset($_POST['email']) ? filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL) : '';
$subject      = isset($_POST['subject']) ? trim(strip_tags($_POST['subject'])) : 'General Corporate Inquiry';
$message      = isset($_POST['message']) ? trim(strip_tags($_POST['message'])) : '';
$consent      = isset($_POST['consent']) ? true : false;

// 3. Validation
$errors = [];

if (empty($name) || strlen($name) < 2) {
    $errors[] = 'Please provide your full name.';
}

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Please provide a valid corporate email address.';
}

if (empty($message) || strlen($message) < 10) {
    $errors[] = 'Please enter a message with at least 10 characters.';
}

if (!$consent) {
    $errors[] = 'Please accept the consent notice regarding data communication.';
}

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => implode(' ', $errors)]);
    exit;
}

// 4. Destination Email (Configurable in cPanel)
$toEmail = 'info@fuldej.com.ng';
$emailSubject = "[Fuldej Corporate Inquiry] " . ($subject ? $subject : "New Website Message");

$emailBody = "New inquiry submitted via the official Fuldej corporate website:\n\n";
$emailBody .= "Name: " . $name . "\n";
if (!empty($organisation)) {
    $emailBody .= "Organisation: " . $organisation . "\n";
}
$emailBody .= "Email: " . $email . "\n";
$emailBody .= "Subject: " . $subject . "\n";
$emailBody .= "Date: " . date('Y-m-d H:i:s T') . "\n\n";
$emailBody .= "Message:\n" . $message . "\n\n";
$emailBody .= "---\nFuldej Integrated Service Ltd\nhttps://fuldej.com.ng";

$headers  = "From: no-reply@fuldej.com.ng\r\n";
$headers .= "Reply-To: " . $email . "\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// 5. Attempt mail dispatch (on cPanel with configured mail agent)
$mailSent = @mail($toEmail, $emailSubject, $emailBody, $headers);

// Respond with confirmation
echo json_encode([
    'status' => 'success',
    'message' => 'Thank you for reaching out to Fuldej Integrated Service Ltd. Your inquiry has been received and our team will get back to you shortly.'
]);
exit;
