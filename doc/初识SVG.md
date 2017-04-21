SVG
===

## 初识
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <style>
        .wrap {
            width: 500px;
            height: 500px;
            border: 1px solid #dedede;
            margin: 100px auto;
        }
    </style>
</head>
<body>
<div class="wrap">
    <svg width="100" height="100">
        <circle cx="100" cy="50" r="40" stroke="black" stroke-width="2" fill="red" />
    </svg>
</div>
</body>
</html>
```

`svg`标签是整个是整个画布容器，坐标是相对于该标签的左上角进行的。会自动隐藏溢出画布的元素

## 引入
SVG 文件可通过以下标签嵌入 HTML 文档：<embed>、<object> 或者 <iframe>。
SVG的代码可以直接嵌入到HTML页面中，或您可以直接链接到SVG文件。

## 预定义形状
一些预定义的标签，通过设置属性来绘制图形
* `rect`
* `circle`
* `ellipse`
* `line`
* `ploygon`
* `polyline`
* `path`,由于在绘制路径时的复杂性，强烈建议使用SVG编辑器来创建复杂的图形。
* `text`


## 样式
既可以使用属性编写，也可以在`style`属性值以键值对形式编写
* `Stroke `