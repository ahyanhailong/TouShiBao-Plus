   /**
   *
   * 界面自适应屏幕宽度代码
   * @author  jenny
   */
sizeAdaptation();
$(window).resize(function(){
    sizeAdaptation();
});
/**
   * 需要在html上增加 class = page-content-adapt-ui 特殊属性
   */
function sizeAdaptation(){
	//特殊页面 不执行
	var except =[
        '/login'
	];
	var pathName = window.location.href.split('#')[1];
	if($.inArray(pathName,except) >= 0){
		return false;
	}
    // var bodyWidth = document.body.clientWidth;
    var bodyWidth = document.documentElement.clientWidth;
    var clientHeight = document.documentElement.clientHeight;
    // var clientHei = $('.page-content-adapt-ui').height();
    if(bodyWidth<1200){
        $('html').css({
            'transform': 'scale('+bodyWidth/1366+')',
            'transform-origin': 'top left',
            'width':'1366px',
            'overflow':'hidden'
        })
        // $('.page-content-adapt-ui').css({
        //     'height':clientHei*(bodyWidth/1366),
        //     'overflow':'auto'
        // })
        $('.page-content-adapt-ui').css({
            'height':clientHeight/(bodyWidth/1366),
            'overflow':'auto'
        })
    }else{
        $('html').css({
            'transform': 'none',
            'transform-origin': 'top left',
            'width':'auto',
            // 'overflow':'auto'
        })
        $('.page-content-adapt-ui').css({
            'height':'auto',
            'overflow':'visible'
        })
    }
} 