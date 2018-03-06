<?php
namespace App\library\Service;

use App\models\VO\Response\ReturnFormat;

/**
 * Class BaseService
 */
abstract class BaseService implements ServiceInterface
{
    /**
     * @var ReturnFormat
     */
    public $return;
}