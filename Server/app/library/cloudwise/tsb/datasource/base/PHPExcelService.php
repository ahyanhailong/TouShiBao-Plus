<?php
namespace cloudwise\tsb\datasource\base;

/**
 * Created by PhpStorm.
 * User: jimmy
 * Date: 16/6/2
 * Time: 下午7:54
 */
class PHPExcelService
{
    private static $self = NULL;

    /**
     * @var \PHPExcel
     */
    private $objPHPExcel;

    private $title;

    private $sheetActiveIndex = 0;

    public static function instance()
    {
        if (self::$self == NULL) {
            self::$self = new self();
        }

        return self::$self;
    }
    public function __construct(){
        $this->objPHPExcel = new \PHPExcel();
    }
    public static $cellTitle = array(
        'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'
    );


    public function initPdf($report_info,$values)
    {

    }

    /**
     * 设置Excel 表头
     * @param array $option  表头数组列
     * @param int   $step    表头起始位置
     */
    public function setCellTitle(array $option,$step = 1){

        $count = count($option);
        $this->title = array_slice(self::$cellTitle,0,$count);
        for ($i = 2; $i <= $count+1; $i++) {
            $this->objPHPExcel->getActiveSheet()->setCellValue($this->title[$i-2] . $step, $option[$i-2]);
        }
    }

    /**
     * 设置Excel 数据
     * @param array $date      数据
     * @param array $titleKet  对应表头顺序的数据字段
     * @param int   $step      数据开始位置
     */
    public function setCellValue(array $date, array $titleKet,$step =2){
        foreach($date as $k=>$v){
            $values = array_values($v);
            foreach($values as $key=>$val){
                if(!isset($titleKet[$key])){
                    continue;
                }
                $this->objPHPExcel->getActiveSheet()->setCellValue($this->title[$key] . ($step+$k), self::convertUTF8($v[$titleKet[$key]]));
                $this->objPHPExcel->getActiveSheet()->getStyle($this->title[$key] . ($step+$k))->getAlignment()->setHorizontal(\PHPExcel_Style_Alignment::HORIZONTAL_LEFT);
            }
        }
    }

    /**
     * 设置sheet 当前sheet名称
     * @param $title
     */
    public function setTitle($title){

        if($this->sheetActiveIndex){
            $this->objPHPExcel->createSheet();
        }
        $this->objPHPExcel->setActiveSheetIndex($this->sheetActiveIndex++);
        $this->objPHPExcel->getActiveSheet()->setTitle($title);
    }
    public function convertUTF8($str)
    {
        if(empty($str)) return '0';
        return  iconv('utf-8', 'utf-8', $str);
    }



    public function outPutExcel($file_name)
    {
        $objWriter = new \PHPExcel_Writer_Excel2007($this->objPHPExcel);
//或者$objWriter = new PHPExcel_Writer_Excel5($objPHPExcel); 非2007格式
        $objWriter->save($file_name);
    }
}