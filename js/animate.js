function animate (obj,target,callback){
    //给不同元素指定不同的定时器
    //先清除以前的定时器,只保留当前的一个定时器 
    clearInterval(obj.tmr);
    obj.tmr = setInterval(function(){
        //步长值写到定时器里
        //步长值取整数
        var step = (target - obj.offsetLeft) / 20 ;
        //正取最大值 ，负取最小值
        step1 = step > 0 ? Math.ceil(step) : Math.floor(step);
     if (obj.offsetLeft == target){
         //停止动画本质是停止定时器
         clearInterval(obj.tmr);
         //回调函数写到定时器里面
        //  if(callback) {
        //      callback();
        //  }
        callback && callback();
     }
     obj.style.left = obj.offsetLeft + step1 + 'px'; //别忘了像素单位
 },15);
}