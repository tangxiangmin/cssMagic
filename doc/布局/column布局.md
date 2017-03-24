cloumn布局
===
## 属性值

### 列宽和列数
#### `column-width`
用数值值来定义列的宽度，如果没有定义column-count属性，那么，浏览器就是自主决定将文本分成合适的列数。

#### `column-count`
规定元素应该被分隔的列数，每列是等宽的。

#### `columns`
是列宽和列数的复合属性。
```
columns：<' column-width '> || <' column-count '>
```
如果定义了整个盒子的宽度,然后单独定义列宽或者列数，则浏览器会自动计算并生成最少的列数！
比如：
```
.box {
	width: 700px;
	border: 1px solid #000;
	margin: 100px auto;
	columns: 100px 3;
}
```
容器宽度为700px，定义每列的宽度为100px，而定义的列数是3列，此时到底是按照列宽还是列数来生成列呢？答案是3；而将列宽改为300px后，生成的列数是2！。
#### `column-gap`
定义每列之间的间距，浏览器会给一个默认值，

#### `column-rule`
规定两列之间的分割线的宽度，样式和颜色，实现之前用伪类完成的效果分割线效果等。
#### `column-span`
定义多列布局中子元素跨列效果，所谓跨列效果，指多列布局元素下的子元素是否可以横跨多个列，最常见的比如一篇文章的标题，当设置为`columu-span:all`后，就可以在列的上方展示；而不设置则默认为`none`，只在某一列展示。

#### `column-fill`
定义列高度自适应内容，默认值auto为列高度自适应内容;balance为所有列的高度以其中最高的一列统一（然而我并没有发现两者之间的区别，这个属性用的也十分少）

```
column-fill：auto | balance
```
#### 内容换行
`column-break-brfore`，`column-break-after`&`column-break-inside`
用来指定是否在元素对应位置产生新列。分栏布局的元素会被平均分配到各列，可能导致整个被分割到第二列顶部（比如常见的排版：在图片下加入标签写一些描述语句），为item元素设置该属性就可以解决这个问题。

### 列高
各列的高度是均衡的，浏览器会自动调整每列里填充多少文本、均分文本，来使各列的高度保持均衡一致。
#### 列数及列宽固定
同时制定列数和列宽，则高度会自动计算，前面的列高度一致，最后一列的内容高度与前面不一定相等。
```
-moz-column-width:200px;
-moz-column-count:3;
-webkit-column-width:200px;
-webkit-column-count:3;
column-width:200px;
column-count:3;
```
#### 列宽固定，根据容器宽度液态分布列数
会自动计算列数和每列高度，过程大概是（我猜的）：会优先考虑刚好将最后一列靠在最右侧，如果不能满足，则会增加前面列高，而最后一列则逐渐远离右侧。
```
-moz-column-width:200px;
-webkit-column-width:200px;
column-width:200px;
```
#### 列数固定，根据容器宽度液态分布列宽
跟表格类似，会自动计算每列的宽度
```
-moz-column-count:5;
-webkit-column-count:5;
column-count:5;
```
## 应用
目前使用最多的就是移动端实现瀑布流，加上前缀，兼容性还不错
