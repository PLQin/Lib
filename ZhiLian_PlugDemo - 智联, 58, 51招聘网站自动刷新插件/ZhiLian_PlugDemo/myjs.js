

StartRefresh("i.zhaopin.com",".myLink>a",".close>img"); // 智联
StartRefresh_51("my.51job.com","a.iconRefresh","a.layer_close"); // 前程
StartRefresh_58("my.58.com"); // 58


/*
 解决 点击刷新出现一个模态框的插件(这个模态框是js动态生成的)
 * @contrast	string  window.location.hostname
 * @RefreshBtn	element  刷新按钮
 * @CloseBtn	element	 关闭按钮
 * */
function StartRefresh(contrast,RefreshBtn,CloseBtn){
	(window.location.hostname == contrast) ? Start() : console.log();
	function Start(){
		var element = document.createElement("div");
		element.innerHTML ="<div class='zhilian_lin_wrap'><input type='checkbox' id='checkbox_b1' class='chk_2'><label for='checkbox_b1' id='theLable'>我同意</label><div class='explain'>启动智联简历刷新插件</div></div>";
		document.body.appendChild(element); 
		//禁止被复制
		theLable.onselectstart=function(){return false};
		checkbox_b1.onchange = function(){
			if(checkbox_b1.checked == false){
				zhilian = null;
				for(var i = 1; i < 1000; i++) {
					clearInterval(i);
				}
				console.log(checkbox_b1.checked);
				theLable.style.background ="#b19070";
			}else if(checkbox_b1.checked == true){
				function zhilian(){
					//禁止报错
					window.onerror=function(){return true};
					//刷新按钮
					var Aclick=document.querySelector(RefreshBtn);
					setInterval(function(){
						//关闭模态框按钮
						var a=document.querySelector(CloseBtn);
						if(a!=null){
							setTimeout(function(){a.click()},1000)
						}else{	
							Aclick.click()}
					},1000);
				}zhilian();
				theLable.style.background = "#F37900";
			}
		}
	}
}


function StartRefresh_58(contrast){
	(window.location.hostname == contrast) ? Start() : console.log();
	function Start(){
		var element = document.createElement("div");
		element.innerHTML ="<div class='zhilian_lin_wrap'><input type='checkbox' id='checkbox_b1' class='chk_2'><label for='checkbox_b1' id='theLable'>我同意</label><div class='explain'>启动58简历刷新插件</div></div>";
		document.body.appendChild(element); 
		
		checkbox_b1.onchange = function(){
			if(checkbox_b1.checked == false){
				jianli_58 = null;
				for(var i = 1; i < 1000; i++) {
					clearInterval(i);
				}
				console.log(checkbox_b1.checked);
				theLable.style.background ="#b19070";
			}else if(checkbox_b1.checked == true){
				function jianli_58(){
					//禁止报错
					window.onerror=function(){return true};
					setInterval(function(){
						document.getElementById('ContainerFrame').contentWindow.document.querySelector(".czav a.refresh").click()
					},1000)
				}jianli_58();
				theLable.style.background = "#F37900";
			}
		}
	}
}



/*
 解决 点击刷新出现一个模态框的插件(这个模态框display:none >> display:block)
 * @contrast	string  window.location.hostname
 * @RefreshBtn	element  刷新按钮
 * @CloseBtn	element	 关闭按钮
 * */
function StartRefresh_51(contrast,RefreshBtn,CloseBtn){
	(window.location.hostname == contrast) ? Start() : console.log();
	function Start(){
		var element = document.createElement("div");
		element.innerHTML ="<div class='zhilian_lin_wrap'><input type='checkbox' id='checkbox_b1' class='chk_2'><label for='checkbox_b1' id='theLable'>我同意</label><div class='explain'>启动51简历刷新插件</div></div>";
		document.body.appendChild(element); 
		//禁止被复制
		theLable.onselectstart=function(){return false};
		checkbox_b1.onchange = function(){
			if(checkbox_b1.checked == false){
				zhilian = null;
				for(var i = 1; i < 1000; i++) {
					clearInterval(i);
				}
				console.log(checkbox_b1.checked);
				theLable.style.background ="#b19070";
			}else if(checkbox_b1.checked == true){
				function zhilian(){
					//禁止报错
//					window.onerror=function(){return true};
					setInterval(function(){
						//刷新按钮
						var Aclick=document.querySelector(RefreshBtn);
						Aclick.click();
						setTimeout(function(){
							//关闭模态框按钮
							var a=document.querySelector(CloseBtn);
							a.click()
						},1000)
					},2000);
				}zhilian();
				theLable.style.background = "#F37900";
			}
		}
	}
}








/*
 创造按钮的函数
 * 
 * */
/*function createBtn(_element, _content, _className, _appendChild){
	var element = document.createElement(_element);
	element.innerText = _content;
	element.className = _className;
	_appendChild.appendChild(element);
	return element;
}
var StartBtn = createBtn("div", "启动智联简历刷新插件", "startBtn", document.body)
*/


