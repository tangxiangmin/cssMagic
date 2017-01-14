/**
 * Created by admin on 2017/1/12.
 */
define(function () {
    !(function () {
        var newRem = function() {
            var html = document.documentElement;
            const gridNum = 10;
            html.style.fontSize = html.getBoundingClientRect().width / gridNum + 'px';
        };
        window.addEventListener('resize', newRem, false);
        newRem();
    })();

});