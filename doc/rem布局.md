## rem布局
移动端开发中，采用rem进行布局，可以非常快速地完成需求。使用JS动态设置不同分辨率下根元素的字体大小，然后以rem为单位还原设计图即可。


```
var newRem = function() {
    var html = document.documentElement;
    // 设定为10份
    const gridNum = 10;
    html.style.fontSize = html.getBoundingClientRect().width / gridNum + 'px';
};
window.addEventListener('resize', newRem, false);
newRem();
```

假设按照iphone6的规格`750*1334`给的，现在需要一种将设计图上的像素尺寸转换为rem尺寸，为此我自定义了一个scss函数rem()，根据设计图上量取得像素传入即可获取相应的rem尺寸。
```
$remwidth: 75 !default;

@function rem($px){
    @if (unitless($px)){
        @return 1rem * ($px/$remwidth);
    }@else {
        @return 1rem * ($px/$remwidth px);
    }

}

.test {
	width: rem(375); // 5rem
    height: rem(375); // 5rem
}

```

相关代码存放在`scss/layout/_rem.scss`中。  
 
使用rem布局的一个问题是浏览器保留小数的问题导致可能出现的1px[误差](http://web.jobbole.com/84113/)，我认为，这种事还是应该去跟设计师探讨一下人生（手动滑稽）。

## 2017-2-14
今天看见了[张鑫旭大神的博文](http://www.zhangxinxu.com/wordpress/2016/08/vw-viewport-responsive-layout-typography/)关于使用`calc`和`vw`设置根字体的方法，试用一下感觉很爽，主要不是需要再使用`JS`进行判断了（不过可以作为`calc`的兼容备份）。此外这样设置还可以影响页面上的全部文本，整个页面甚至可以完全按比例缩放，简直太棒了。

## 2017-12-22
经过一段时间的尝试，发现了"完美"还原设计图尺寸的rem方式
```scss
html {
    font-size: calc((100vw / 750) * 100);
}

@function rem($px){
    @if (unitless($px)){
        @return 1rem * ($px/100);
    }@else {
        @return 1rem * ($px/100px);
    }
}
```