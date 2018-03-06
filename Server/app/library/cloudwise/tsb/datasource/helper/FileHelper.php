<?php
/**
 * @author bear
 * Date: 17/11/30 下午3:05
 */

namespace cloudwise\tsb\datasource\helper;


class FileHelper
{
    /**
     * 获取目录中所有的文件路径
     *
     * @param $dir
     *
     * @return array
     */
    public static function getDirFiles($dir)
    {
        rtrim($dir, '/');
        $return = [];
        if (is_dir($dir)) {
            $resource = opendir($dir);
            while (($file = readdir($resource)) != false) {
                if ($file == '.' || $file == '..') {
                    continue;
                }
                $path = $dir . '/' . $file;
                if (is_dir($path)) {
                    $return = array_merge($return, self::getDirFiles($path));
                } else {
                    $return[] = $path;
                }
            }
            closedir($resource);
        } else {
            if (is_file($dir)) {
                $return[] = $dir;
            }
        }

        return $return;
    }
}