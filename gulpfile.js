var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    jsmin = require('gulp-jsmin'),
    reload = browserSync.reload,
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    removeEmptylines = require('gulp-remove-empty-lines'),
    nodemon = require('gulp-nodemon');

gulp.task('sass', function() {
  return gulp.src('./src/sass/main.scss')
      .pipe(sass())
      .pipe(autoprefixer())
      .pipe(sass({outputStyle:'compressed'}).on('error', sass.logError))
      .pipe(rename({suffix:'.min'}))
      .pipe(gulp.dest('./public/stylesheets'))
      .pipe(reload({stream:true}));
});

gulp.task('jsmin', function() {
  gulp.src('./src/js/*.js')
      .pipe(jsmin())
      .pipe(removeEmptylines())
      .pipe(rename({suffix:'.min'}))
      .pipe(gulp.dest('./public/javascripts'))
      .pipe(reload({stream:true}));
});

gulp.task('browser-sync',['nodemon'], function () {
    browserSync.init(null, {
      proxy: 'http://localhost:3000',
      files: ['public/**/*.*', 'views/*.*'],
      browser: 'google chrome',
      notify: false,
      port: 5000
    });
});

gulp.task('nodemon', function (cb) {
    var called = false;
    return nodemon({
      script: 'bin/www'
    }).on('start', function() {
      if (!called) {
        cb();
        called = true;
      }
    });
});

gulp.task('watch', ['browser-sync', 'sass', 'jsmin'], function () {
  gulp.watch(['./src/sass/*.*'], ['sass']);
  gulp.watch(['./src/js/*.*'], ['jsmin']);
});
