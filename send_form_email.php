<?php
require './PHPMailerAutoload.php';

$body = " ";
$address = "";

if (isset($_POST['customerName']))
{
    $body = "Customer: " . $_POST["customerName"];
}

if (isset($_POST['customerEmail']))
{
    $body = $body . "<br>Email Address: " . $_POST["customerEmail"];
}

if (isset($_POST['customerPhone']))
{
    $body = $body . "<br>Phone Number: " . $_POST["customerPhone"];
}

if (isset($_POST['customerMessage']))
{
    $body = $body . "<br>Message:<br>" . $_POST["customerMessage"];
}

if (isset($_POST['address']))
{
    $address = $_POST["address"];
}

$mail = new PHPMailer;

//$mail->SMTPDebug = 3;                                 // Enable verbose debug output

$mail->isSMTP();                                        // Set mailer to use SMTP
$mail->Host = 'chi-server29.websitehostserver.net';     // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                                 // Enable SMTP authentication
$mail->Username = $address;                             // SMTP username
//$mail->Username = 'john@johnaleblanc.com';  
$mail->Password = 'Lebl024!';                           // SMTP password
$mail->SMTPSecure = 'ssl';                              // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465;                                      // TCP port to connect to

$mail->setFrom($address, 'Me');
$mail->addAddress($address, 'Me');                      // Add a recipient

$mail->isHTML(true);                                    // Set email format to HTML

$mail->Subject = 'Message from ' . $address;
$mail->Body    = $body;
$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

if(!$mail->send()) {
    header('Location: index.html?msgSent=0#/contact');
} else {
    header('Location: index.html?msgSent=1#/contact');
}