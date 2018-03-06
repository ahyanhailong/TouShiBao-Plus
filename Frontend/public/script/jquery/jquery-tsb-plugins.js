$.fn.showLoading = function (type) {
    if(type == 'hide' || type == false){
        $(this).removeClass('loading');
    }else{
        $(this).removeClass('nodata').addClass('loading');
    }
    return $(this);
};
$.fn.showNoData = function (type) {
    if(type == 'hide' || type == false){
        $(this).removeClass('nodata');
    }else{
        $(this).removeClass('loading').addClass('nodata');

    }
    return $(this);
};

$.fn.table = function(setopt){


    function createTable(table,data,loop,max){
        $(table).find('tbody').remove();
      var tbody = $('<tbody></tbody>');
        var ths = $(table).find('thead:last-of-type th');

        for(var i = 0;i<data.length;i++){
          //限制行数
            if(max > 0 && i>=max){
                break;
            }

            var tr = $('<tr></tr>');

            $(ths).each(function(){
                if($(this).index() == 0 && $(this).data('order') != undefined){
                    name = '_order';
                    var value  = parseInt(i)+1;
                }else{
                    var name = $(this).data('item');
                    var value = data[i][name];
                }
                var tip = $(this).data('tip');
                tip = tip == undefined ? '' : tip;

                var td = "";
                if(typeof loop == "function"){
                    td = loop({key:name,value:value,th:$(this),tr:$(tr),index:i,tip:tip},data[i],data);
                }
                if(!td || td == "undefined"){
                    td = loopTable({key:name,value:value,th:$(this),tr:$(tr),index:i,tip:tip},data[i],data);
                }

                $(tr).append(td);
            });
            $(tbody).append(tr);
        }
        $(table).append(tbody);

    }
    function loopTable(item){
        if(item.value == undefined){
            item.value = '';
        }
        return '<td>'+item.value+' '+item.tip+'</td>';
    }
    $(this).unbind('orderby');
    $(this).on('orderby',function(){
        $(this).table(setopt);

    });

    return $(this).each(function(){
        var self = $(this);
        var content = self.find('[data-table]');
        var table = content.find('table');

        try{

            if($(table)[0].tagName != 'TABLE'){
                console.error('只能在表格中使用');
                return false;
            }
            $(table).find('tbody').remove();
            $(content).showLoading();

            if(typeof setopt == 'function'){
                var opt = setopt($(self));
            }else{
                var opt = setopt;
            }
            opt = $.extend({
                max:-1
            },opt);
            if(typeof opt.data == 'function'){
                var sort = $(table).data('sort');
                var order = $(table).data('order');
                var dataSource = opt.data(sort,order);
            }else{
                var dataSource = opt.data;
            }


            if(typeof dataSource.url != 'undefined'){
                $.ajax({
                    url:dataSource.url,
                    data:dataSource.data,
                    method:dataSource.method,
                    dataType:'json',
                    success:function(data){
                        if(typeof dataSource.success == 'function'){
                            data = dataSource.success(data);
                        }
                        if(typeof data != 'object' || data.length < 1){
                            $(content).showNoData();
                            $(content).siblings('.PageList').hide()
                            if(typeof opt.done == 'function'){
                                opt.done(table);
                            }
                            return false;
                        }
                        $(content).siblings('.PageList').show()

                        createTable(table,data,opt.loop,opt.max);
                        $(content).showLoading('hide').showNoData('hide');
                        if(typeof opt.done == 'function'){
                            opt.done(table);
                        }
                    }
                });
            }else{
                if(typeof dataSource != 'object' || dataSource.length < 1){
                    if(typeof opt.done == 'function'){
                        opt.done(table);
                    }
                    $(content).showNoData();
                    return false;
                }

                createTable(table,dataSource,opt.loop,opt.max);
                $(content).showLoading('hide').showNoData('hide');
                if(typeof opt.done == 'function'){
                    opt.done(table);
                }
            }
        }catch (error){
            console.log(error.message);
            $(content).showNoData();
        }



    });

}