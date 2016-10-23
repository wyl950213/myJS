/**
 * Created by Administrator on 2016/8/26.
 */
function $(idstr) {
    return  document.getElementById(idstr);
}
//scrolltop兼容性封装
function scroll() {
    if(window.pageXOffset!=null){
        return{
            left:window.pageXOffset,
            top:window.pageYOffset
        }
    }
    else if(document.compatMode=="css1Compat"){
        return {
            left:document.documentElement.scrollLeft,
            top:document.documentElement.scrollTop
        }
    }
    return{
        left:document.body.scrollLeft,
        top:document.body.scrollTop
    }
}
function show(dst) {
    dst.style.display="block";
}
function hidden(dst) {
    dst.style.display="none";
}
function size() {
    if(window.innerWidth!=null){
        return{
            width:window.innerWidth,
            height:window.innerHeight
        }
    }
    else if(document.compatMode=="CSS1Compat"){
        return{
            width:document.documentElement.clientWidth,
            height:document.documentElement.clientHeight
        }
    }
    else{
        return{
            width:document.body.clientWidth,
            height:document.body.clientHeight
        }
    }
}
//匀速运动封装
function animateAverage(aniEle,target,speed) {
    //清除之前定时器
    clearInterval(aniEle.timer);
    var offset=aniEle.offsetLeft;
    var step=offset>target?-speed:speed;
    aniEle.timer=setInterval(function () {
        offset+=step;

        if(Math.abs(offset-target)<=Math.abs(step)){
            clearInterval(aniEle.timer);
            offset=target;
        }
        aniEle.style.left=offset+"px";
    },100);
}
//缓速运动封装
function slowAnimate(box,target) {
    clearInterval(box.timer);
    var step=0;
    box.timer=setInterval(function () {
        step=(target-box.offsetLeft)/10;
        step=step>0?Math.ceil(step):Math.floor(step);
        if(box.offsetLeft==target){
            clearInterval(box.timer);
        }
        box.style.left=box.offsetLeft+step+"px";
    },30)
}
//获取current样式
function getCurrentAttrbute(obj,attrName) {
    if (obj.currentStyle)
    {
        return obj.currentStyle[attrName];
    }
    else {
        return window.getComputedStyle(obj,null)[attrName];
    }
}
//单个属性运动封装
function animateAlone(obj,attr,target) {
    var step=0;
    obj.timer=setInterval(function () {
        value=getStyle(box,attr);
        step=(target-parseInt(value))/10;
        step=step>0?Math.ceil(step):Math.floor(step);
        if(parseInt(value)==target){
            clearInterval(obj.timer);
        }
        obj.style[attr]=parseInt(value)+step+"px";
        //step=(target-obj.)
    },30)
}
//多个属性同时运动封装
function animateMore(obj, json,fn) {
    var step  = 0;
    var current = 0;
    var flag = true;//当flag为true的时候, 清除定时器
    clearInterval(obj.fnTimer);
    obj.fnTimer = setInterval(function () {
        for(var attrName in json)
        {
            // left height 都未到达边界
            // 任意的有一个到达边界
            // 多个属性都到达边界
            if(attrName=="opacity")
            {      //0.543 ==> 54
                current = Math.round(getCurrentAttrbute(obj,attrName)*100)||100;
            }
            else {
                current = parseInt(getCurrentAttrbute(obj,attrName));
            }
            step = (json[attrName] - current)/10;
            step = step>0?Math.ceil(step):Math.floor(step);

            //设置透明度
            if(attrName=="opacity") {
                if ("opacity" in obj.style)//判断是否支持opacity
                {
                    obj.style[attrName] = (current + step) / 100;
                }
                else {
                    obj.style.filter = "alpha(opacity = " + (current + step) + ")";
                }
            }
            else if(attrName == "zIndex")
            {
                obj.style[attrName] = json[attrName];
            }
            else{
                obj.style[attrName] = current + step + "px";
            }

            if (current!=json[attrName])
            {
                flag = false;
            }
        }
        if (flag)
        {
            clearInterval(obj.fnTimer);
            if (fn)
            {
                fn();
            }
        }
        else {
            flag = true;
        }
        console.log("hello world");

    },30);

}
//classname兼容性解决方法封装
function my_getelementClassName(id,name) {
    //判断浏览器是否存在
    if(document.getElementsByClassName){
        return document.getElementsByClassName(name);
    }
    else
    {
        var eles=document.getElementsByTagName("*");
        var disArr=[];
        for(var i=0;i<eles.length;i++)
        {
            var nameArr=eles[i].className.split(" ");
            for(var j=0;j<nameArr.length;j++)
            {
                if(nameArr[j]==name)
                {
                    disArr.push(eles[i]);
                }
            }
        }
        return disArr;
    }
}