<?php
  /**
  * Requires the "PHP Email Form" library
  * The "PHP Email Form" library is available only in the pro version of the template
  * The library should be uploaded to: vendor/php-email-form/php-email-form.php
  * For more info and help: https://bootstrapmade.com/php-email-form/
  */

  //endereço de e-mail para qual será enviado os e-mails da página
  $receiving_email_address = 'cassia.oliveira.profissional@gmail.com';

  if( file_exists($php_email_form = '../assets/vendor/php-email-form/php-email-form.php' )) {
    include( $php_email_form );
  } else {
    die( 'Não é possível carregar a biblioteca "PHP Email Form"!');
  }

  $contact = new PHP_Email_Form;
  $contact->ajax = true;
  
  $contact->to = $receiving_email_address;
  $contact->from_name = $_POST['name'];
  $contact->from_email = $_POST['email'];
  $contact->subject = $_POST['subject'];

  //to use SMTP to send emails. Enter your correct SMTP credentials
  /*
  $contact->smtp = array(
    'host' => 'example.com',
    'username' => 'example',
    'password' => 'pass',
    'port' => '587'
  );
  */

  $contact->add_message( $_POST['name'], 'From');
  $contact->add_message( $_POST['email'], 'Email');
  $contact->add_message( $_POST['message'], 'Message', 10);

  $contact->cc = array('cassia.oliveira.profissional@gmail.com', 'cassia.santos.ufopa@gmail.com.com');
  $contact->bcc = array('cassia.oliveira.profissional@gmail.com', 'cassia.santos.ufopa@gmail.com.com');

  $contact->honeypot = $_POST['protection-email'];

  echo $contact->send();
?>
