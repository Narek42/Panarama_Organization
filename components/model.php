<?php
    class Model {
        private $db;
        function __construct()
        {
            $this->db = new mysqli("127.0.0.1", "root", "", "activesite", 3306);
        }
        function add_user($name, $email, $number) {
            if ($this->db->connect_errno) {
               return 404;
            } 
            $date = date("jS \of F Y");
            $q = "insert into users (name, email, number, data) values ('$name', '$email', '$number', '$date')";
            $this->db->query($q);
        }

    }
?>