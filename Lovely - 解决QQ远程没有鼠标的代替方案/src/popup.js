
/**
 * 本地从 扩展中调用JS
 * 		chrome.extension.getURL("Lovely.js")
 *
 * 
 */


 



// function fnClick() {
// 	alert(1)
// }


// // chrome.browserAction.onClicked.addListener(fnClick);
// fnClick()

// // 设置一个点击browser actions时显示在popup中的HTML。
// chrome.browserAction.setPopup(fnClick)
// 
// 
        // find all elements and attach effect
        // 找到所有的元素使其附加属性
	 //    Array.prototype.forEach.call(document.querySelectorAll('[data-ripple]'), function(element){
	 //    	// element is instance of javascript element node
	 //    	// element 是DOM元素实例
	 //        new RippleEffect(element); 
	 //    });

		document.getElementById("start-btn").addEventListener("click",  function (event) {
			chrome.tabs.executeScript(null,{code:"Lovely.init()"});
		})

		document.getElementById("stop-btn").addEventListener("click",  function (event) {
			chrome.tabs.executeScript(null,{code:"Lovely.fnHide()"});
		})


		// var port = chrome.extension.connect();

		// // 设置一个点击browser actions时显示在popup中的HTML。
		// chrome.browserAction.setPopup(fnClick)












