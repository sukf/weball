//定义一个函数，参数interval表示间隔多少毫秒值切换
function SlideShow(interval) {
	//幻灯片容器节点对象
    var slideContainer = document.getElementById("slideContainer"),
	    //幻灯片图片对象li节点
		imgs = document.getElementById("slideImgs").getElementsByTagName("li"),
	    //幻灯片数字导航按钮对象容器
		slideBar = document.getElementById("slideBar"),
		//幻灯片数字导航按钮li节点
	    btns = slideBar.getElementsByTagName("li"), 
	    //图片总数
		imgNum = imgs.length,
		//如果不设置时间间隔，则默认3000毫秒切换一张 
	    interval = interval || 3000,
		//初始值，currentI表示当前幻灯片索引值（0表示第一张幻灯片），lastI表示上一张幻灯片
	    currentI = lastI = 0, 
		currentBtn,
		autoSlideHandle;
	//幻灯片定时器
    function startAutoSlide() {
		//autoSlideHandle是定时器句柄，function(){}是执行的内容，interval是时间间隔
        autoSlideHandle = setInterval(function () {
            currentI = currentI + 1 >= imgNum ? currentI + 1 - imgNum : currentI + 1;
            slide()
        }, interval);
    }
	//取消定时器autoSlideHandle
    function stopAutoSlide() {
        clearInterval(autoSlideHandle);
    }
	//切换图片
    function slide() {
		//隐藏上一张
        imgs[lastI].style.display = "none";
        btns[lastI].className = "";
		//显示当前张
        imgs[currentI].style.display = "block";
        btns[currentI].className = "on";
        //将当前张赋值给上一张
		lastI = currentI;
    }
	//初始显示第一张
    imgs[currentI].style.display = "block";
	//鼠标移到幻灯片上，则取消定时器，也就是说鼠标在图片上的时候，图片停止自动切换
    slideContainer.onmouseover = stopAutoSlide;
    //鼠标移出幻灯片，则启动定时器
	slideContainer.onmouseout = startAutoSlide;
	//鼠标移到导航数字上时，显示数字对应的幻灯片
    slideBar.onmouseover = function (e) {
        currentBtn = e ? e.target : window.event.srcElement;
        if (currentBtn.nodeName === "LI") {
            currentI = parseInt(currentBtn.innerHTML, 10) - 1;
            slide();
        }
    }
	//启动定时器
    startAutoSlide();
}
