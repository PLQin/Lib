/**
 * 鼠标点击按钮有涟漪扩散
 * ========================
 * @qing 2017/8/9
 */
function RippleEffect(element){
    this.element = element;
    this.element.addEventListener('click', this.run.bind(this), false);
}
RippleEffect.prototype = {
    run: function(event){
        var ripplerContainer = this.element.querySelector('.ripple-container');
        var offsetInfo = this.element.getBoundingClientRect();
        if(ripplerContainer) {
            ripplerContainer.remove();
        }
        var rippleContainer = document.createElement('div');
        rippleContainer.style.position = 'fixed';
        rippleContainer.style.zIndex = 99;
        rippleContainer.style.width = offsetInfo.width + 'px';
        rippleContainer.style.left = offsetInfo.left + 'px';
        rippleContainer.style.top = offsetInfo.top + 'px';
        rippleContainer.style.height = offsetInfo.height + 'px';
        rippleContainer.className = 'ripple-container';
        rippleContainer.style.overflow = 'hidden';
        this.element.appendChild(rippleContainer);

        var circleD = offsetInfo.width * 2;

        var ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.width = circleD + 'px';
        ripple.style.height = circleD + 'px';
        ripple.style.borderRadius = '500px';
        ripple.style.left = ((event.pageX - offsetInfo.left) - circleD/2) + 'px';
        ripple.style.top = ((event.pageY - offsetInfo.top) - circleD/2) + 'px';
        ripple.className = 'ripple';
        rippleContainer.appendChild(ripple);
        ripple.addEventListener('animationend', function(){
            rippleContainer.remove();
        }.bind(this), false);
    }
};

// 调用方法：
//     // find all elements and attach effect
//     // 找到所有的元素使其附加属性
//     Array.prototype.forEach.call(document.querySelectorAll('[data-ripple]'), function(element){
//         // element is instance of javascript element node
//         // element 是DOM元素实例
//         new RippleEffect(element); 
//     });
