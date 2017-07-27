var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var browserSync = require('browser-sync');
var imagemin = require('gulp-imagemin');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var ngAnnotate  = require('gulp-ng-annotate');
var concatit = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var bourbon = require('node-bourbon').includePaths;
var livereload = require('gulp-livereload');
var notify      = require('gulp-notify');

var paths = {
  scss: './assets/styles/**/*.scss',
  jsFiles: './assets/js/source/*.js',
  jsVend: './assets/js/vendor/*.js',
  jsDest: './assets/js/',
  images: ''
};

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('./assets/images/src/**/*.{png,jpg,gif}', [ 'imagemin' ]);
  gulp.watch( paths.jsFiles, [ 'jshint', 'uglify' ]);
  gulp.watch( paths.scss, [ 'sass' ]);
  gulp.watch('build/style.css', [ 'postcss']);

});

gulp.task('sass', function() {
  return gulp.src(paths.scss)
  .pipe(sass({
        includePaths: ['styles'].concat(bourbon)
    }))
   .pipe(gulp.dest('build/'));
});

gulp.task('postcss', function() {
  var plugins = [
    autoprefixer({browsers: ['> 1%'], cascade: false})
  ];
  gulp.src('build/*.css')
    .pipe(postcss(plugins))
    .pipe(gulp.dest('.'))
    .pipe(livereload());
});

gulp.task('jshint', function () {
  return gulp
    .src( paths.jsFiles )
    .pipe( jshint() )
    .pipe( jshint.reporter('default') )
  ;
});


gulp.task('uglify', function () {
  return gulp
    .src( [paths.jsFiles, paths.jsVend ] )
    // .pipe(sourcemaps.init())
    .pipe(concatit('main'))
    .pipe(ngAnnotate())
    .on('error', notify.onError("Error: <%= error.message %>"))
    .pipe(uglify())
    .on('error', notify.onError("Error: <%= error.message %>"))
    .pipe(rename({
        extname: ".min.js"
    }))
    // .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest(paths.jsDest))
    // .pipe(notify('Uglified JavaScript (' + moment().format('MMM Do h:mm:ss A') + ')'));
});

// gulp.task('deploy', function () {
//   return gulp
//     .src('[object Object]')
//     .pipe(gulp.dest('staging'))
//   ;
// });

gulp.task('imagemin', () =>
	gulp.src('assets/images/src/*')
		.pipe(imagemin())
		.pipe(gulp.dest('assets/images/'))
);

gulp.task('browserSync', function () {
    browserSync.init({
      proxy: "local.testing.dev"
  });
});

gulp.task('default', ["sass", "postcss", "jshint", "uglify", "imagemin", "watch"]);
