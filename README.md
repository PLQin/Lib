#Lib

------插件please

> 2/25 早上10点, 上传(更新)完毕

---

##目录

-  [垂直滑动的导航插件](#Vertical_sliding_navigation_plug-in "点击跳转至:Vertical_sliding_navigation_plug-in")



### 垂直滑动的导航插件
##### ---Vertical_sliding_navigation_plug-in :
插件: 简洁干净，兼容主流浏览器
>使用方法：
: head区域引用文件lrtk.css及jquery.min.js, j-accordion.js

---

> DOM 布局:

```
div.accordion_container
	h1
	div.accordion
		div.first.current
			div.current
				a
					img
		div.second
			div.current
				a
					img
		div.third
			div.current
				a
					img

accordion_container元素调用插件 .jaccordion()方法

<div class="accordion_container">
	<h1>栏目名称</h1>
	<div class="accordion">
		<div class="first current">
			<div class="content">
				<a href="javascript:void(0)" target="_blank"><img src="images/200x95-1.jpg" /></a>
			</div>
			<div class="tab">
				<strong><a href="javascript:void(0)" target="_blank">图片标题-1</a></strong>
				<p>副标题-1</p>
			</div>
		</div>
		<div class="second">
			<div class="content second">
				<a href="javascript:void(0)" target="_blank"><img src="images/200x95-2.jpg" /></a>
			</div>
			<div class="tab">
				<strong><a href="javascript:void(0)" target="_blank">图片标题-2</a></strong>
				<p>副标题-2</p>
			</div>
		</div>
		<div class="third">
			<div class="content third">
				<a href="javascript:void(0)" target="_blank"><img src="images/200x95-3.jpg" /></a>
			</div>
			<div class="tab">
				<strong><a href="javascript:void(0)" target="_blank">图片标题-3</a></strong>
				<p>副标题-3</p>
			</div>
		</div>
	</div>
</div>
```


---
> lrtk.css de API

---

>j-accordion.js 的 API:

: $(element).jaccordion();

---