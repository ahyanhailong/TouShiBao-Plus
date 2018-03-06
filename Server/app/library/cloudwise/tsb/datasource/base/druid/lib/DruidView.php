<?php
/**
 * Class DruidView
 */

namespace cloudwise\tsb\datasource\base\druid\lib;

class DruidView
{
    /**
     * @var string 模板路径
     */
    protected $path = "";

    /**
     * @var
     */
    protected $ext = "json.tpl";


    /**
     * @var array $data
     */
    protected $data = [];

    /**
     * DruidView constructor
     *
     * @param array $configs
     *
     */
    public function __construct(array $configs)
    {
        if (isset($configs['path'])) {
            $this->setPath($configs['path']);
        }

        if (isset($configs['ext'])) {
            $this->setExt($configs['ext']);
        }
    }

    /**
     * 获取当前扩展名
     *
     * @return string
     */
    public function getExt()
    {
        return $this->ext;
    }


    /**
     * 获取视图目录路径
     *
     * @return string
     */
    public function getPath()
    {
        return $this->path;
    }

    /**
     * 设置视图目录路径
     *
     * @param string $path 文件路径
     *
     * @throws DruidException
     * @return DruidView
     */
    protected function setPath($path)
    {
        if (!file_exists($path)) {
            throw new DruidException(
                "View path:$path Not found", DruidException::ERROR_TYPE_VIEW);
        }
        $this->path = $path;

        return $this;
    }

    /**
     * 渲染模板
     *
     * @param string $viewContent 视图内容
     *
     * @throws DruidException
     * @retun array
     */
    public function render($viewContent)
    {
        try {

            $viewString = \JsonNet::evaluateSnippet($viewContent);

        } catch (\Exception $e) {
            throw new DruidException(
                $e->getMessage(), DruidException::ERROR_TYPE_VIEW

            );
        }

        return $viewString;
    }

    /**
     * 获取JsonNetString
     *
     * @param string $tplName 模板名称
     * @param array  $params  参数数组
     *
     * @return string
     */
    public function getViewContent($tplName, array $params)
    {
        $file = $this->getTemplateFile($tplName);
        ob_start();
        ob_implicit_flush(false);
        require "$file";

        return ob_get_clean();
    }

    /**
     * 设置视图扩展后缀
     *
     * @param string $ext 文件扩展
     *
     * @return DruidView
     */
    protected function setExt($ext)
    {
        if (is_string($ext)) {
            $this->ext = ltrim($ext, ".");
        }

        return $this;
    }


    /**
     * 获取模板真实路径.
     *
     * @param string $tplName 模板名称
     *
     * @throws DruidException
     *
     * @return string
     */
    protected function getTemplateFile($tplName)
    {
        $fileName = $this->getPath() . DIRECTORY_SEPARATOR . rtrim($tplName, DIRECTORY_SEPARATOR);

        if (pathinfo($fileName, PATHINFO_EXTENSION) == '') {
            $fileName .= '.' . $this->getExt();
        }

        if (!file_exists($fileName)) {
            throw new DruidException(
                "Query template file not found: $fileName", DruidException::ERROR_TYPE_VIEW);
        }

        return $fileName;
    }
}