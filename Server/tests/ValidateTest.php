<?php
use cloudwise\tsb\datasource\helper\ValidHelper;

/**
 * Created by PhpStorm.
 * User: Bear
 * Date: 17/10/29
 * Time: 下午7:43
 */

class Validate extends PHPUnit_YafTestCase
{
    public function testEmail()
    {
        $input = 'bear@yunzhihui.com';
        $this->assertEquals(ValidHelper::validEmail($input), true);
    }

    public function testLength()
    {
        $input = 'bear@yunzhihui.com';
        $this->assertEquals(ValidHelper::validLength($input, 10, 20), true);
    }

    public function testArray()
    {
        $input = 'bear@yunzhihui.com';
        $this->assertEquals(ValidHelper::validArray($input), false);
    }
    
    public function testMobile()
    {
        $input = '15811076475';
        $this->assertEquals(ValidHelper::validMobile($input), true);
    }
}