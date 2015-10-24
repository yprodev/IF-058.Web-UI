/**
 * Created by Home on 21.09.2015.
 */

var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    csscomb = require('gulp-csscomb'),
    cssmin = require('gulp-cssmin'),
    less = require('gulp-less'),
    sass = require('gulp-sass'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant')

var path = {
	build:{
		css:'build/css/',
		js:'build/js',
		html:'build',
		img:'build/img'
	},
	src:{
		css:'src/scss/**/*.scss',
		js:'src/js/**/*.js',
		html:'src/**/*.html',
		img:'src/img/*'
	},
	watch:{
		css:'src/scss/**/*.scss',
		js:'src/js/**/*.js',
		html:'src/**/*.html'
	}
}

gulp.task('less',  function () {
    gulp.src('bower_components/bootstrap/less/bootstrap.less')
        .pipe(less())
        .pipe(concat('bootstrap.css'))
        .pipe(gulp.dest('css'))
});

gulp.task('js', function() {
	gulp.src(path.src.js)
		.pipe(concat('script_min.js'))
		.pipe(uglify())
		.pipe(gulp.dest(path.build.js))
})

gulp.task('html', function() {
	gulp.src(path.src.html)
		.pipe(gulp.dest(path.build.html))
})

gulp.task('img', function() {
	gulp.src(path.src.img)
		.pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
		.pipe(gulp.dest(path.build.img))
})

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
		gulp.run('js');
	});
	gulp.watch(path.watch.html, function(event) {  
		gulp.run('html');
	});
});

