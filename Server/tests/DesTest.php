<?php
use cloudwise\tsb\datasource\helper\DESHelper;

/**
 * @author ciogao@gmail.com
 * Date: 17/11/10 下午6:19
 */
class DesTest extends PHPUnit_YafTestCase
{

    public function testInit()
    {
        $this->evalTest();
    }

    public function evalTest(){
        $params = [
            'name1'=>[
                'name2'=>[
                    'name3'=>'val',
                ],
            ],
        ];
        $path = $params[name1][name2];
//        $path = explode('$$',$path);
//dd($path);
        $data = $path;
        dd($data);
    }

}