## 栅格布局
栅格布局是阅读[bootstarp](http://www.bootcss.com/)源码的时候学习的，最基本的思想就是通过媒体查询，改变容器的宽度，从而影响到内部网格的尺寸。
最初的疑惑是如何实现`xs`可以影响`sm md lg`的尺寸，但是反过来却无效的限制。后来一看，嗨，原来是利用了样式覆盖，即`xs`没有媒体查询限制，后面的尺寸使用的是`min-width`进行限制，在屏幕宽度大于相应的临界点时，则越后面的样式会生效...

可以使用`bootstarp`测试一下
```
<div class="col-xs-12 col-sm-6 col-md-4 col-md-3">1</div>
```
使用开发者工具可以看见，后面有一连串被覆盖掉的样式，既然知道了原理，重新实现一个网格系统就比较容易了，为了适应博客的排版，改变了断点的分辨率（这个貌似很不应该啊）。

```
$size:xs sm md lg;
//$break-point: (768px 750px) (992px 900px) (1200px 900px);

$break-point:(600px 600px)(920px 600px)(1220px 900px) !default;
$col-num: 12 !default;
$gutter: $basemargin !default;

.container-fluid {
	width: 100%;
}

.row {
	overflow: hidden;
}
// 媒体查询

%col {
	position: relative;
	min-height: 1px;
}
@for $i from 1 through $col-num {
	@for $j from 1 through length($size) {
		.col-#{nth($size,$j)}-#{$i}{
			@extend %col;
		}
	}
}

// xs
@for $i from 1 through $col-num {
	.col-#{nth($size,1)}-#{$i}{
		width: percentage($i/$col-num);
		float: left;
	}
}
.container {
	width: 100%;
	margin-left: auto;
	margin-right: auto;
	padding:0 $gutter*2;
}
.hide-xs {
	display: none;
}

// sm md lg
@for $i from 1 through length($break-point) {
	@media screen and (min-width: nth(nth($break-point,$i),1)) {
		.container {
			width: nth(nth($break-point,$i),2);
			margin-left: auto;
			margin-right: auto;
		}
		@for $j from 1 through $col-num {
			.col-#{nth($size,$i+1)}-#{$j}{
				width: percentage($j/$col-num);
				float: left;
			}
		}
	}
	@media screen and (max-width: nth(nth($break-point,$i),1)){
		.hide-#{nth($size,$i+1)} {
			display: none !important;
		}
	}
}
```
