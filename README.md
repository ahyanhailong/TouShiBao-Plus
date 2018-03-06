# TouShiBao-Plus
TouShiBao-Plus. API &amp; Data Wrapper &amp; Portal


## 添加本地配置文件
 - 将conf_back文件复制命名为conf并按照环境修改配置文件中的内容

## 修改php.ini添加配置
 - yaf.use_namespace = 1
 - yaf.environ = dev/qa/product

## 重启php-fpm
 - killall php-fpm
 - /path/to/php-fpm

## sql:
 - ALTER TABLE `account_expire_setting` CHANGE COLUMN `account_id` `account_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;
 - ALTER TABLE `db_test`.`company_info` CHANGE COLUMN `account_id` `account_id` int(11) NOT NULL AUTO_INCREMENT;

## nginx配置添加
```
    server {
            listen       80;
            server_name  dev-plus.toushibao.com;
    
            location / {
                    root        /data/www/toushibao/Frontend/;
                    try_files   $uri $uri/ /index.html$is_args$args;
                    index       index.html;
            }
    
            location /api/ {
                    root  /www/toushibao/Server/public/;
                    index index.php;
                    try_files $uri $uri/ /index.php$is_args$args;
            }
    
            location ~ .php$ {
                    root  /data/www/toushibao/Server/public/;
                    fastcgi_pass   127.0.0.1:9000;
                    fastcgi_index  index.php;
                    fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
                    include        fastcgi_params;
            }
    }
```

## 单元测试
```
cd /data/www/TouShiBao-Plus/Server/
phpunit tests/demoTest.php
```

## 前端访问 
 - http://portal-dev.toushibao.com/index.php
 
 
## 路由管理
路由配置的位置为Server/conf/route
三级路由使用默认的module/controller/action,不用添加新的路由配置
范例

```
[routes]
dbList.type="regex"
dbList.match="#^/application/web/db/dblist#"
dbList.route.controller=appWebDatabaseController
dbList.route.action=dbList
```