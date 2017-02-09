# 样式框架

## 页面结构
一个PC端页面分为下面4个部分：`page-hd`,`page-mn`,`page-sd`,`page-ft`。
每个页面有一个包裹容器类，可该页面的类名作用域。

```
// login为该页面独有的类名作用域
<div class="wrapper login">
    <header></header>
    <main></main>
    <aside></aside>
    <footer></footer>
</div>
```
页面独立的CSS样式可以使用包裹容器进行限定，需要注意的是嵌套最好不要超过三层

```
.login {
    .page-mn {
        .media {
            ...
        }
    }
}
```
页面上的区块使用

## 颗粒类
由于网格系统默认是左浮动，因此为`fr`指定了`float: right !important;`属性便于重置