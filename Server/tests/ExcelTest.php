<?php
/**
 * @author bear
 * Date: 17/11/24 下午2:20
 */
use \cloudwise\tsb\datasource\base\PHPExcelService;

class ExcelTest extends PHPUnit_YafTestCase
{
    public function testExcel()
    {
        $title = [
            'order',
            'crash_name',
            'time_min',
            'time_max',
            'version',
            'count',
            'device_influenced_num',
            'status'
        ];
        $file_name = '/data/htdocs/TouShiBao-Plus/Frontend/public/static/report/test'. '_' . date('Y-m-d', time()) . '.xlsx';

        PHPExcelService::instance()->setCellTitle($title);
        PHPExcelService::instance()->setTitle('This is Title');
        PHPExcelService::instance()->outPutExcel($file_name);
    }
}