MyApp.service('KBdefaultService',['$http','httpService',function($http,httpService){
    var self = this
    var host=env_config.HOST_ADDRESS
    this.respon=''
    //API
    this.key_transaction_list = env_config.API.key_transaction_list.KEY_TRANSACTION_LIST  //关键事务列表
    //删除关键事务
    this.delete_transaction = env_config.API.key_transaction_list.DELETE_TRANSACTION

    //获取事务列表
    this.businessList = function(dataSource){
        var URL = this.key_transaction_list
        return httpService.get(URL,dataSource).then(function (respon) {
            return respon
        })

    }
    this.deleteTransaction = function (dataSource,callback) {

        var URL = self.delete_transaction
        return httpService.get(URL,dataSource).then(function (respon) {
            return respon
        })
        // $http.get(URL,{params:dataSource}).then(function (respon) {
        //
        //     if(typeof callback == 'function'){
        //         callback(respon)
        //     }
        // })
    }
}])