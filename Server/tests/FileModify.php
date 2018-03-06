<?php

use cloudwise\tsb\datasource\helper\FileHelper;

/**
 * @author bear
 * Date: 17/11/30 下午2:47
 */

class FileModify extends PHPUnit_YafTestCase
{
    public function testInit()
    {
        $dir = APPLICATION_PATH . '/app/library/cloudwise/tsb/datasource/template';
        $files = FileHelper::getDirFiles($dir);

        foreach($files as $file){
            $file_info = pathinfo($file);
            if($file_info['extension'] == 'json'){
                @rename($file, $file.'net');
            }
        }

    }
}