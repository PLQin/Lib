

/*
* 通过按钮,进行无缝切换的轮播(没有setInterval)
* @_element documentElementObject 轮播box
* @_prev	documentElementObject 点击向上翻页
* @_next    documentElementObject 点击向下翻页
* 推荐的轮播目录为:
* div
* 	ul(@_element)>li
* 	@_prev
* 	@_next
* */
function SeamlessShuffling(_element,_prev,_next) {
    var a = 0,
        _a = 0,// 初始前一个索引
        _element_li_index = _element.find("li").length - 1; // 获得轮播box的对应index数目
    _element.find("li").click(function(){
        a = $(this).index(); // index() 方法获取索引, 当前的索引
        if(a>_a){
            _element.find("li").eq(a).css("left","100%") ;
            _element.find("li").eq(a).animate({left : "0px"},300) ;
            _element.find("li").eq(_a).animate({left : "-100%"},300);
            _a = a;
        }else if(a<_a){
            _element.find("li").eq(a).css("left","-100%") ;
            _element.find("li").eq(a).animate({left : "0px"},300) ;
            _element.find("li").eq(_a).animate({left : "100%"},300);
            _a = a;
        }
        console.log(a)
    });
    // 点击右边的按钮, 轮播向左运动
    _next.click(function(){
        a++;
        if(a>_element_li_index){
            a = 0;
        };
        _element.find("li").eq(a).css("left","100%") ; // css方法设定的属性马上执行; 就算有动画也会马上执行
        _element.find("li").eq(a).animate({left : "0px"},300) ;
        _element.find("li").eq(_a).animate({left : "-100%"},300);
        _a = a;
    });

    // 点击左边的按钮, 轮播向右运动
    _prev.click(function(){
        a--;
        if(a<0){
            a = _element_li_index;
        }
        _element.find("li").eq(a).css("left","-100%") ;
        _element.find("li").eq(a).animate({left : "0px"},300) ;
        _element.find("li").eq(_a).animate({left : "100%"},300);
        _a = a;
        console.info(a)
    });
}















