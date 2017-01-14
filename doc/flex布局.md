## flex布局

之前尝试使用了[flex.css](https://github.com/lzxb/flex.css.git)的声明式语法进行布局，发现实际上并不实用，还是写在样式表中比较容易维护，然而遇见的一个问题是浏览器的兼容性并不确定（尽管上[can I Use](http://caniuse.com)可以查询），还是遇见了不少问题（比如flex-wrap在微信浏览器中）。
使用webstrom的autoprefix插件可以解决前缀的问题，然而在样式表中到处添加前缀是一件非常费力不讨好的事情，我的解决办法是针对flex的属性编写了一系列的混合器（反正也没有几个属性），放在`_flexMixin.scss`文件中，其他样式表中不要再显式地使用flex属性，而是使用定义的混合器，在项目中发现问题就可以统一更改了。这也是我目前针对大部分还需要兼容的属性的处理方式（比如CSS3的部分属性）。

此外还定义一些常用的flex布局样式混合器快捷方式。

```
// 下面的混合器均定义了一个与默认值不同但使用频率较高的默认属性

// -------容器-------
@mixin fx-dir($p:column) {
	-webkit-box-orient: vertical;
	-webkit-box-direction: normal;
	    -ms-flex-direction: $p;
	        flex-direction: $p;
}

// 主轴对齐方式
@mixin fx-main($p:center) {
	-webkit-box-pack: $p;
	    -ms-flex-pack: $p;
	        justify-content: $p;
}

// -------子项-------

// 排序
@mixin fx-order($num:1){
	-webkit-box-ordinal-group: NaN;
	    -ms-flex-order: $num;
	        order: $num;
}

// 省略...

```