/**
 * Created by txm on 2017/3/29 0029.
 */

define(['jquery'], function ($) {


    /**
     *
     * @param fn 需要修饰的函数
     * @param delay 触发该函数的频率
     * @returns {Function}
     */
    function debounce(fn, delay){
        var timer = null;

        return function(){
            var $this = this,
                args = arguments;

            clearTimeout(timer);

            timer = setTimeout(function(){
                fn.apply($this, args);
            }, delay);



        }
    }

    // 扩展相关插件
    $.fn.extend({
        t_collapse: function () {
            return this.each(function () {
                var $this = $(this);
                var $hd = $this.find(".collapse_hd"),
                    $bd = $this.find(".collapse_bd"),
                    $icon = $this.find(".collapse_icon");

                function toggleIcon() {
                    if ($icon.hasClass("icon-plus")) {
                        $icon.removeClass("icon-plus").addClass("icon-minus");
                    }else {
                        $icon.removeClass("icon-minus").addClass("icon-plus");
                    }
                }
                
                $hd.on("click", function () {
                    $bd.slideToggle();
                    toggleIcon()
                })
            })
        },
        t_tab: function () {
            return this.each(function () {
                var $this = $(this);
                var $item = $this.find(".tab_item"),
                    $sec = $this.find(".tab_sec");

                $item.on("click", function(){
                    var idx = $(this).index();
                    $item.filter(".active").removeClass("active");
                    $(this).addClass("active");

                    $sec.filter(".active").removeClass("active");
                    $sec.eq(idx).addClass("active");
                })

            })
        },
        t_search: function (param, isTest) {
            return this.each(function () {
                var $this = $(this);
                var $input = $this.find(".search_input"),
                    $cancle = $this.find(".search_cancle");

                $input.on("input", debounce(function () {
                    var val = $(this).val();

                    if ( val !== ''){
                        var postdata = {
                            "keyword": val
                        };

                        $.extend(postdata, param.data);

                        if (isTest){
                            $this.addClass("active");
                            var res = "this is test";
                            param.success(res);
                        }else {
                            $.post(param.url, postdata, function(res){
                                if (res){
                                    $this.addClass("active");
                                }
                                param.success(res);
                            }, 'json');
                        }

                    }
                }, 200));

                $cancle.on("click", function () {
                    $this.removeClass("active");
                })
            })
        },
        t_getVerifyCode:function(cb, interval){
            var $this = $(this);

            var disabledClass = $this.data("disabled"),
                placeholder = $this.text();

            interval = interval || 60;


            var update = (function () {
                var isDisabled = false;

                function checkTime(time){
                    var i = time;
                    var str = "剩余"+time+"秒";
                    $this.text(str);

                    var timer = setInterval(function(){
                        i--;
                        if (!i){
                            $this.text(placeholder);
                            clearInterval(timer);

                            isDisabled = false;
                        }else {
                            str = "剩余"+i+"秒";
                            $this.text(str);
                        }
                    },1000);
                }

                return function () {
                    // todo
                    // 这里需要检测电话号码的合法性

                    if (!isDisabled) {
                        isDisabled = true;
                        checkTime(interval);
                    }
                }
            })();

            $this.on("click", update);
        },
        t_score: function () {
            return this.each(function () {
                var $score = $(this);
                var $items = $score.find(".score_item"),
                    $input = $score.find(".score_input");

                $items.on("click", function () {
                    var $this = $(this),
                        index = $this.index();

                    $this.addClass("active").prevAll().addClass("active");
                    $this.nextAll().removeClass("active");

                    $input.val(index);
                });
            })
        }
    });

});