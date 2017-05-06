gulp
===

## 插件

__gulp-sass__
编译`scss`，貌似`npm`安装会出点问题，推荐使用`cnpm`安装

__gulp-sourcemaps__
生成`map`文件，包括`css`和`js`的。

__gulp-autoprefixer__
自动为`css`属性名添加浏览器前缀，可以指定兼容的浏览器版本哦。需要注意的是应该先编译`scss`为`css`，然后再使用`autoperfixer`

__gulp-base64__
将图片转换成`base64`文件，减少服务器请求次数

__gulp-livereload__
代码环境热更新，需要配合谷歌浏览器的插件`livereload`使用，主要是这个插件用习惯了。

## 任务
```
var gulp = require("gulp");
var sass = require("gulp-sass");
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var base64 = require('gulp-base64');
var livereload = require('gulp-livereload');


// 资源目录
var SCSSFLODER = "./scss/**/*.*",
    CSSFLODER = './css',
    MAPSFLODER = './';


gulp.task("sass", function() {
    return gulp.src(SCSSFLODER)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['> 5%'],
            cascade: false
        }))
        .pipe(sourcemaps.write(MAPSFLODER))
        .pipe(gulp.dest(CSSFLODER))
        // .pipe(livereload());
});

gulp.task("auto", function() {
    livereload.listen();
    gulp.watch(SCSSFLODER, ['base64']);

});

gulp.task('base64', ['sass'], function() {
    var config = {
        src: CSSFLODER + '/*.css',
        dest: CSSFLODER,
        options: {
            baseDir: "img",
            extensions: ['png'],
            maxImageSize: 50 * 1024, // bytes
            debug: true
        }
    };

    return gulp.src(config.src)
        .pipe(base64(config.options))
        .pipe(gulp.dest(config.dest));

});
```