#Lib

------插件please


---

##目录

-  [智联, 58, 51招聘网站自动刷新插件](#zhaoPin "点击跳转至:招聘插件")
-  [垂直滑动的导航插件](#Vertical_sliding_navigation_plug-in "点击跳转至:Vertical_sliding_navigation_plug-in插件")
-  [无缝轮播插件](#SeamlessShuffling "点击跳转至:SeamlessShuffling插件")
-  [JS数组方法的补丁](#util "点击跳转至:util补丁")
-  [放大镜插件](#magnifier "点击跳转至:magnifier插件")

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

 

[返回顶部](#Lib)

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
 
:   ` .current`类(这个类没有样式): 保留类
	 在js中这` .current` 类, 当鼠标移入时, 被js动态添加此类 ;



---


> j-accordion.js:

: $(element).jaccordion();
element 为最上级元素, `.jaccordion() `方法会遍历 element 的子元素, 


[返回顶部](#Lib)

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


[返回顶部](#Lib)

---

### JS数组方法的补丁
#####util
---在IE浏览器中, JS数组的迭代方法仅被IE9+支持, 所以必须为IE低版本编写这些补丁:

>使用方法：

-  在文档底部添加补丁 `util.js`

> util.js :

-  在Array对象的原型上重新添加的`forEach`, `map`, `filter`方法



[返回顶部](#Lib)


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


[返回顶部](#Lib)

---