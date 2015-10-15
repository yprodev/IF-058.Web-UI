/**
 * Created by Home on 21.09.2015.
 */

var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    csscomb = require('gulp-csscomb'),
    cssmin = require('gulp-cssmin'),
    less = require('gulp-less'),
    sass = require('gulp-sass')

var path = {
	build:{
		css:'build/css/',
		js:'build/js',
		html:'build/',
		img:'build/img'
	},
	src:{
		css:'src/scss/**/*.scss',
		js:'src/js',
		html:'src/',
		img:'src/img'
	},
	watch:{
		css:'src/scss/**/*.scss',
		js:'src/js/**/*.js',
		html:'src/**/*.html'
	}
}

gulp.task('1', function () {
		console.log('1 task');
});
gulp.task('2', function () {
		console.log('1 task');
});
gulp.task('3', function () {
		console.log('1 task');
});
gulp.task('less',  function () {
    gulp.src('bower_components/bootstrap/less/bootstrap.less')
        .pipe(less())
        .pipe(concat('bootstrap.css'))
        .pipe(gulp.dest('css'))
});

gulp.task('sass', function() {
	gulp.src(path.src.css)
		.pipe(sass())
		.pipe(csscomb())
		.pipe(cssmin())
		.pipe(concat('main.css'))
		.pipe(gulp.dest(path.build.css))
})

gulp.task('libs', function() {
    gulp.src('./bower.json')
        .pipe(gulp.dest('libs'))
});

gulp.task('default', function() {
	gulp.watch(path.watch.css, function(event) {  
		gulp.run('sass');
	});
	gulp.watch(path.watch.js, function(event) {  
		gulp.run('2');
	});
	gulp.watch(path.watch.html, function(event) {  
		gulp.run('3');
	});
});

