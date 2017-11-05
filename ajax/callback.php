<?php
	$result = 'error';
	$server_name = $_SERVER['SERVER_NAME'];
    $recipient = "fastdl@bk.ru"; // change this
	$recipient1 = "zont.fastdl@yandex.ru"; // change this
    $recipient2 = "andrew.satterfield@yandex.ru"; // change this

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $name  = trim($_POST["name"]);
        $phone = trim($_POST["phone"]);
      
        $subject = "Просьба перезвонить с сайта ".$server_name." ".$phone;

        if(empty($name)){
            $result = 'empty_name';
        } elseif(empty($phone)) {
            $result = 'empty_phone';
		} else {
			$email_content = "Имя: $name\r\n";
			$email_content .= "Телефон: $phone";
            $subject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
			/*$email_headers = "From: $name <no-reply@$server_name>";
            $email_headers .= "Content-type: text/plain; charset=\"utf-8\"";*/
          
          //My recoding
            $email_headers  = "Content-type: text/plain; charset=\"utf-8\" \r\n"; 
            $email_headers .= "From: =?utf-8?b?'". base64_encode($name) ."?= <no-reply@".$server_name.">\r\n";
            $email_headers .= "Reply-To: =?utf-8?b?'". base64_encode($name) ."?= <no-reply@".$server_name.">\r\n";
			
			if (mail($recipient, $subject, $email_content, $email_headers))
				{$result = 'success';}
            if (mail($recipient1, $subject, $email_content, $email_headers))
				{$result = 'success';}
            if (mail($recipient2, $subject, $email_content, $email_headers))
				{$result = 'success';}
        }
    }
	
	header("Content-type: application/json; charset=UTF-8");
	header("Cache-Control: must-revalidate");
	header("Pragma: no-cache");
	header("Expires: -1");
	print json_encode($result);
?>