<?php
/**
 * Class DruidLibException
 */
namespace cloudwise\tsb\datasource\base\druid\lib;

class DruidException extends \Exception
{
    const ERROR_TYPE_BASE = 9001;
    const ERROR_TYPE_VIEW = 9002;
}