/**
 * Created by Happily on 17/12/18.
 */
MyApp.controller('plugin', ['$scope', '$rootScope','pluginService', function ($scope,$rootScope,service) {
    $rootScope.sideBarKey = 'plugin'

    $('#btn-save').click(function () {
        $('.form-horizontal').hide();
        $('.finish-state').show();
    })

    $scope.filter ={}
    $scope.page_no = 1
    $scope.total_row = ''
    $scope.sum_per_page = '5'
    //全选
    $scope.checkedAll = true
    $scope.InputFilter = '全部'
    //获取过滤插件列表
    service.getPluginList().then(function (respon) {
        $scope.pluginList = respon.data
    })
    //点击全选
    $scope.clickAllChecked = function () {
        var chenckInput = $('#FilterPlugin input[type=checkbox]')
        if($scope.checkedAll){
            for(i=0;i<chenckInput.length;i++){
                if($(chenckInput[i]).prop('checked')){
                    var key = $(chenckInput[i]).attr('filter-key')
                    var val = $(chenckInput[i]).attr('filter-value')
                    $scope.filter[key] = val
                }
            }
        }else{
            $scope.filter ={}
        }
    }
    //点击复选框
    $scope.CheckedClick = function (event,info) {
        if($(event.currentTarget).prop('checked')){
            if(!$scope.filter[info[0]]){
                $scope.filter[info[0]] = info[1]
            }
        }else{
            $('#allChecked').prop('checked',false)

            delete $scope.filter[info[0]]
        }
        var str=''
        $.each($scope.filter,function (key,val) {
            str+=val+','
        })
        if(str.length > 20){
            str=str.substring(0,15) +'.....'
        }
        $scope.checkedList = str
    }
    $scope.$watchGroup(['checkedAll'],function (newVal,oldVal) {
        console.log(newVal,oldVal)
        if(newVal[0]){
            $scope.checkedList = '全部'
        }else{
            $scope.checkedList = ''
        }
    })
    
    $scope.filterSure = function () {
        $scope.InputFilter = $scope.checkedList
        $scope.dataSource = {
            filter:$scope.filter
        }
        PluginList($scope.dataSource)
        $('#btnSelect').trigger('click')
    }
    $scope.cancel = function () {
        $('#btnSelect').trigger('click')
    }
    $scope.reset = function () {
        $scope.checkedAll = false
        $('#FilterPlugin input[type=checkbox]').prop('checked',false)
    }

    function PluginList(dataSource) {
        service.pluginPanelList(dataSource,function (respon) {
            console.log(respon)
            $scope.pluginData = respon.data
            $scope.total_row = respon.data.total_items
            $scope.$apply()
        })
    }
   function searchPlugin() {
       var name = $('#searchName').val()
       $scope.dataSource={
           name:name,
           page :1
       }
       PluginList( $scope.dataSource)
   }

    $scope.changeSqlList = function(currentPage,perPage){
        $scope.page_no = currentPage
        $scope.dataSource = {
            page : $scope.page_no
        }
        PluginList($scope.dataSource)
    }
    $('#searchName').on('onkey',function () {
        searchPlugin()
    })
    $scope.searchPlugin = function () {
        searchPlugin()
    }

}])

MyApp.service('pluginService',['httpService',function (httpService) {

    var self = this
    this.get_plugin_panel_list = env_config.API.PluginPanel.GET_PLUGIN_PANEL_LIST
    this.get_plugin_list= env_config.API.PluginPanel.GET_PLUGIN_LIST

    this.getPluginList = function (dataSource) {
        var URL = self.get_plugin_list
        return httpService.get(URL,dataSource).then(function (respon) {
            return respon
        })
    }

    this.pluginPanelList = function (dataSource,callback) {
        var URL = self.get_plugin_panel_list
        // return httpService.get(URL,dataSource).then(function (respon) {
        //     return respon
        // })
        $('#pluginPanel').table({
            data: function (sort, order) {
                dataSource.sort = sort;
                dataSource.order = order;
                return {
                    url: URL,
                    data: dataSource,
                    method: 'get',
                    success: function (result) {
                        if(typeof callback == 'function'){
                            callback(result)
                        }
                        return result.data.list;
                    }
                }
            },
            loop: function (item, tr) {

                if (item.key == 'host_type') {
                    var type
                    switch (tr.host_type){
                        case 1 : type = 'icon-linux';break;
                        case 2 : type = 'icon-windows';break;
                        case 3 : type = 'icon-aix';break;
                    }
                   return '<td class="text-center"><i class="'+ type +'" ></i></td>';

                }else if(item.key == 'ram_rate' || item.key == 'cpu_rate' || item.key == 'wait'){
                    return '<td class="progress-td"><div class="col-md-8"><div class="progress progress-small-s"><div class="progress-bar progress-bar-deepBlue" style="width:'+ tr.cpu_rate +'%"></div></div></div><div class="col-md-4">'+ tr.cpu_rate +'%</div></td>';
                }else if(item.key == 'service_type'){
                    var str = ''
                    $.each(tr.service_type,function (key,val) {
                        str +=' <span class="btn btn-black border-radius20 text-ellipsis">'+ key+ ' (' + val +')</span>'
                    })
                    return str
                }
            }
        })
        
    }

}])