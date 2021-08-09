<?php
   class Main {
        function __construct() 
        {
            if  ($_SERVER["REQUEST_METHOD"] == "POST") {
                foreach ($_POST as $key => $value) {
                   $_POST[$key] = htmlentities($_POST[$key]); 
                }
                call_user_func(array($this, $_POST["action"]));
            } else {
                header("location: not.html");
            }
        }
        function send_email_message() {
            foreach ($_POST as $key =>$value) {
                if  (empty($_POST[$key])) {
                    print json_encode("empty_key");
                    return;
                }
            }
            $validate_email = filter_var($_POST["email"], FILTER_VALIDATE_EMAIL, array(
                "flags" => "FILTER_FLAG_EMAIL_UNICODE"));
            if  ($validate_email != $_POST["email"]) {
                print  "email_validate";
                return;
            } else if(!preg_match('/^\+7\([0-9]{3}\)-+[0-9]{3}+\-+[0-9]{2}+\-+[0-9]{2}$/i', $_POST["number"])) {
                print "number_validate";
                return;
            }
            include "mailer.php";
            $mailer = new Mailer($_POST["name"], $_POST["email"]);
            $res = $mailer->send_mail();
            
            if ($res == 200) {
                include "model.php";
                $model = new Model();
                $res = $model->add_user($_POST["name"], $_POST["email"], $_POST["number"]);
                if  ($res == 404) {
                    print json_encode("#404127");
                } else {
                    print json_encode(true);
                }
            } else {
                print json_encode(false);
            }
        }
    }

    $obj = new Main();
?>
