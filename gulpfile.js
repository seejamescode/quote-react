var gulp = require('gulp');
var sass = require('gulp-sass');
var nano = require('gulp-cssnano');
var rename = require('gulp-rename');
var connect = require('gulp-connect');
var uglify = require('gulp-uglify');
var replace = require('gulp-replace');

gulp.task('images', function() {
    return gulp.src('images/**')
        .pipe(gulp.dest('static/images'))
        .pipe(gulp.dest('production/images'))
});

/* Compile Our Sass */
gulp.task('sass', function() {
    return gulp.src('scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('static/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(nano())
        .pipe(gulp.dest('production/css'))
});

gulp.task('js', function() {
    return gulp.src('js/*.js')
        .pipe(gulp.dest('static/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('production/js'))
});

gulp.task('component_js', function() {
    return gulp.src([
                     'bower_components/jquery/dist/jquery.min.js',
                     ])
        .pipe(gulp.dest('static/js'))
        // .pipe(rename({suffix: '.min'}))
        // .pipe(uglify())
        .pipe(gulp.dest('production/js'))
});

gulp.task('component_css', function() {
    return gulp.src([
                     'bower_components/normalize.css/normalize.css'
                     ])
        .pipe(gulp.dest('static/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(nano())
        .pipe(gulp.dest('production/css'));
});

gulp.task('html', function() {
    var opts = {
        conditionals: true,
        spare:true
    };

    return gulp.src('html/*.html')
        .pipe(gulp.dest('static'))
        .pipe(replace('.css', '.min.css'))
        .pipe(replace('main.js', 'main.min.js'))
        .pipe(gulp.dest('production'))
});

gulp.task('webserver', function() {
    connect.server({
        port: 5000,
        root: 'production'
    });
});

/* Watch Files For Changes */
gulp.task('watch', function() {
    gulp.watch('html/*.html', ['html']);
    gulp.watch('images/**', ['images']);
    gulp.watch('scss/*.scss', ['sass']);
    gulp.watch('js/*.js', ['js']);
});

gulp.task('default', ['html', 'images', 'sass', 'js', 'component_js', 'component_css', 'watch', 'webserver']);