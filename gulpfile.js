var gulp = require("gulp");
var connect= require('gulp-connect'); 
var sass = require('gulp-sass'); 
var sourcemaps = require("gulp-sourcemaps");
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var cleanCss = require('gulp-clean-css');

gulp.task("copy-img",function(){
    gulp.src("img/*.*")
    .pipe(gulp.dest("dist/img"));
});
gulp.task('copy-html',function(){ 
    return gulp.src('*.html')
    .pipe(gulp.dest("dist/html"))
    .pipe(connect.reload());//自动刷新
 });
 gulp.task('copy-js',function(){ 
    return gulp.src('js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest("dist/js"))
 });

gulp.task('sass',function(){
	return gulp.src('sass/*.scss')
    .pipe(sourcemaps.init())// 
    .pipe(sass({outputStyle: 'compressed'}))
	.pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload())   
});

gulp.task('server',function(){
   connect.server({ 
       root:"dist",
       livereload:true 
   }); 
});

gulp.task('watch',function(){//把要监听的东西放进去，第一个参数路径，第二个是gulp要执行的命令
    gulp.watch('*.html',['copy-html']); 	
    gulp.watch('img/**',['copy-img']); 	
    gulp.watch("js/*js",["copy-js"])
    gulp.watch("sass/*.scss",["sass"]);
});

/* gulp.task('scripts',function(){ 
	return gulp.src(['yi.js','er.js'])
    .pipe(concat('vendor.js')) 
    .pipe(gulp.dest('dist/js')) 
    .pipe(uglify())
    .pipe(rename('vendor.min.js')) 
    .pipe(gulp.dest('dist/js'));

});  */
gulp.task('default',['server','watch']); //实现自动刷新和监听一体化





















