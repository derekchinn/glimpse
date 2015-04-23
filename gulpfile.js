var gulp = require('gulp');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var source = require('vinyl-source-stream');
var reactify = require('reactify');
var browserify = require('browserify');

var src = {
    js: './client/**/*.js',
    sass: './client/sass/*.scss'
};
var dest = {
    js: './server/static/js',
    sass: './server/static/css'
};

gulp.task('sass', function () {
    return gulp.src(src.sass)
        .pipe(sass())
        .pipe(gulp.dest(dest.sass));
});

gulp.task('browserify', function () {
    var b = browserify();
    b.transform(reactify);
    b.add('./client/main.js');
    return b.bundle()
        .pipe(source('main.js'))
        .pipe(gulp.dest(dest.js));
});

gulp.task('watch', function () {
    gulp.watch(src.sass, ['sass']);
    gulp.watch(src.js, ['browserify']);
});

// Targets
gulp.task('default', ['watch', 'sass', 'browserify']);
gulp.task('build', ['sass', 'browserify']);