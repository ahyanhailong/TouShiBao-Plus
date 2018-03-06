 /**
 * 排序事件
 * 触发：orderby按钮点击时
 * 绑定元素： table
 */
$(document).delegate('table th[data-item]:has(i.fa-sort)','click',function(){
    var $th = $(this);
    var $i = $th.find('i.fa-sort');
    var $table = $i.parents('table');
    var order = $th.data('item');
    var sort = $i.hasClass('fa-sort-desc') ? 'asc' : 'desc';


    $table.data('order',order).data('sort',sort);
    $table.trigger('orderby',{element:$(this),icon:$i,sort:sort,orderby:order});
    //恢复同类样式
    $table.find('th i.fa-sort-desc,th i.fa-sort-asc').removeClass('fa-sort-desc').removeClass('fa-sort-asc');
    //添加样式
    $i.addClass('fa-sort-'+sort);
});

/**
 * 添加默认排序
 */
$('table:has(i.fa-sort-desc,i.fa-sort-asc)').each(function(){
	if($(this).find('i.fa-sort-desc')){
		$(this).data('order',$(this).find('th:has(i.fa-sort-desc)').data("item"));
		$(this).data('sort',"desc");
	}else if($(this).find('i.fa-sort-asc')){
		$(this).data('order',$(this).find('th:has(i.fa-sort-asc)').data("item"));
		$(this).data('sort',"asc");
	}
});
/**
 * 键盘按下事件
 * 触发：键盘按下时
 * 绑定元素：this
 */
$(document).delegate('[data-onkey]','keypress',function(event){
    var keyCode = $(this).data('onkey');
    if(keyCode){
        if(event.keyCode == keyCode){
            $(this).trigger('onkey',keyCode);
        }
    }else{
        $(this).trigger('onkey',keyCode);
    }

});
 //左侧展开代码
 // $(document).delegate('.tsb-dropDown-title','click',function(){
 //     var $self = $(this).find("i.caret-i");
 //     if($self.hasClass('caret-down')){
 //         $self.removeClass('caret-down').addClass('caret-up');
 //     }else{
 //         $self.removeClass('caret-up').addClass('caret-down');
 //     }
 // });
 //左侧展开代码
 $(document).delegate('.tsb-dropDown-title i.caret-i','click',function(){
     var $self = $(this);
     if($self.hasClass('caret-down')){
         $self.removeClass('caret-down').addClass('caret-up');
     }else{
         $self.removeClass('caret-up').addClass('caret-down');
     }
 });

var getInputRealValue = function(input){
	var placeholder = input.attr('placeholder');
	if(input.val() == placeholder){
		return '';
	}

	return input.val().trim();
}
function getIntShot(number)
    {
        if(number < 1000){
            return number;
        }else if(number < 1000000){
            number = parseInt(number / 10) / 100;
            return number + 'k';
        }else if(number < 1000000000){
            number = parseInt(number / 10000) / 100;
            return number + 'b';
        }else{
            number = parseInt(number / 10000000) / 100;
            return number + 't';
        }
    }

    function getTimeShot(number){
        if(number < 1000){
            return number + 'ms';
        }
        number = parseInt(number / 10) / 100;
        return number + 's';
    }

 // 阻止事件传播, 否则在点击复选框的时候，dropdown-menu会立即隐藏
 $(document).delegate(".dropdown-menu[tsb-noclick ='true']","click",function(e){
     e.stopPropagation();
 })