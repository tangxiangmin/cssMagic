CSS形变动画
===

### transform
transform用来检索或设置元素的形变，对应额属性值可以是none，也可以是一个或多个形变函数，根据函数的名称和参数确定元素的实际形变。
形变函数又分为了2D形变和3D形变。
但是在了解形变函数之前，我们需要了解两个跟transform属性相关的属性:`transform-origin`和`transform-style`。

#### 形变原点与坐标系
文档流中，元素的初始坐标系是，以元素左上角为原点，水平方向为x轴（向右为正），竖直方向为y轴（向下为正），垂直于屏幕的方向为z轴（z-index，面朝我们的方向为正）。
`transform-origin：x y`，该属性用来指定元素的形变中心，也就是形变的坐标原点 ，即元素相对于该原点进行转换。
* 其参数表示形变中心相对于元素左上角的便宜，第一个属性值为原点的横坐标（默认为50%，如果使用该属性则不可省略），第二个属性值为原点的纵坐标（默认为50%，可省略）
* 参数可以使用百分数，具体长度以及常用标识（第一个参数可使用left,right,center,第二个参数可使用top,bottom,center）

形变中心主要影响诸如旋转，扭曲等形变。

#### 形变形式
`transform-style: flat | preserve-3d`，该属性用来指定元素的形变形式
* 默认值为flat， 指定子元素位于此元素所在平面内 
* preserve-3d： 指定子元素定位在三维空间内 

有点深奥哦。

#### 2D形变函数
__translate(x,y)__  
指定元素相对于其左上角原点（不是形变中心哦）的偏移
* 第一个参数为水平方向上的偏移（不可省略，否则属性不会被浏览器识别）
* 第二个参数为竖直方向上的偏移（默认为0，可省略）
* 参数均可以为负值，表示反方向的偏移。

也可以通过`translateX()`和`translateY()`单独指定水平方向或竖直方向上的偏移。

也许你会有疑问，这个属性和相对元素的定位偏移有什么区别？
* 首先，偏移量也是根据该元素本身的左上角原点进行计算的，也就是说，设置可以使用translate函数在视觉上抵消元素相对定位的偏移；也可以在`position:absolute`的元素上设置偏移而不会与原本的left等属性冲突。
* 其次,这个属性跟文档流完全无关，做动画的时候使用translate更适合，不会引起页面的重排和重绘

__rotate(angle)__
根据元素的`transform-origin`属性进行2d旋转，其参数是一个带deg单位的角度数值
* 正值表示相对于形变中心顺时针旋转，负值表示相对于形变中心逆时针旋转
* 形变中心的改变相当于影响了旋转半径

需要注意旋转会修改元素关联的rotate坐标系。


__scale(x,y)__
根据元素的`transform-origin`进行2d缩放，参数时一个浮点数表示当前的相对于元素本身的缩放倍数
* 第一个参数对应水平方向（可以理解为形变后的宽度=参数*形变前的宽度），第二个参数对应竖直方向（同上），如果第二个参数没有定义则默认为第一个参数的值。
* 如果参数值小于1则相对于对应方向缩小，如果参数值大于1则相对于对应方向放大
* 参数是负数的话就有点神奇了，相当于将元素按照相应方向进行翻转（就像是把一张纸的正反面对调了），然后进行缩放。

也可以通过sacleX和scaleY这两个函数来单独指定元素宽度和高度的缩放

__skew__
`sckew(x,y)`将元素进行扭曲，所谓的扭曲可以想象成把元素的形变中心固定，然后根据参数旋转元素的两条中线，带动元素的变形，最后就得到了形变后的扭曲元素。

skew形变函数两个参数均为带deg单位的角度数值，两个参数均默认为0。下面是我关于skew形变计算的理解，如果错误还请帮忙指证。

这里把元素上下边中点连接的线段称为垂直中线，把左右边中点连接的线段称为水平中线，把垂直中线和水平中线的交点成为扭曲中心，在默认情况下扭曲中心与transform-origin保持一致。
* 第一个参数对应垂直中线绕扭曲中心的旋转角度，正值表示逆时针旋转，负值表示顺时针旋转
* 第二个参数对应水平中线绕扭曲中心的旋转角度，正值表示顺时针旋转，负值表示逆时针旋转
* 中线的旋转带动元素的扭曲，元素的扭曲是根据元素的形变中心进行的（而不是扭曲中心），通过指定transform-origin来指定根据这个固定点进行扭曲变形

也可以通过skewX和skewY来指定元素在单个方向上的扭曲

__matrix__
2d矩阵形变，上面的几个函数不过是这个函数的某种实现快捷方式，具体的...

#### 3D形变函数

前面提到了transform的3d坐标系，现在来了解3d形变函数。

__rotate3d__
`rotate3d(x,y,z,angle)`，指定对象的3D旋转角度，其中前3个参数分别表示旋转的方向x,y,z，其值为一个0-1之间的数值，用于表示元素围绕对应轴旋转的矢量值；第4个参数表示旋转的角度，参数不允许省略

需要注意的是，rotate3d会改变元素关联的transform坐标系

__translate3d__
`translate3d(x,y,z)`指定元素的3D位移。第1个参数对应X轴，第2个参数对应Y轴，第3个参数对应Z轴，参数不允许省略 。
实际上，如果没有改变元素相关联的transform坐标系，z轴上的位移并不能直接观看效果

__sacle3d__
`scale3d(x,y,z)`，指定元素对应方向上的缩放

### 最后

由于`transform`是立即完成，完成的动画会非常生硬，因此需要在`step`类上单独定义`transition`缓动属性。