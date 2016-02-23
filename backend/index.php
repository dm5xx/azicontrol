<?php

session_start();
date_default_timezone_set('Europe/Berlin');

require 'Device.class.php';
$device = new Device();

// routing for poor people

switch($_GET['action'])
{
    case 'status':

        echo json_encode( $device->getCurrentPosition() );
        break;

    case 'setAngle':

        $newAngle = (int) $_POST['angle'];
        $device->setAngle( $newAngle );
        break;

    case 'reset':

        session_start();
        session_destroy();
        break;

    default:
        break;
}
