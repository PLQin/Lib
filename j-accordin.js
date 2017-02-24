

/*
插件通过为jQuery添加方法: jaccordion实现: 移入显示元素的全部布局, 移出显示元素的缩略布局
    @param $    jQuery对象
*/
(function ($) {
    // 为jq对象添加方法
    $.fn.jaccordion = function () {
        $(this).each(function () {
            var c = $(this).children().length;
            var d = Array(c - 1);
            var e = Array(c - 1);
            $(this).children().each(function (a) {
                if (a == (c - 1)) return;
                e[a] = $(this).position().top;
                d[a] = $(this).position().top - $(this).children().outerHeight()
            });
            var f = this;
            // mouseenter: 当鼠标指针穿过（进入）被选元素时
            $(this).children().mouseenter(function () {
                var a = $(f).children().index(this);
                var b = $(f).children().index($(f).children('[class~="current"]'));
                if (!$(this).hasClass('current')) {
                    if (b > a) {
                        for (var i = b - 1; i >= a; i--) {
                            $($(f).children().get(i)).stop(false, false);
                            to_top = e[i] + 'px';
                            $($(f).children().get(i)).animate({
                                top: to_top
                            })
                        }
                    } else if (b < a) {
                        for (var i = b; i < a; i++) {
                            $($(f).children().get(i)).stop(false, false);
                            to_top = d[i] + 'px';
                            $($(f).children().get(i)).animate({
                                top: to_top
                            })
                        }
                    }
                    $(f).children().removeClass('current');
                    $(this).addClass('current')
                }
            })
        })
    }
})(jQuery);