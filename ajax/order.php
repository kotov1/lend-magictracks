<?php
	$result = 'error';
	$server_name = $_SERVER['SERVER_NAME'];
	$recipient = "fastdl@bk.ru"; // change this
	$recipient1 = "zont.fastdl@yandex.ru"; // change this
    $recipient2 = "andrew.satterfield@yandex.ru"; // change this

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
		if($_POST["order"]){
			session_start();
			$order_id = $_SESSION['order_id'] = date("Ymd") . '-' . date("His");		

			$subject = "Заказ #".$order_id." с сайта ".$server_name." ".$phone;
            $subject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
			
			$base  	= trim($_POST["color-base"]);
			$corner = trim($_POST["color-corner"]);
			$set  	= trim($_POST["set"]);
			$price  = trim($_POST["price"]);
			
			$name  = trim($_POST["name"]);
			$phone = trim($_POST["phone"]);
			$model = trim($_POST["model"]);

			if(empty($name)){
				$result = 'empty_name';
			} elseif(empty($phone)) {
				$result = 'empty_phone';
			} else {
				$_SESSION['name'] = $name;	
				$_SESSION['phone'] = $phone;
				$_SESSION['model'] = $model;
				$_SESSION['price'] = $price;	
				
				$email_content = "Имя: $name\r\n";
				$email_content .= "Телефон: $phone\r\n";
				$email_content .= "Модель: $model\r\n\r\n";
				$email_content .= "Цена: $price Руб";

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
		} elseif($_POST["delivery"]) {
			session_start();
			$order_id = $_SESSION['order_id'];
			$name = $_SESSION['name'];	

			$phone = $_SESSION["phone"];
			$model = $_SESSION["model"];
			$price  = $_SESSION["price"];
			
			$subject = "Заказ #".$order_id." с сайта ".$server_name." - Доставка ".$phone;
            $subject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
			$email_content = "Имя: ".$name."\r\n";
			$email_content .= "Телефон:".$phone."\r\n";
			$email_content .= "Модель:".$model."\r\n\r\n";
			$email_content .= "Цена:".$price."Руб\r\n";
			$address  = trim($_POST["address"]);
			$delivery = trim($_POST["delivery"]);
			$payment = trim($_POST["payment"]);

			if(empty($address)){
				$result = 'empty_address';
			} else {
				$email_content .= "Адрес: $address\r\n";
				$email_content .= "Доставка: $delivery\r\n";
				$email_content .= "Оплата: $payment";

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
    }
	
	header("Content-type: application/json; charset=UTF-8");
	header("Cache-Control: must-revalidate");
	header("Pragma: no-cache");
	header("Expires: -1");
	print json_encode($result);
?>