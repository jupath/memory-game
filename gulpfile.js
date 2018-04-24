const gulp = require('gulp');
const uglify = require('gulp-uglify');
const sass = require('gulp-ruby-sass');
const prefix = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

// Directories and paths
const dirs = {
  src: 'src',
  dest: 'build'
};

const paths = {
  scssSrc: `${dirs.src}/scss/**/*.scss`,
  cssDest: `${dirs.dest}/css/`,
  jsSrc: ['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.min.js', 'node_modules/skrollr/dist/skrollr.min.js', `${dirs.src}/js/*`],
  jsDest: `${dirs.dest}/js/`
}

// Compile sass into CSS & auto-inject into browsers
gulp.task('styles', () => {
  return sass(paths.scssSrc, {
      style: 'compressed'
      }).on('error', sass.logError)
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(prefix('last 2 versions'))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(paths.cssDest))
      .pipe(browserSync.stream());
});

// Scripts
gulp.task('scripts', () => {
  return gulp.src(paths.jsSrc)
      .pipe(gulp.dest(paths.jsDest))
      .pipe(browserSync.stream());
});

// Watch
gulp.task('watch', () => {
  browserSync.init({
      server: "./"
  });
  gulp.watch(paths.jsSrc, ['scripts']);
  gulp.watch(paths.scssSrc, ['styles']);
  gulp.watch("./*.html").on('change', browserSync.reload);
});

// Default
gulp.task('default', ['scripts', 'styles', 'watch']);