$(function(){

    //1.获取元素
    var arrowl = document.querySelector('.arrowl');  
    var arrowr = document.querySelector('.arrowr');
    var focus = document.querySelector('.focus');
    var focusWidth =focus.offsetWidth;
    
    //2.鼠标经过 focus显示左右按钮
    focus.addEventListener('mouseenter',function(){
        arrowl.style.display = 'block';
        arrowr.style.display = 'block';
        clearInterval(timer);
        timer = null ; //清除定时器变量
    });
    focus.addEventListener('mouseleave',function(){
        arrowl.style.display = 'none';
        arrowr.style.display = 'none';
        timer = setInterval(function(){
            //手动调用右侧点击事件
            arrowr.click(); 
        },2000);
    });

    //3.动态生成小圆圈，有几张图片就对应几个小圆圈
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    for (var i = 0 ;i < ul.children.length ; i++) {
        //先创建li 
        var li = document.createElement('li');
        //记录当前小圆圈的索引号 通过自定义属性来做 
        li.setAttribute('index',i);
        //再插入到ol
        ol.appendChild(li);//括号里面是添加的子节点 不能加单引号

        //4..小圆圈排他思想 生成li的同时可以直接绑定（注册）点击事件
        li.addEventListener('click',function(){
            for(var i = 0 ; i < ol.children.length;i++) {
                ol.children[i].className = '';
            }
            this.className = 'current';
            //5.点击小圆圈 移动ul
            //ul的移动距离= 小圆圈的索引号乘以图片宽度 向左移动所以是负值
            //当点击某个小圆圈就拿到当前小圆圈的索引号
            var index = this.getAttribute('index');   
            //点击某个li 把当前的li的索引号给num
            num = index;
            //点击某个li 把当前的li的索引号给circle
            circle = index;
            animate(ul,-index*focusWidth);
        });
    }
    //把o l里的第一个li设置类名为 current
    ol.children[0].className = 'current';
    //6.克隆第一张图片li 放到 ul 里面去
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    //7.点击右侧按钮滚动一张
    var num = 0;
    var circle = 0 ;//声明一个全局变量
    //flag 节流阀
    var flag = true;
    arrowr.addEventListener('click',function(){
        if (flag){
            flag = false;//关闭节流阀
            //滚到最后一张复制的图片 ul快速复原 left为0
        if (num == ul.children.length-1){
            ul.style.left = 0;
            num = 0;
        }
        num++;
        animate(ul,-num * focusWidth,function(){
            flag = true ;//打开节流阀
        });
        //8.点击右侧按钮，小圆圈跟随一起变化，在声明一个变量控制小圆圈的播放
        circle++;
        //如果circle ==小圆圈的个数 说明小圆圈走克隆照片的位置 就复原
        if(circle == ol.children.length) {
            circle = 0 ;
        }
        //调用函数
        circleChange();
        }
    });

    //9.左侧按钮的做法
    arrowl.addEventListener('click',function(){
        if(flag){
            flag = false;
            //滚到第一张图片 ul快速跳到第四张
        if (num == 0){
            num = ul.children.length-1;
            ul.style.left =-num * focusWidth + 'px'; // 盒子的宽度要加单位 px 
        }
        num--;
        animate( ul , - num * focusWidth,function(){
            flag = true;
        });
        //点击左侧按钮，小圆圈跟随一起变化
        circle--;
        //如果circle <0 说明小圆圈要改为第4个小圆圈的索引号 3
        // if(circle < 0) {
        //     circle= ol.children.length - 1 ;
        // }
        circle = circle < 0 ? ol.children.length - 1 : circle ;
        //调用函数
        circleChange();
        }
    });
    function circleChange (){
        for (var i = 0 ; i < ol.children.length; i++){
            ol.children[i].className = '';
        }
        ol.children[circle].className ='current';
    }

    //10 自动播放轮播图
    var timer = setInterval(function(){
        //手动调用右侧点击事件
        arrowr.click(); 
    },2000);

    //电梯导航栏
    var toolTop = $ (".recommend").offset().top;
    toggleTool();
    function toggleTool() {
          
        if ($(document).scrollTop() >= toolTop) {
            $(".fixedtool").fadeIn();
        }else {
            $(".fixedtool").fadeOut();
        }
    }
    $(window).scroll(function(){
        toggleTool();
        //页面滚动到某个内容区域，左侧电梯导航小li相应添加和删除current类名
        if(flag){
            $(".floor .w").each(function(i,ele){
                if ($(document).scrollTop() >= $(ele).offset().top) {
                    $(".fixedtool li").eq(i).addClass("current").siblings().removeClass();
    
                }
            })
        }
    });

    //点击导航滚到对应楼层区
    $(".fixedtool li").click(function(){
        flag =false;
        //点击导航就计算要去往的页面
        //选出对应索引号的楼层的盒子 .offset().top
       var current = $(".floor .w").eq($(this).index()).offset().top;
       $("boby,html").stop().animate({
           scrollTop: current
       },function(){
           flag = true ;
       });
       $(this).addClass("current").siblings().removeClass();
    })
})