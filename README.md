#Lib

------插件please


---

##目录

-  [智联, 58, 51招聘网站自动刷新插件](#user-content-zhaopin "点击跳转至:招聘插件")
-  [垂直滑动的导航插件](#user-content-vertical_sliding_navigation_plug-in "点击跳转至:Vertical_sliding_navigation_plug-in插件")
-  [无缝轮播插件](#user-content-seamlessshuffling "点击跳转至:SeamlessShuffling插件")
-  [JS数组方法的补丁](#user-content-util "点击跳转至:util补丁")
-  [放大镜插件](#user-content-magnifier "点击跳转至:magnifier插件")
-  [单页/全屏滚动插件](#onepage-scroll "点击跳转至:onepage-scroll插件")

... 待续


---
### 智联, 58, 51招聘网站自动刷新插件:
#####zhaoPin

插件 : 使用原生 JS + CSS3 编写的 简洁干净的webkit内核浏览器插件 ;
>使用方法：

将 `ZhiLian_PlugDemo.crx` 文件拖入浏览器即可


---
>mystyles.css

-  启动按钮的 style ; 当JS 渲染出按钮的DOM结构时 , 立刻被引用


---

> myjs.js :

-  JS渲染出 "启动插件" 按钮 的 DOM结构 ;

-  JS代码封装成插件 : (调用 : `StartRefresh()` 方法, `StartRefresh_51()` 方法, `StartRefresh_58()`方法)

```
StartRefresh("i.zhaopin.com",".myLink>a",".close>img"); // 智联
/*
 解决 智联 点击刷新出现一个模态框的函数(这个模态框是由js动态生成的)
 * @contrast	string  window.location.hostname
 * @RefreshBtn	element  刷新按钮
 * @CloseBtn	element	 关闭按钮
 * */

```

```
/*
StartRefresh_51("my.51job.com","a.iconRefresh","a.layer_close"); // 前程
 解决 51 点击刷新出现一个模态框的函数(这个模态框display:none >> display:block)
 * @contrast	string  window.location.hostname
 * @RefreshBtn	element  刷新按钮
 * @CloseBtn	element	 关闭按钮
 * */
```

```
StartRefresh_58("my.58.com"); // 58
58同城 不会出现模态框, 可以无限制刷新
```

 

[返回顶部](#user-content-lib)

---






### 垂直滑动的导航插件:
#####Vertical_sliding_navigation_plug-in
插件: 简洁干净，兼容主流浏览器 ;
>使用方法：

-  head区域引用文件 `lrtk.css` 及 `jquery.min.js`,  `j-accordion.js`
-   `.accordion_container` 元素调用插件` .jaccordion()`方法


---

> DOM 布局 :

```
div.accordion_container
	h1
	div.accordion
		div.first.current
			div.current
				a
					img
			div.tap
				a
				p
		div.second
			div.current
				a
					img
			divtab
				a
				p
		div.third
			div.current
				a
					img
			div.tap
				a
				p


--------------------------------------------------------------------------------------------


<div class="accordion_container">
	<h1>栏目名称</h1>
	<div class="accordion">
		<div class="first current">
			<div class="content">
				<a href="javascript:void(0)" target="_blank"><img src="images/200x95-1.jpg" /></a>
			</div>
			<div class="tab">
				<strong><a href="javascript:void(0)" target="_blank">图片标题-1</a></strong>
				<p>内容</p>
			</div>
		</div>
		<div class="second">
			<div class="content second">
				<a href="javascript:void(0)" target="_blank"><img src="images/200x95-2.jpg" /></a>
			</div>
			<div class="tab">
				<strong><a href="javascript:void(0)" target="_blank">图片标题-2</a></strong>
				<p>内容</p>
			</div>
		</div>
		<div class="third">
			<div class="content third">
				<a href="javascript:void(0)" target="_blank"><img src="images/200x95-3.jpg" /></a>
			</div>
			<div class="tab">
				<strong><a href="javascript:void(0)" target="_blank">图片标题-3</a></strong>
				<p>内容</p>
			</div>
		</div>
	</div>
</div>
```



---

> lrtk.css :
 
:   ` .current`类(这个类没有样式): 保留类 ;
	 当鼠标移入元素时, 被js动态添加此类 ;



---


> j-accordion.js:

: $(element).jaccordion();
element 为最上级元素, `.jaccordion() `方法会遍历 element 的子元素, 


[返回顶部](#user-content-lib)

---


### 无缝轮播插件:
#####SeamlessShuffling
插件: 简洁干净，兼容主流浏览器 ;
>使用方法：

-  文档底部区域引用文件`_SeamlessShuffling_Lib.js` 和 `jQuery.js`
-  CSS样式表自己定义, 也可以引用demo中 `index.css` 文件

---

>DOM布局 以及 语法:

-  语法 : `SeamlessShuffling(_element, _prev, _next)`
```
/*
* 推荐的轮播目录为:
* div
* 	ul(@_element)>li
* 	@_prev
* 	@_next
* */
```

---

>_SeamlessShuffling_Lib.js:


* 通过按钮,进行无缝切换的轮播(没有setInterval)
@_element `documentElementObject` 轮播box
@_prev	`documentElementObject` 点击向上翻页
@_next   `documentElementObject` 点击向下翻页
* 推荐的轮播目录为:
```
div
	ul(@_element)>li
	@_prev
 	@_next
```


[返回顶部](#user-content-lib)

---

### JS数组方法的补丁
#####util
---在IE浏览器中, JS数组的迭代方法仅被IE9+支持, 所以必须为IE低版本编写这些补丁:

>使用方法：

-  在文档底部添加补丁 `util.js`

> util.js :

-  在Array对象的原型上重新添加的`forEach`, `map`, `filter`方法



[返回顶部](#user-content-lib)


---


### 放大镜插件:
#####magnifier
插件: 不适用IE9以下;


>使用方法：

-  文档底部调用 `magnifier.js` 
-   `.accordion_container` 元素调用插件` .jaccordion()`方法




> magnifier.js:

插件通过 html5自定义属性 以及 原生JS实现放大镜效果 ;

语法 : 
```
/*
imgObj.setAttribute("bigsrc", imgObj.src);
@param imgObj
	img元素
@return ;
*/
```


[返回顶部](#user-content-lib)

---



### 单页/全屏滚动插件 jquery.onepage-scroll.js :
#####onepage-scroll

插件(非原创) : 使用 jQuery框架  , 使用了 CSS3 `transform` 属性，所以不兼容 IE10 以下的浏览器。可以设置 `responsiveFallback: true` 使页面在 IE8、IE9 中能够正常浏览。

> 插件的特点 : 

-  （不）显示右侧圆点项目导航
-  （不）显示命名锚记
-  循环/禁止循环
-  回退（使用浏览器自带滚动）/指定回退
-  支持键盘控制，左右上下/ Page Up / Page Donw / Home / End 等
-  水平/横向滚动
-  回调函数



>使用方法（必须的）：

``` 
<link rel="stylesheet" href="css/onepage-scroll.css">
<script src="js/jquery.min.js"></script>
<script src="js/jquery.onepage-scroll.min.js"></script>
<script>
	$(function(){
		/* 元素调用 onepage_scroll() 方法
		@param element 
				包含全部滚动页面的父元素
		*/
		$(element).onepage_scroll();
	});
</script>
```



>DOM 结构 : 

```
<div class="main">
    <section>第一屏</section>
    <section>第二屏</section>
    <section>第三屏</section>
    <section>第四屏</section>
</div>
```


>jquery.onepage-scroll.js :

 `onepage_scroll()` 方法 : onepage-scroll.js 在jQuery对象原型上封装的滚动方法
 
```
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
				[Boolean] 显示右侧圆点项目导航, 默认为: ture ;
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
		$(function () {
			$(element).onepage_scroll({
				sectionContainer: "section",
				easing: "ease",
				animationTime: 1000,
				pagination: true,
				updateURL: false,
				keyboard: true,
				beforeMove: null,
				afterMove: null,
				loop: true,
				keyboard: true,
				responsiveFallback: false,
				direction: 'vertical'
			});
		});
```

[返回顶部](#user-content-lib)

---



