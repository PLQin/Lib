/* ===========================================================
 * jquery-onepage-scroll.js v1.3
 * ===========================================================
 * Copyright 2013 Pete Rojwongsuriya.
 * http://www.thepetedesign.com
 *
 * Create an Apple-like website that let user scroll
 * one page at a time
 *
 * Credit: Eike Send for the awesome swipe event
 * https://github.com/peachananr/onepage-scroll
 *
 * License: GPL v3
 *
 * ========================================================== */

/*
		插件通过为jQuery 对象原型上添加方法: onepage_scroll() , 实现: 单页/全屏滚动
		元素调用 onepage_scroll() 方法 :

		@param element  
				包含全部滚动页面的父元素
		$(element).onepage_scroll();
*/

// 在前面加上一个布尔运算符（多了一个感叹号）, 就是表达式了, 将执行后面的代码, 也就合法实现调用
!function ($) {

	// 定义默认参数
	var defaults = {
		sectionContainer: "section",
		easing: "ease",
		animationTime: 1000,
		pagination: true,
		updateURL: false,
		keyboard: true,
		beforeMove: null,
		afterMove: null,
		loop: true,
		responsiveFallback: false,
		direction: 'vertical'
	};

	/*------------------------------------------------*/
	/*   swipeEvents                    			   */
	/*------------------------------------------------*/
	/*   swipeEvents 方法规定, 当手指					*/
	/* 	 从右往左时立刻执行: swipeLeft 事件 			 */
	/* 	 从左往右时立刻执行: swipeRight 事件 			 */
	/* 	 从下往上时立刻执行: swipeUp 事件 			 	 */
	/* 	 从上往下时立刻执行: swipeDown 事件 			 */
	/* 	 如果手指滑动距离大于50px, 则不进行任何操作      */
	/*------------------------------------------------*/

	//  移动端touch事件的方法; 
	$.fn.swipeEvents = function () {
		return this.each(function () {

			var startX,
				startY,
				$this = $(this);

			// 被选元素添加一个或多个事件处理程序，以及当事件发生时运行的函数。jQuery 版本 1.7 以后不再兼容
			$this.bind('touchstart', touchstart); // 手指安下

			// 手指按下
			function touchstart(event) {
				// 在jQ中 : 原有的事件对象被保存于 event 对象的 originalEvent 属性之中
				// originalEvent.touches : 获得当前位于屏幕上的所有手指的一个列表。
				var touches = event.originalEvent.touches; // 将触发事件的手指列表保存在变量: touches 中
				if (touches && touches.length) {
					// jQuery的pageX/Y() 属性是鼠标指针的位置
					startX = touches[0].pageX;
					startY = touches[0].pageY;
					// touchmove : 手指在屏幕上滑动的时候连续地触发 
					$this.bind('touchmove', touchmove);
				}
			}

			// 如果手指从右往左, 从下往上
			// 如果手指从左往右, 从上往下
			function touchmove(event) {
				var touches = event.originalEvent.touches;
				if (touches && touches.length) {
					var deltaX = startX - touches[0].pageX;
					var deltaY = startY - touches[0].pageY;

					// trigger(event)立刻执行要触发的事件
					if (deltaX >= 50) { //从右往左
						$this.trigger("swipeLeft");
					}
					if (deltaX <= -50) { //从左往右
						$this.trigger("swipeRight");
					}
					if (deltaY >= 50) { //从下往上
						$this.trigger("swipeUp");
					}
					if (deltaY <= -50) { //从上往下
						$this.trigger("swipeDown");
					}
					if (Math.abs(deltaX) >= 50 || Math.abs(deltaY) >= 50) {
						// unbind() 方法移除被选元素的事件处理程序。jQuery 版本 1.7 起该方法被废弃
						$this.unbind('touchmove', touchmove); // 移除 touchmove事件绑定的 touchmove函数
					}
				}
			}

		});
	};

	/*
			插件通过为jQuery 对象原型上添加方法: onepage_scroll() ;
			实现: 单页/全屏滚动
				@param element 
					[Obj]	包含全部滚动页面的父元素
				@param sectionContainer    
					[String] @element元素下的 单页/全屏滚动页面, 可以是标签或 class
				@param easing    
					[String] 动画过度效果, 可选 ease(默认值) / linear / ease-in
				@param animationTime    
					[Number] 动画过度时间, 以毫秒为单位, 默认值 : 1000 ;
				@param pagination    
					[Boolean] 显示右侧圆点项目导航, 默认为: true ;
				@param updateURL    
					[Boolean] URL 显示命名锚记 , 默认为 : false ;
				@param beforeMove    
					[null] 滚动前的回调函数
				@param afterMove    
					[null] 滚动后的回调函数
				@param loop    
					[Boolean] 循环滚动, 默认为 : true ;
				@param keyboard    
					[Boolean] 键盘控制, 支持左右上下/ Page Up / Page Donw / Home / End, 默认为 : true ;
				@param responsiveFallback    
					[Boolean/Number] 回退, 即使用浏览器自带滚动, 默认为 false, 既不使用浏览器自带滚动。也可以指定一个固定值, 当页面的宽度小于这个值时, 将自动回退
				@param direction    
					[String] 页面滚动方向, 可选 vertical（垂直/竖向）和 horizontal（水平/横向）, 默认为 : vertical(垂直) ;
				@return false ;
	*/
	$.fn.onepage_scroll = function (options) {
		var settings = $.extend({}, defaults, options),
			el = $(this),
			sections = $(settings.sectionContainer)
		total = sections.length,
			status = "off",
			topPos = 0,
			leftPos = 0,
			lastAnimation = 0,
			quietPeriod = 500,
			paginationList = "";

		// 页面的transtion 效果(兼容主流浏览器)
		$.fn.transformPage = function (settings, pos, index) {
			// 滚动前的回调函数
			if (typeof settings.beforeMove == 'function') settings.beforeMove(index);
			// 设置动画时间(animationTime) 和 动画过度效果(easing)   
			$(this).css({
				"-webkit-transform": (settings.direction == 'horizontal') ? "translate3d(" + pos + "%, 0, 0)" : "translate3d(0, " + pos + "%, 0)",
				"-webkit-transition": "all " + settings.animationTime + "ms " + settings.easing,
				"-moz-transform": (settings.direction == 'horizontal') ? "translate3d(" + pos + "%, 0, 0)" : "translate3d(0, " + pos + "%, 0)",
				"-moz-transition": "all " + settings.animationTime + "ms " + settings.easing,
				"-ms-transform": (settings.direction == 'horizontal') ? "translate3d(" + pos + "%, 0, 0)" : "translate3d(0, " + pos + "%, 0)",
				"-ms-transition": "all " + settings.animationTime + "ms " + settings.easing,
				"transform": (settings.direction == 'horizontal') ? "translate3d(" + pos + "%, 0, 0)" : "translate3d(0, " + pos + "%, 0)",
				"transition": "all " + settings.animationTime + "ms " + settings.easing
			});
			// $(this) 绑定的方法(空格隔开)只运行一次
			$(this).one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function (e) {
				// afterMove : 滚动后的回调函数
				if (typeof settings.afterMove == 'function') settings.afterMove(index);
			});
		}

		// 向下翻动 
		$.fn.moveDown = function () {
			var el = $(this)
			// sectionContainer: 单页/全屏滚动页面
			index = $(settings.sectionContainer + ".active").data("index");
			current = $(settings.sectionContainer + "[data-index='" + index + "']");
			next = $(settings.sectionContainer + "[data-index='" + (index + 1) + "']");
			if (next.length < 1) {
				// 允许循环滚动, 下标允许重置
				if (settings.loop == true) {
					pos = 0;
					next = $(settings.sectionContainer + "[data-index='1']");
				} else {
					return
				}

			} else {
				2
				pos = (index * 100) * -1;
			}
			if (typeof settings.beforeMove == 'function') settings.beforeMove(next.data("index"));
			current.removeClass("active")
			next.addClass("active");
			// pagination显示右侧的圆点项目导航
			if (settings.pagination == true) {
				$(".onepage-pagination li a" + "[data-index='" + index + "']").removeClass("active");
				$(".onepage-pagination li a" + "[data-index='" + next.data("index") + "']").addClass("active");
			}

			$("body")[0].className = $("body")[0].className.replace(/\bviewing-page-\d.*?\b/g, '');
			$("body").addClass("viewing-page-" + next.data("index"))

			// updateURL 是否允许显示命名锚记
			if (history.replaceState && settings.updateURL == true) {
				var href = window.location.href.substr(0, window.location.href.indexOf('#')) + "#" + (index + 1);
				history.pushState({}, document.title, href);
			}
			el.transformPage(settings, pos, next.data("index"));
		}

		// 向上翻动
		$.fn.moveUp = function () {
			var el = $(this)
			index = $(settings.sectionContainer + ".active").data("index");
			current = $(settings.sectionContainer + "[data-index='" + index + "']");
			next = $(settings.sectionContainer + "[data-index='" + (index - 1) + "']");

			if (next.length < 1) {
				// 允许循环滚动, 下标允许重置
				if (settings.loop == true) {
					pos = ((total - 1) * 100) * -1;
					next = $(settings.sectionContainer + "[data-index='" + total + "']");
				}
				else {
					return
				}
			} else {
				pos = ((next.data("index") - 1) * 100) * -1;
			}
			if (typeof settings.beforeMove == 'function') settings.beforeMove(next.data("index"));
			current.removeClass("active")
			next.addClass("active")
			// pagination显示右侧的圆点项目导航
			if (settings.pagination == true) {
				$(".onepage-pagination li a" + "[data-index='" + index + "']").removeClass("active");
				$(".onepage-pagination li a" + "[data-index='" + next.data("index") + "']").addClass("active");
			}
			$("body")[0].className = $("body")[0].className.replace(/\bviewing-page-\d.*?\b/g, '');
			$("body").addClass("viewing-page-" + next.data("index"))

			if (history.replaceState && settings.updateURL == true) {
				var href = window.location.href.substr(0, window.location.href.indexOf('#')) + "#" + (index - 1);
				history.pushState({}, document.title, href);
			}
			el.transformPage(settings, pos, next.data("index"));
		}

		$.fn.moveTo = function (page_index) {
			current = $(settings.sectionContainer + ".active")
			next = $(settings.sectionContainer + "[data-index='" + (page_index) + "']");
			if (next.length > 0) {
				if (typeof settings.beforeMove == 'function') settings.beforeMove(next.data("index"));
				current.removeClass("active")
				next.addClass("active")
				$(".onepage-pagination li a" + ".active").removeClass("active");
				$(".onepage-pagination li a" + "[data-index='" + (page_index) + "']").addClass("active");
				$("body")[0].className = $("body")[0].className.replace(/\bviewing-page-\d.*?\b/g, '');
				$("body").addClass("viewing-page-" + next.data("index"))

				pos = ((page_index - 1) * 100) * -1;

				if (history.replaceState && settings.updateURL == true) {
					var href = window.location.href.substr(0, window.location.href.indexOf('#')) + "#" + (page_index - 1);
					history.pushState({}, document.title, href);
				}
				el.transformPage(settings, pos, page_index);
			}
		}


		// responsive方法 : responsiveFallback属性控制.
		function responsive() {
			// start modification
			var valForTest = false;

			var typeOfRF = typeof settings.responsiveFallback; //responsiveFallback : 浏览器自带滚动, 默认为false

			if (typeOfRF == "number") {
				valForTest = $(window).width() < settings.responsiveFallback;
			}
			if (typeOfRF == "boolean") {
				valForTest = settings.responsiveFallback;
			}
			if (typeOfRF == "function") {
				valFunction = settings.responsiveFallback();
				valForTest = valFunction;
				typeOFv = typeof valForTest;
				if (typeOFv == "number") {
					valForTest = $(window).width() < valFunction;
				}
			}

			// 如果 允许/不允许 回退
			if (valForTest) {
				$("body").addClass("disabled-onepage-scroll");
				$(document).unbind('mousewheel DOMMouseScroll MozMousePixelScroll');
				el.swipeEvents().unbind("swipeDown swipeUp");
			} else {
				if ($("body").hasClass("disabled-onepage-scroll")) {
					$("body").removeClass("disabled-onepage-scroll");
					$("html, body, .wrapper").animate({ scrollTop: 0 }, "fast");
				}
				el.swipeEvents().bind("swipeDown", function (event) {
					if (!$("body").hasClass("disabled-onepage-scroll")) event.preventDefault();
					el.moveUp();
				}).bind("swipeUp", function (event) {
					if (!$("body").hasClass("disabled-onepage-scroll")) event.preventDefault();
					el.moveDown();
				});

				//  绑定事件, 空格隔开
				$(document).bind('mousewheel DOMMouseScroll MozMousePixelScroll', function (event) {
					event.preventDefault();
					// jquery中 event.originalEvent 就是指向原始的事件对象
					// e.originalEvent.wheelDelta : 鼠标滚轮事件.  等于-120则为向下滚动, 等于120则为向上滚动
					var delta = event.originalEvent.wheelDelta || -event.originalEvent.detail;
					init_scroll(event, delta);
				});
			}
		}

		/*
		鼠标滚轮绑定的事件 : 下滚动 > moveDown(), 上滚动 > moveUp()
		@param event
			绑定的事件
		@param delta 
			event.originalEvent.wheelDelta   : 鼠标滚轮事件.  等于-120则为向下滚动, 等于120则为向上滚动
		*/
		function init_scroll(event, delta) {
			deltaOfInterest = delta;
			var timeNow = new Date().getTime(); // 事件戳
			// 如果目前的动画或在安静期则取消滚动
			// 安静期 :  quietPeriod + settings.animationTime
			// quietPeriod 初始值为500, lastAnimation初始值为0
			if (timeNow - lastAnimation < quietPeriod + settings.animationTime) {
				event.preventDefault();  // 阻止事件默认行为
				return;
			}

			if (deltaOfInterest < 0) { // 如果鼠标滚轮下滚动
				el.moveDown()
			} else {
				el.moveUp()
			}
			// 利用时间戳实现防抖
			lastAnimation = timeNow;
		}

		// Prepare everything before binding wheel scroll

		el.addClass("onepage-wrapper").css("position", "relative");
		$.each(sections, function (i) {
			$(this).css({
				position: "absolute",
				top: topPos + "%"
			}).addClass("section").attr("data-index", i + 1);


			$(this).css({
				position: "absolute",
				left: (settings.direction == 'horizontal')
					? leftPos + "%"
					: 0,
				top: (settings.direction == 'vertical' || settings.direction != 'horizontal')
					? topPos + "%"
					: 0
			});

			if (settings.direction == 'horizontal')
				leftPos = leftPos + 100;
			else
				topPos = topPos + 100;


			// pagination 	显示右侧圆点项目导航
			if (settings.pagination == true) {
				paginationList += "<li><a data-index='" + (i + 1) + "' href='#" + (i + 1) + "'></a></li>"
			}
		});

		el.swipeEvents().bind("swipeDown", function (event) {
			if (!$("body").hasClass("disabled-onepage-scroll")) event.preventDefault();
			el.moveUp();
		}).bind("swipeUp", function (event) {
			if (!$("body").hasClass("disabled-onepage-scroll")) event.preventDefault();
			el.moveDown();
		});

		// pagination : 显示右侧圆点项目导航
		if (settings.pagination == true) {
			if ($('ul.onepage-pagination').length < 1) $("<ul class='onepage-pagination'></ul>").prependTo("body");

			if (settings.direction == 'horizontal') {
				posLeft = (el.find(".onepage-pagination").width() / 2) * -1;
				el.find(".onepage-pagination").css("margin-left", posLeft);
			} else {
				posTop = (el.find(".onepage-pagination").height() / 2) * -1;
				el.find(".onepage-pagination").css("margin-top", posTop);
			}
			$('ul.onepage-pagination').html(paginationList);
		}

		if (window.location.hash != "" && window.location.hash != "#1") {
			init_index = window.location.hash.replace("#", "")

			if (parseInt(init_index) <= total && parseInt(init_index) > 0) {
				$(settings.sectionContainer + "[data-index='" + init_index + "']").addClass("active")
				$("body").addClass("viewing-page-" + init_index)
				if (settings.pagination == true) $(".onepage-pagination li a" + "[data-index='" + init_index + "']").addClass("active");

				next = $(settings.sectionContainer + "[data-index='" + (init_index) + "']");
				if (next) {
					next.addClass("active")
					if (settings.pagination == true) $(".onepage-pagination li a" + "[data-index='" + (init_index) + "']").addClass("active");
					$("body")[0].className = $("body")[0].className.replace(/\bviewing-page-\d.*?\b/g, '');
					$("body").addClass("viewing-page-" + next.data("index"))
					if (history.replaceState && settings.updateURL == true) {
						var href = window.location.href.substr(0, window.location.href.indexOf('#')) + "#" + (init_index);
						history.pushState({}, document.title, href);
					}
				}
				pos = ((init_index - 1) * 100) * -1;
				el.transformPage(settings, pos, init_index);
			} else {
				$(settings.sectionContainer + "[data-index='1']").addClass("active")
				$("body").addClass("viewing-page-1")
				if (settings.pagination == true) $(".onepage-pagination li a" + "[data-index='1']").addClass("active");
			}
		} else {
			$(settings.sectionContainer + "[data-index='1']").addClass("active")
			$("body").addClass("viewing-page-1")
			if (settings.pagination == true) $(".onepage-pagination li a" + "[data-index='1']").addClass("active");
		}

		// pagination 	显示右侧圆点项目导航
		if (settings.pagination == true) {
			$(".onepage-pagination li a").click(function () {
				var page_index = $(this).data("index");
				el.moveTo(page_index);
			});
		}


		// 为document 绑定事件: 
		$(document).bind('mousewheel DOMMouseScroll MozMousePixelScroll', function (event) {
			event.preventDefault();
			// jquery中 event.originalEvent 就是指向原始的事件对象
			// e.originalEvent.wheelDelta : 鼠标滚轮事件.  等于-120则为向下滚动, 等于120则为向上滚动
			var delta = event.originalEvent.wheelDelta || -event.originalEvent.detail;
			if (!$("body").hasClass("disabled-onepage-scroll")) init_scroll(event, delta);
		});

		//  如果responsiveFallback 为真, 即允许使用浏览器的回退
		if (settings.responsiveFallback != false) {
			$(window).resize(function () {
				responsive();
			});

			responsive();
		}

		// keyboard 如果 keyboard 为true; 即: 允许键盘上下左右控制
		if (settings.keyboard == true) {
			// 键盘按下
			$(document).keydown(function (e) {
				// .toLowerCase() : 把字符串(e.target.tagName)转换为小写。
				var tag = e.target.tagName.toLowerCase();
				// 如果 body 没有 disabled-onepage-scroll 类名
				if (!$("body").hasClass("disabled-onepage-scroll")) {
					switch (e.which) {
						case 38: // 向上按钮	
							if (tag != 'input' && tag != 'textarea') el.moveUp()
							break;
						case 40:
						case 32: // 向下按钮
							if (tag != 'input' && tag != 'textarea') el.moveDown()
							break;
						case 33: // 同时按住 fn +  "↑" : Pg Up 
							if (tag != 'input' && tag != 'textarea') el.moveUp()
							break;
						case 34: // 同时按住 fn + "↓" : Pg Dn 
							if (tag != 'input' && tag != 'textarea') el.moveDown()
							break;
						case 36: // 同时按住 fn + "←" = Home 
							el.moveTo(1);
							break;
						case 35: // 同时按住 fn + "→" = end
							el.moveTo(total);
							break;
						// 否则 return undefined
						default: return;
					}
				}

			});
		}
		return false;
	}
}(window.jQuery);


/*
笔记1 : 
	onmousewheel : 鼠标滚轮滚动事件; firefox 不支持 onmousewheel, 要用 DOMMouseScroll 代替。
		// Ie7+, Chrome, Opera... 鼠标滚轮事件
        document.body.onmousewheel = function(event) {
            mouseWheel();
            return false
        };

        // Firefox 鼠标滚轮事件
        document.body.addEventListener("DOMMouseScroll", function(event) {
            mouseWheel();
            return false
        });

笔记2 : 
		function demo(){
			return false
		}
		if(demo()){ // fasle
			alert(1) 
		}
		if(demo){ // true
			alert(1) 
		}
*/