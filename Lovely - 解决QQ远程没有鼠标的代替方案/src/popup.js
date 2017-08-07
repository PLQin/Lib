
/**
 *	本地从 扩展中调用JS
 * 		chrome.extension.getURL("Lovely.js")
 *
 *  ripple 插件（按钮点击水波纹插件）的调用方法：
 *	 	Array.prototype.forEach.call(document.querySelectorAll('[data-ripple]'), function(element){
 *	  		// element is instance of javascript element node
 *	    	// element 是DOM元素实例
 *	      	new RippleEffect(element); 
 *	    });
 * 
 */



// // chrome.browserAction.onClicked.addListener(fnClick);
// fnClick()

// var port = chrome.extension.connect();

// 设置一个点击browser actions时显示在popup中的HTML。
// chrome.browserAction.setPopup(fnClick)
		
// find all elements and attach effect
// 找到所有的元素使其附加属性













	 	// 之前没有这行代码， 报错： 没有权限
	 	// 引用JS后， 可以知晓 Lovely 下的方法
	 	// permissions要设置好
		chrome.extension.getURL("Lovely.js")


		document.getElementById("start-btn").addEventListener("click",  function (event) {
			// 可以传送
			// http://open.chrome.360.cn/extension_dev/content_scripts.html
			chrome.tabs.executeScript(null,{code:"Lovely.init()"});
		})

		document.getElementById("stop-btn").addEventListener("click",  function (event) {
			chrome.tabs.executeScript(null,{code:"Lovely.fnHide()"});
		})












