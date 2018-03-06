/**
 * 复选框筛选过滤事件
 * 触发：筛选复选框
 */
$('input[data-oncheck]:checkbox').change(function(){
    var checked = $(this).prop('checked');
    var type = $(this).data('oncheck');
    var target = $(this).data('target');

    var $items = $('[data-item="'+target+'"]');

    var ok = $(this).trigger('oncheck',{checked:checked,oncheck:type,target:target,items:$items});
    if(ok){
        if(type == 'itemshow'){
            checked ? $items.show() : $items.hide();
        }else{
            checked ? $items.hide() : $items.show();
        }
    }

});
