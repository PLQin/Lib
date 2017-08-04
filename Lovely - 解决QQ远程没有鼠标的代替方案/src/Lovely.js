;(function(global, undefined) {
	function CA(option) {
		this.name = "淘气的AbbY" || option.name;
		this.element = "button" || option.element;
		this.style = {
		    'font-size': '16px',
		    'width': '5em',
		    'height': '5em',
		    'background': 'antiquewhite',
		    'border': 'none',
		    "border-radius": '50%',
		    "opacity": '.5',
		    "position": 'fixed',
		    "z-index": '99999999999999',
		    "left": '-100rem',
		    "top": '-100rem',
		    "pointer-events":"none",
		    "transition" : "background .7s",
		}
	}
	CA.prototype= {
		constructor : CA,
		init : function(){
			if(this.element instanceof HTMLElement){
				this.element.style.display = "block"; 
				return;	
			}
			this.fnCreateEle();
			return "启动成功， 重新打开应在Lovely环境下调用 Lovely.fnHide 方法"
		},
		fnCreateEle : function() {
			var dom = document.createElement(this.element);
				document.getElementsByTagName("body")[0].appendChild(dom);
				this.element = dom;
				this.fnAssignmentStyle(dom, this.style)
			var fnMove = this.fnMove;
			var fnOut = this.fnOut;
				document.onmousemove = function(event){
					fnMove(event, dom)
				};
				document.onmouseout = function(event){
					fnOut(event, dom)
				};
				document.onmousedown = function(){
					var _b = dom.style.background;
					dom.style.background = "#E29835";
					setTimeout(function(){
						dom.style.background = _b;
					},100)
				}
			return dom;
		},
		fnMove : function(event, dom){
			dom.style.left = event.clientX - dom.clientWidth / 2 + "px";
			dom.style.top = event.clientY - dom.clientHeight / 2 + "px";
		},
		fnOut : function(event, dom){
			dom.style.left = "-100rem";
			dom.style.top = "-100rem";
		},
		fnAssignmentStyle : function(dom, oStyle){
		    for(var i in oStyle)
		    {
		        dom.style[i]= oStyle[i];
		    }
		},
		fnHide : function(){
			this.element.style.display = "none"; 
			return "隐藏成功， 重新打开应在Lovely环境下调用 Lovely.init 方法"
		},
	} 
	
	global.Lovely = new CA();
	Lovely.init();		
})(window);


