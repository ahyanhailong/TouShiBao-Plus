<?php
define('APPLICATION_PATH', realpath(dirname(dirname((__FILE__)))));
define('PROJECT_PATH', realpath(dirname(dirname(dirname((__FILE__))))));
require_once(APPLICATION_PATH . '/vendor/autoload.php');

error_reporting(1);
$application = new \Yaf\Application( APPLICATION_PATH . "/conf/app.ini");

$application->bootstrap()->run();

