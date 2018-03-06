<?php
namespace cloudwise\tsb\datasource\base;

use cloudwise\tsb\datasource\constants\SQLKeyReToFunction;
use Illuminate\Database\Capsule\Manager;

/**
 * Class MysqlService
 *
 * @package cloudwise\tsb\datasource\base
 */
class MysqlService extends Service
{
    public $clientType = BusinessProvider::TYPE_PROVIDER_SERVICE_MYSQL;

    /**
     * @var Manager
     */
    public $client;
    /**
     * @var string
     */
    protected $table;

    /**
     * @var  string
     */
    protected $primaryKey;

    /**
     * @var array
     */
    protected $select = [];

    /**
     * @var int
     */
    protected $offset;

    /**
     * @var int
     */
    protected $limit;

    /**
     * @var int
     */
    protected $paginate;

    /**
     * @var int
     */
    protected $groupBy;

    /**
     * @var int
     */
    protected static $transactionsCount = 0;


    /**
     * @param array $aParams
     *
     * @return $this
     */
    public function Bind(array $aParams)
    {
        if (count($aParams) < 1) {
            return $this;
        }

        //没有进行 $oVO限定参数的 过滤
        foreach ($aParams as $key => $val) {
            $this->$key = $val;
        }

        return $this;
    }

    public function getTableName()
    {
        return $this->table;
    }

    public function getPrimaryKey()
    {
        return $this->primaryKey;
    }

    /**
     * @param array $aSelect
     */
    public function setSelect(array $aSelect)
    {
        $this->select = $aSelect;
    }

    public function setGroupBy($sField)
    {
        $this->groupBy = $sField;
    }

    public function getGroupBy()
    {
        if (is_null($this->groupBy)) {
            return '';
        }

        return $this->groupBy;
    }

    public function removeGroupBy()
    {
        $this->groupBy = null;
    }

    public function removeSelect()
    {
        $this->select = null;
    }

    /**
     * @param $oQuery \Illuminate\Database\Query\Builder
     *
     * @return mixed
     */
    public function getSelect(&$oQuery)
    {
        if (count($this->select) < 1) {
            return $oQuery;
        }

        foreach ($this->select as $column) {
            $oQuery->addSelect($column);
        }

        return $oQuery;
    }

    /**
     * 创建where条件.
     *
     * @param       $oQuery \Illuminate\Database\Query\Builder
     * @param array $aWhere
     *
     * @internal param array $request
     * @return mixed
     */
    public function mkWhere(&$oQuery, array $aWhere = [])
    {
        if (count($aWhere) < 1) {
            return $oQuery;
        }

        foreach ($aWhere as $column => $val) {
            $valType = gettype($val);
            $lowerColumn = strtolower($column);

            if ($valType == 'array') {
                foreach (SQLKeyReToFunction::$strToWhereFunctionForArray as $strKey => $function) {
                    if (strstr($lowerColumn, $strKey)) {
                        $oQuery->{$function}(self::getRealColumn($lowerColumn, $strKey), $val);
                        break;
                    }
                }
            } else {
                if (!strstr($lowerColumn, '?')) {
                    $oQuery->where($lowerColumn, $val);
                    continue;
                }

                //携带占位符号的
                foreach (SQLKeyReToFunction::$strToWhereFunctionForNormal as $strKey => $function) {
                    if (strstr($lowerColumn, $strKey)) {
                        if ($function == 'whereNull') {
                            $oQuery->whereNull(self::getRealColumn($lowerColumn, $strKey));
                        } else {
                            $oQuery->where(self::getRealColumn($lowerColumn, $strKey), trim($strKey), $val);
                        }

                        break;
                    }
                }
            }
        }

        return $oQuery;
    }

    /**
     * 简单的orWhere组装.
     *
     * @param       $oQuery \Illuminate\Database\Query\Builder
     * @param array $aOrWhere
     *
     * @return mixed
     */
    public function mkOrWhere(&$oQuery, array $aOrWhere = [])
    {
        if (count($aOrWhere) < 1) {
            return $oQuery;
        }

        foreach ($aOrWhere as $column => $val) {
            $valType = gettype($val);
            $lowerColumn = strtolower($column);

            if ($valType == 'array') {
                foreach (SQLKeyReToFunction::$strToWhereFunctionForArray as $strKey => $function) {
                    if (strstr($lowerColumn, $strKey)) {
                        $oQuery->{'or' . $function}(self::getRealColumn($lowerColumn, $strKey), $val);
                        break;
                    }
                }
            } else {
                if (!strstr($lowerColumn, '?')) {
                    $oQuery->where($lowerColumn, $val);
                    continue;
                }

                foreach (SQLKeyReToFunction::$strToWhereFunctionForNormal as $strKey => $function) {
                    if (strstr($lowerColumn, $strKey)) {
                        if ($function == 'whereNull') {
                            $oQuery->orWhereNull(self::getRealColumn($lowerColumn, $strKey));
                        } else {
                            $oQuery->orWhere(self::getRealColumn($lowerColumn, $strKey), trim($strKey), $val);
                        }

                        break;
                    }
                }
            }
        }

        return $oQuery;
    }

    /**
     * 组装order.
     *
     * @param       $oQuery \Illuminate\Database\Query\Builder
     * @param array $aOrder
     *
     * @return mixed
     */
    public function mkOrder(&$oQuery, array $aOrder = [])
    {
        if (count($aOrder) < 1) {
            return $oQuery;
        }

        foreach ($aOrder as $key => $val) {
            $oQuery->orderBy($key, $val);
        }

        return $oQuery;
    }

    /**
     * 设置limit.
     *
     * @param $offset
     * @param $limit
     */
    public function setLimit($offset, $limit)
    {
        if (is_numeric($offset) && $offset >= 0) {
            $this->offset = $offset;
        }
        if (is_numeric($limit) && $limit > 0) {
            $this->limit = $limit;
        }
    }

    /**
     * 组装limit.
     *
     * @param $oQuery \Illuminate\Database\Query\Builder
     *
     * @return mixed
     */
    public function getLimit(&$oQuery)
    {
        if (is_null($this->offset) || is_null($this->limit)) {
            return $oQuery;
        }

        return $oQuery->skip($this->offset)->take($this->limit);
    }

    /**
     * 设置分页.
     *
     * @param $pageNum
     */
    public function setPaginate($pageNum)
    {
        $this->paginate = (int)$pageNum;
    }

    /**
     * 执行分页操作.
     *
     * @param $oQuery \Illuminate\Database\Query\Builder
     *
     * @return mixed
     */
    public function getPaginate(&$oQuery)
    {
        if (is_null($this->paginate)) {
            return $oQuery;
        }

        return $oQuery->paginate($this->paginate);
    }

    /**
     * 检测是否存在.
     *
     * @param int|array $iPrimaryKeyOraWhere
     *
     * @return PrimaryKeyValue|bool
     */
    public function exists($iPrimaryKeyOraWhere)
    {
        switch (gettype($iPrimaryKeyOraWhere)) {
            case 'array':
                $oQuery = $this->client->table($this->table)->select($this->primaryKey);
                if (count($iPrimaryKeyOraWhere) > 0) {
                    self::mkWhere($oQuery, $iPrimaryKeyOraWhere);
                }
                $result = $oQuery->first();
                unset($oQuery);
                break;
            default:
                $result = $this->client->table($this->table)->where(
                    $this->primaryKey, '=', $iPrimaryKeyOraWhere)->first();
                break;
        }
        if ($result) {
            return $result->{$this->primaryKey};
        }

        return false;
    }

    /**
     * 插入数据.
     *
     * @param array $aData
     *
     * @return int
     */
    public function insert(array $aData)
    {
        if (count($aData) < 1) {
            return false;
        }
        if (is_array(reset($aData))) {
            return $this->client->table($this->table)->insert($aData);
        }

        return $this->client->table($this->table)->insertGetId($aData);
    }

    /**
     * 依条件更新.
     *
     * @param array     $aData
     * @param int|array $iPrimaryKeyOraWhere
     *
     * @return bool
     */
    public function update(array $aData, $iPrimaryKeyOraWhere)
    {
        if (count($aData) < 1) {
            return false;
        }

        $oQuery = $this->client->table($this->table);

        switch (gettype($iPrimaryKeyOraWhere)) {
            case 'array':
                self::mkWhere($oQuery, $iPrimaryKeyOraWhere);
                break;
            default:
                $oQuery->where($this->primaryKey, (int)$iPrimaryKeyOraWhere);
        }

        return $oQuery->update($aData);
    }

    /**
     * 依条件删除.
     *
     * @param array $aWhere
     *
     * @return int
     */
    public function delete(array $aWhere)
    {
        if (count($aWhere) < 1) {
            return false;
        }

        $oQuery = $this->client->table($this->table);
        self::mkWhere($oQuery, $aWhere);

        return $oQuery->delete();
    }

    /**
     * 依条件取得count值
     *
     * @param array $aWhere
     *
     * @return int
     */
    public function count(array $aWhere)
    {
        $oQuery = $this->client->table($this->table)->select($this->primaryKey);
        if (count($aWhere) >= 1) {
            self::mkWhere($oQuery, $aWhere);
        }

        $result = $oQuery->count();

        return $result;
    }

    /**
     * 依主键或条件，取得单条数据
     * 非数组且为int值时，判断为主键条件.
     *
     * @param $iPrimaryKeyOraWhere
     * @param $aOrder
     *
     * @return $this
     */
    public function fetchRow($iPrimaryKeyOraWhere = null, $aOrder = [])
    {
        switch (gettype($iPrimaryKeyOraWhere)) {
            case 'array':
                $oQuery = $this->client->table($this->table);

                if (count($iPrimaryKeyOraWhere) > 0) {
                    self::mkWhere($oQuery, $iPrimaryKeyOraWhere);
                }
                self::getSelect($oQuery);
                if ($groupBy = self::getGroupBy()) {
                    $oQuery->groupBy($groupBy);
                }
                if (count($aOrder) > 0) {
                    self::mkOrder($oQuery, $aOrder);
                }
                $result = $oQuery->first();
                unset($oQuery);
                break;
            default:
                $oQuery = $this->client->table($this->table);
                if ($iPrimaryKeyOraWhere) {
                    $oQuery->where($this->primaryKey, '=', $iPrimaryKeyOraWhere);
                }
                if (is_array($this->select) && $this->select) {
                    $oQuery->select($this->select);
                }

                if (count($aOrder) > 0) {
                    self::mkOrder($oQuery, $aOrder);
                }

                if ($groupBy = self::getGroupBy()) {
                    $groupBy = ' GROUP BY ' . $groupBy . ' ';
                    $oQuery->groupBy($groupBy);
                }

                $result = $oQuery->get();
                break;
        }

        if (is_null($result) || is_object($result)) {
            return $result;
        }

        if (array_key_exists(0, $result)) {
            return $result[0];
        }

        return $result;
    }

    /**
     * 依条件取得多条数据.
     *
     * @param array $aWhere
     * @param array $aOrWhere
     * @param array $aOrder
     *
     * @return array
     */
    public function fetchAll(array $aWhere = [], array $aOrWhere = [], array $aOrder = [])
    {
        $oQuery = $this->client->table($this->table);

        self::getSelect($oQuery);

        if (count($aWhere) > 0) {
            self::mkWhere($oQuery, $aWhere);
        }

        if (count($aOrWhere) > 0) {
            self::mkOrWhere($oQuery, $aOrWhere);
        }

        self::getLimit($oQuery);

        if (count($aOrder) < 1) {
            $aOrder = [
                $this->primaryKey => 'desc',
            ];
        }

        if (count($aOrder) > 0) {
            self::mkOrder($oQuery, $aOrder);
        }

        if ($groupBy = self::getGroupBy()) {
            $oQuery->groupBy($groupBy);
        }

        if (!is_null($this->paginate)) {
            $result = $this->getPaginate($oQuery);
        } else {
            $result = $oQuery->get();
        }

        return $result;
    }

    /**
     * 开启事务
     */
    public function transStart()
    {
        ++self::$transactionsCount;

        if (self::$transactionsCount == 1) {
            $this->client->getConnection()->beginTransaction();
        }
    }

    /**
     * 结束事务
     */
    public function transCommit()
    {
        if (self::$transactionsCount == 1) {
            $this->client->getConnection()->commit();
        }

        --self::$transactionsCount;
    }

    /**
     * 回滚事务
     */
    public function transRollBack()
    {
        if (self::$transactionsCount == 1) {
            self::$transactionsCount = 0;

            $this->client->getConnection()->rollBack();
        } else {
            --self::$transactionsCount;
        }
    }

    /**
     * 剔除占位符，操作符号 获取mysql column
     * column != ?  => column
     *
     * @param $column
     * @param $str_key
     *
     * @return string
     */
    private static function getRealColumn($column, $str_key)
    {
        return trim(str_replace(['?', $str_key], ['', ''], $column));
    }
}