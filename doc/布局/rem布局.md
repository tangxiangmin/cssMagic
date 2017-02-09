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

@function rem($px){
	@return 1rem * ($px/75);
}

.test {
	width: rem(375); // 5rem
    height: rem(375); // 5rem
}

```

使用rem布局的一个问题是浏览器保留小数的问题导致可能出现的1px误差，我认为，这种事还是应该去跟设计师探讨一下人生（手动滑稽）。参考[http://web.jobbole.com/84113/](http://web.jobbole.com/84113/)