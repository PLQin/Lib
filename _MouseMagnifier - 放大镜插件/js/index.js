
;function upload(obj){
    var fileName = document.getElementById("fileName");
    var showImg = document.getElementById("showImg");

    fileName.value = obj.files[0].name; // 上传文件的文件名
   /*
    obj.files属性: 返回一个类数组,Object的实例,FileList对象.包括 时间,type,文件大小size,name文件名,等等
    用户所选择的文件都存储在了这个FileList对象
    */
    showImg.src = window.URL.createObjectURL(obj.files[0]); // 创建字符串绝对路径; 这个路径来源是obj.files[0]
    //setAttribute() 方法创建或改变某个新属性。
    showImg.setAttribute("bigsrc", showImg.src);
    console.log()
    $("#hideWhiteBox").css("backgroundColor","white");
}

/*
*
* window.URL.createObjectURL()和 window.URL.revokeObjectURL()两个DOM方法`:
* 创建简单的URL字符串对象
* 每次调用window.URL.createObjectURL()的时候，会创建一个唯一的URL对象，即使你已经为该文件创建了URL对象。
* 这些对象都必须被释放。 当文档被卸载时，它们会自动释放，
* 如果你的页面动态地使用它们，你应该明确地通过调用window.URL.revokeObjectURL()释放它们：
*   var objectURL = window.URL.createObjectURL(fileObj);
*   window.URL.revokeObjectURL(objectURL);
*
* */