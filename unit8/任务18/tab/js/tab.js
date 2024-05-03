//节点加载完毕才执行该函数，保证函数内的代码能获得DOM节点
window.onload = function() {
	//获取tab容器对象
    var tab = document.getElementById("tab");
    //tab选项卡中第一个子div的子li节点（tab选项按钮节点）
	var buttons = tab.getElementsByTagName("div")[0].getElementsByTagName("li");
    //tab选项卡中第二个子div的子li节点（tab选项按钮对应的内容节点）
	var contents = tab.getElementsByTagName("div")[1].getElementsByTagName("div");
    //定时器变量,定时器用于定义图片渐变显示效果
	var timer = null;
	//初始化tab选项卡的单击函数，确保单击选项按钮时显示对应的内容
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].index = i;
        buttons[i].onclick = function() {
            show(this.index);
        }
    }
	//选项卡内容显示函数
    function show(index) {
        var alpha = 0;
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].className = "";
            contents[i].className = "";
            contents[i].style.opacity = 0;
            contents[i].style.filter = "alpha(opacity=0)";
        }
        buttons[index].className = "cur";
		    timer = setInterval(function() {
            alpha += 20;
            alpha > 100 && (alpha = 100);
            contents[index].style.opacity = alpha / 100;
            contents[index].style.filter = "alpha(opacity=" + alpha + ")";
            alpha == 100 && clearInterval(timer);
        },50);
    }
}
