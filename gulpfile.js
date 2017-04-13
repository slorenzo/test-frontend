var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('autoprefixer'),
    cssmin = require('gulp-cssmin'),
    postcss = require('gulp-postcss'),
    rename = require('gulp-rename'),
    lost = require('lost'),
    jade = require('gulp-jade'),
    nib = require('nib'),
    del = require('del'),
    rupture = require('rupture'),
    coffee = require('gulp-coffee'),
    plumber = require('gulp-plumber'),
    concat = require('gulp-concat'),
    imagemin = require('gulp-imagemin'),
    clean = require('gulp-clean'),
    ghPages = require('gulp-gh-pages'),
    browserSync = require('browser-sync').create();

var paths = {
  cssSource: 'src/css/',
  cssDestination: 'public/css/',
  templatesSource: 'src/',
  templatesDestination: 'public/',
  jsSource: 'src/js/',
  jsDestination: 'public/js/',
  imgSource: 'src/img/',
  imgDestination: 'public/img/',
  dist: 'public'
};

gulp.task('default', ['build-all'], function(){
  browserSync.init({
    server: {
      baseDir: "./public"
    }
  });

  gulp.watch(paths.cssSource + '**/*.styl', ['css']);
  gulp.watch(paths.templatesSource + '**/*.jade', ['templates']);
  gulp.watch(paths.jsSource + '**/*.coffee', ['js']);
  gulp.watch(paths.imgSource + '**/*', ['img']);
});

gulp.task('build-all', ['css', 'templates', 'js', 'img']);

gulp.task('js', ['coffee']);

gulp.task('img', function() {
  return gulp.src(paths.imgSource + '*')
    .pipe(plumber())
    .pipe(imagemin())
    .pipe(gulp.dest(paths.imgDestination));
});

gulp.task('coffee', function() {
  return gulp.src(paths.jsSource + '**/*.coffee')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(coffee({bare: true}))
    .pipe(concat('main.js'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.jsDestination))
    .pipe(browserSync.stream());
});

gulp.task('templates', function() {
  return gulp.src(paths.templatesSource + '*.jade')
    .pipe(plumber())
    .pipe(jade())
    .pipe(gulp.dest(paths.templatesDestination))
    .pipe(browserSync.stream());
});

gulp.task('css', function() {
  return gulp.src(paths.cssSource + 'index.styl')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(stylus({
          paths:  ['node_modules'],
          import: ['nib'],
          use: [nib(), rupture()]
        }))
    .pipe(postcss([
      lost(),
      autoprefixer()
    ])) // TODO: https://github.com/peterramsing/lost/wiki/Installation#gulp
    .pipe(cssmin())
    .pipe(rename({
      basename: 'styles',
      suffix: '.min',
      extname: ".css"

    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.cssDestination))
    .pipe(browserSync.stream());
});

gulp.task('clean', function () {
  return del([paths.dist + '**/*']);
});

gulp.task('deploy', function() {
  return gulp.src('./public/**/*')
    .pipe(ghPages());
});

