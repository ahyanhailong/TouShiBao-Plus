MyApp.service('applyListService',['$http','httpService',function ($http,httpService) {

    var self = this
    //API
    //获取应用列表
    this.get_app_list = env_config.API.apply_list.GET_APP_LIST
    //获取应用列表状态
    this.get_app_health_status = env_config.API.apply_list.GET_APP_HEALTH_STATUS
    //获取应用主机列表
    this.get_host_list = env_config.API.apply_list.GET_HOST_LIST
    //设置应用状态 启动/暂停
    this.set_app_status = env_config.API.apply_list.SET_APP_STATUS
    //创建分组
    this.create_app_group = env_config.API.apply_list.CREATE_APP_GROUP
    //应用分组列表
    this.get_app_group =  env_config.API.apply_list.GET_APP_GROUP
    //更新应用分组
    this.update_app_group = env_config.API.apply_list.UPDATE_APP_GROUP
    //删除应用分组
    this.delete_app_group = env_config.API.apply_list.DELETE_APP_GROUP
    //加入分组
    this.set_app_group = env_config.API.apply_list.SET_APP_GROUP
    //获取分组里的应用
    this.get_group_app = env_config.API.apply_list.GET_GROUP_APP
    //设置分组里应用名
    this.set_app_name = env_config.API.apply_list.SET_APP_NAME
    //一键暂停
    this.pause_app = env_config.API.apply_list.PAUSE_APP
    //删除分组里应用
    this.delete_app_from_group = env_config.API.apply_list.DELETE_APP_FROM_GROUP

    //获取应用列表
    this.getAppList = function (dataSource,callback) {
        var URL = self.get_app_list
        return httpService.get(URL,dataSource).then(function (respon) {
            return respon
        })
        // $http.get(URL,{params:dataSource}).then(function (respon) {
        //     if(typeof callback == 'function'){
        //         callback(respon.data)
        //     }
        // })
    }
    //获取应用列表状态
    this.getAppHealthStatus = function (dataSource,callback) {
        var URL = self.get_app_health_status
        $.ajax({
            type: "get",
            url: URL,
            async: true,
            data: dataSource,
            success : function (respon) {
                if(typeof callback == 'function'){
                    callback(respon.data)
                }
            }
        })
        
    }
    //获取应用主机列表
    this.getHostList = function (dataSource,callback) {
        var URL = self.get_host_list
        $.ajax({
            type: "get",
            url: URL,
            async: true,
            data: dataSource,
            success : function (respon) {
                if(typeof callback == 'function'){
                    callback(respon.data)
                }
            }
        })
    }
    //设置应用列表状态
    this.setAppStatus = function (dataSource,callback) {
        var URL = self.set_app_status
        $.ajax({
            type: "get",
            url: URL,
            async: true,
            data: dataSource,
            success : function (respon) {
                if(typeof callback == 'function'){
                    callback(respon)
                }
            }
        })
    }
    //新建分组
    this.addNewGroup = function (dataSource) {
        var URL = self. create_app_group
        return httpService.get(URL,dataSource).then(function (respon) {
            return respon
        })
    }
    //获取应用分组列表
    this.getAppGroup = function (dataSource,callback) {
        var URL = self.get_app_group
        return httpService.get(URL,{}).then(function (respon) {
            return respon
        })

    }
    //更新应用分组
    this.updataAppGroup = function (dataSource,callback) {
        var URL = self.update_app_group
        return httpService.get(URl,dataSource).then(function (respon) {
            return respon
        })
    }
    //删除应用分组
    this.deleteAppGroup = function (dataSource) {
        var URL = self.delete_app_group
        return httpService.get(URL,dataSource).then(function (respon) {
            return respon
        })
    }
    //加入分组
    this.setAppGroup = function (dataSource,callback) {
        var URL = self.set_app_group
        $.ajax({
            type: "get",
            url: URL,
            async: true,
            data: dataSource,
            success : function (respon) {
                if(typeof callback == 'function'){
                    callback(respon)
                }
            }
        })

    }
    //获取分组里的应用
    this.get_Group_App = function (dataSource) {
        var URL = self.get_group_app
        return httpService.get(URL,dataSource).then(function (respon) {
            return respon
        })

    }
    //设置分组里应用名
    this.setAppName = function (dataSource) {
        var URL = self.set_app_name
        return httpService.get(URL,dataSource).then(function (respon) {
            return respon
        })
        
    }
    //一键暂停
    this.pauseApp = function (dataSource,callback) {
        var URL = self.pause_app
        return httpService.get(URL,dataSource).then(function (respon) {
            return respon
        })
       
    }
    //删除分组里的应用
    this.deletGroupApp = function (dataSource,callback) {
        var URL = self.delete_app_from_group
        return httpService.get(URL,dataSource).then(function (respon) {
            return respon
        })

    }


}])