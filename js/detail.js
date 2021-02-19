window.addEventListener('load', function(){
    // 原生js tab栏切换布局
    // var detail_tab_list = document.querySelector('.detail_tab_list');
    // var lis = detail_tab_list.querySelectorAll('li');
    // var items = document.querySelectorAll('.item');
    //     //for 循环绑定事件
    // for (var i = 0; i < lis.length; i++) {
    //         //开始给5个li设置索引号
    //     lis[i].setAttribute('index', i);
    //     lis[i].onclick = function () {
    //             //先干掉所有li的 class类
    //         for (var i = 0; i < lis.length; i++) {
    //                 lis[i].className = '';
    //             }
    //             //留下自己
    //             this.className = 'current';
    //             var index = this.getAttribute('index');
    //             // 先隐藏所有item的div
    //             for (i = 0; i < items.length; i++) {
    //                 items[i].style.display = 'none';
    //             }
    //             //留下自己的item 
    //             items[index].style.display = 'block';
    //         }
    //     }

    // 放大镜js
     var preview_img =document.querySelector ('.preview_img');
     var mask =document.querySelector('.mask');
     var big = document.querySelector('.big');
     preview_img.addEventListener('mouseover',function(){
         mask.style.display ='block';
         big.style.display ='block';
     }) 
     preview_img.addEventListener('mouseout',function(){
        mask.style.display ='none';
        big.style.display ='none';
    }) 
    preview_img.addEventListener('mousemove',function(e){
       var x = e.pageX - this.offsetLeft;
       var y = e.pageY - this.offsetTop;
       //让鼠标在mask盒子的中间  减去盒子高度和宽度的一般 mask.offsetWidth mask.offsetHigth
       //mask 移动的距离
       var maskx = x - mask.offsetWidth / 2;
       var masky = y - mask.offsetHeight / 2;
       //x坐标小于0 就停在0的坐标
       var maskMax = preview_img.offsetWidth - mask.offsetWidth ; //遮挡层的最大移动距离
       if (maskx <= 0){
           maskx = 0;
       }else if (maskx>= maskMax) {
           maskx = maskMax;
       }
       if (masky <= 0){
           masky = 0;
       }else if (masky >= maskMax) { //因为mask盒子是正方向 宽高一样 所以直接用 maskMax
           masky = maskMax;
       }
         mask.style.left = maskx + 'px';
         mask.style.top = masky + 'px';
         //大图的移动距离 =遮挡层的移动距离*大图的最大移动距离 / 遮挡层的最大移动距离
         var bigImg = document.querySelector('.bigImg');
         var bigMax = bigImg.offsetWidth - big.offsetWidth;//大图的最大移动距离
         //大图的移动距离x (正方形宽高一样 )
         var bigX = maskx * bigMax / maskMax ;
         //大图的移动距离y
         var bigY = masky * bigMax / maskMax ;
         //图片要定位才可以给left和top值
         bigImg.style.left = -bigX + 'px'; // 与小图往相反 所以要加负号
         bigImg.style.top = - bigY + 'px';
    })    
})
        