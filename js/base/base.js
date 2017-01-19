/**
 * Created by admin on 2017/1/12.
 */

require.config({
    baseUrl:'../../js/lib/',
    paths:{
        jquery:'jquery-2.0.3',
    }
});

// 页面通用功能
require(['jquery'],function ($) {
    !(function () {
        var newRem = function() {
            var html = document.documentElement;
            const gridNum = 10;
            html.style.fontSize = html.getBoundingClientRect().width / gridNum + 'px';
        };
        window.addEventListener('resize', newRem, false);
        newRem();
    })();

    // 展开侧边栏
    $("#sideList").hover(function () {
        $(this).find(".btn-icon").toggleClass("hover");
    }).on("click",function () {
        $(this).find(".btn-icon").toggleClass("close");
        $(".page-sd,.page-mn").toggleClass("active");
    });
    // 返回顶部
    !(function () {
        var h = window.screen.height/20;
        $(document).on("scroll",function(){
            if ($(this).scrollTop()> h){
                $("#backTop").addClass("active")
            }else {
                $("#backTop").removeClass("active");
            }
        });
        $("#backTop").on("click",function () {
            $(document.body).animate({scrollTop:0},200);
        })
    })();
});