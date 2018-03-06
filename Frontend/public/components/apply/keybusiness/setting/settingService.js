MyApp.service('settingService',['$http','httpService',function ($http,httpService) {

    var self =this
    //API
    //创建关键事务
    this.create_key_transaction = env_config.API.key_transaction_list.CREATE_KEY_TRANSACTION
    //查询事务列表
    this.get_setting_uri_list = env_config.API.key_transaction_list.GET_SETTING_URI_LIST
    //获取关键事务配置信息
    this.get_single_transaction_data = env_config.API.key_transaction_list.GET_SINGLE_TRANSACTION_DATA
    //编辑关键事务
    this.update_transaction = env_config.API.key_transaction_list.UPDATE_TRANSACTION
    //获取关键事务信息
    this.getUriMsg = function (dataSource) {
        var URL = self.get_single_transaction_data
        return httpService.get(URL,dataSource).then(function (respon) {
            return respon
        })
    }
    //获取请求列表
    this.getUriList = function (dataSource,callback) {
        var URL = self.get_setting_uri_list
        return httpService.get(URL,dataSource).then(function (respon) {
            return respon
        })
    }
    //创建关键事务
    this.creatKeyTransaction = function (dataSource) {
        var URL =self.create_key_transaction
        return httpService.get(URL,dataSource).then(function (respon) {
            return respon
        })

    }
    //编辑关键事务
    this.updateKeyTransaction = function (dataSource) {
        var URL = self.update_transaction
        return httpService.get(URL,dataSource).then(function (respon) {
            return respon
        })
    }

}])