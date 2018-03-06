<?php
use cloudwise\tsb\datasource\helper\ArrayHelper;
use cloudwise\tsb\datasource\base\ESService;


/**
 * @author bear
 * Date: 17/11/11 上午10:44
 */
class ArrayTest extends PHPUnit_YafTestCase
{
    /**
     * 获取方法的执行路径
     */
    public function testGetTreeRoute()
    {
        $tree = [
            1 => [
                2 => [],
                3 => [
                    4 => [
                        5 => [],
                    ],
                ],
            ],
        ];

        $result = [];
        ArrayHelper::getTreeRoute($result, $tree, 4);
        $this->assertEquals($result, [1 => [3 => [4 => []]]]);
    }

    /**
     * 获取数组所有键
     */
    public function testGetKeyList()
    {
        $tree = [1 => [3 => [4 => []]]];
        $result = [];
        ArrayHelper::getKeyList($result, $tree);
        $this->assertEquals($result, [1, 3, 4]);
    }

    /**
     * 用户多维度排序,默认排序
     */
    public function testOrderUserDefault()
    {
        $data = [
            ['a' => 1, 'b' => 2, 'c' => 3],
            ['a' => 2, 'b' => 3, 'c' => 4],
            ['a' => 2, 'b' => 4, 'c' => 4],
        ];

        ArrayHelper::sortByUser($data, 'b', 'desc');
        $expected = [
            ['a' => 2, 'b' => 4, 'c' => 4],
            ['a' => 2, 'b' => 3, 'c' => 4],
            ['a' => 1, 'b' => 2, 'c' => 3],
        ];

        $this->assertEquals(array_values($data), $expected);
    }

    /**
     * 用户多维度排序,按权重排序
     */
    public function testOrderUserByWeight()
    {
        $data = [
            ['a' => 1, 'b' => 2, 'c' => 3],
            ['a' => 2, 'b' => 3, 'c' => 4],
            ['a' => 2, 'b' => 4, 'c' => 4],
        ];

        ArrayHelper::sortByUser($data, 'b', 'desc', [2 => 5]);
        $expected = [
            ['a' => 1, 'b' => 2, 'c' => 3],
            ['a' => 2, 'b' => 4, 'c' => 4],
            ['a' => 2, 'b' => 3, 'c' => 4],
        ];

        $this->assertEquals(array_values($data), $expected);
    }

    /**
     * 对数组中的值进行替换
     */
    public function testReplace()
    {
        $data = [
            ['a' => 1, 'b' => 2, 'c' => 3],
            ['a' => 2, 'b' => 3, 'c' => 4],
            ['a' => 2, 'b' => 4, 'c' => 4],
        ];

        ArrayHelper::replaceDataValue($data, 'b', [2 => 4, 4 => 2]);
        $expected = [
            ['a' => 1, 'b' => 4, 'c' => 3],
            ['a' => 2, 'b' => 3, 'c' => 4],
            ['a' => 2, 'b' => 2, 'c' => 4],
        ];
        $this->assertEquals($data, $expected);
    }

    /**
     * 从二维数组截取一个字段
     */
    public function testExtract()
    {
        $data = [
            ['a' => 1, 'b' => 2, 'c' => 3],
            ['a' => 2, 'b' => 3, 'c' => 4],
            ['a' => 2, 'b' => 4, 'c' => 4],
        ];

        $result = ArrayHelper::extractFromArray(
            $data, 'b', function ($value) {
            return $value * 2;
        });
        $expected = [
            4,
            6,
            8,
        ];

        $this->assertEquals($result, $expected);
    }

    public function testExtractValue()
    {
        $data = [
            'order' => 'app_id',
            'sort'  => 'desc',
        ];

        //获取指定key的值
        $order = ArrayHelper::extractValueFromArray('order', $data);
        $this->assertEquals($order, 'app_id');

        //未获取指定key的值则返回默认值
        $page = ArrayHelper::extractValueFromArray('page', $data, 1);
        $this->assertEquals($page, 1);

        $params['order'] = 'app';

        $order_map = [
            'app'  => 'app_id',
            'time' => 'resp_time',
        ];

        //当key为数组时,将数组转化为key字符串
        $order = ArrayHelper::extractValueFromArray(['order', $params, 'app'], $order_map, 'resp_time');
        $this->assertEquals($order, 'app_id');

        //返回默认值
        $params['order'] = 'default';
        $order = ArrayHelper::extractValueFromArray(['order', $params, 'app'], $order_map, 'resp_time');
        $this->assertEquals($order, 'resp_time');
    }

    public function testMergeArray()
    {
        $aFirstArray = [
            'a' => [
                'b' => [
                    'c' => 1,
                ],
                'd' => 2,
            ],
        ];
        $aSecondArray = [
            'a' => [
                'b' => [
                    'c' => 2,
                    'g' => 5,
                ],
            ],
            'f' => 3,
        ];

        $expected = [
            'a' => [
                'b' => [
                    'c' => 2,
                    'g' => 5,
                ],
                'd' => 2,
            ],
            'f' => 3,
        ];

        $this->assertEquals($expected, ArrayHelper::mergeArray($aFirstArray, $aSecondArray));
    }
}