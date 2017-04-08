var gulp = require("gulp");
var sass = require("gulp-sass");
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var livereload = require('gulp-livereload');

// 资源目录
var SCSSFLODER = "./assets/scss/**/*.*",
    CSSFLODER = './assets/css',
    MAPSFLODER = './';

// 任务
gulp.task("sass", function(){
    return gulp.src(SCSSFLODER)
        .pipe(sourcemaps.init())
        .pipe(autoprefixer({
            browsers: ['> 5%'],
            cascade: false
        }))
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write(MAPSFLODER))
        .pipe(gulp.dest(CSSFLODER))
        .pipe(livereload());
});

gulp.task("auto", function () {
    livereload.listen();
    gulp.watch(SCSSFLODER, ['sass']);

});