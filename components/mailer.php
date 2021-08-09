<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class Mailer {
    private $name;
    private $email;
    function __construct($name, $email)
    {
        $this->name = $name;
        $this->email = $email;
    }
    function send_mail() {
        require_once "vendor/autoload.php";

        //PHPMailer Object``$mail = new PHPMailer(true); //Argument true in constructor enables exceptions`
        $mail = new PHPMailer(true);
        //To load the French version

        // $mail->setLanguage('ru', 'vendor/phpmailer/phpmailer/language/');

        //From email address and name
        $mail->From = "narekhayrapetyan857@gmail.com";
        $mail->FromName = "ActiveSite";

        //To address and name
        $mail->addAddress($this->email, $this->name);
        // $mail->addAddress("recepient1@example.com"); //Recipient name is optional

        //Address to which recipient will reply
        $mail->addReplyTo("Admin@Active-Site.ru", "Reply");

        //CC and BCC
        // $mail->addCC("cc@example.com");
        // $mail->addBCC("bcc@example.com");

        //Send HTML or Plain Text email
        $mail->isHTML(true);

        $mail->Subject = "Your application is accepted";
        $mail->Body = "<h1>Привет $this->name!</h1>
                <p>Ваша заявка принята ожидайте пока наш специалист свяжется с вами!</p>
                <p>С Уважением: Active Site!</p>
                <a href='https://active-site.ru'>active-site.ru</a>";
        $mail->AltBody = "This is the plain text version of the email content";
        if  (!$mail->send()) {
            print "Mailer Error: " . $mail->ErrorInfo;
        } else {
            return 200;
        }
    }
}





