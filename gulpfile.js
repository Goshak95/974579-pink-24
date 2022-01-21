import gulp from 'gulp';
import plumber from 'gulp-plumber';
import less from 'gulp-less';
import postcss from 'gulp-postcss';
import csso from 'postcss-csso';
import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';
import rename from 'gulp-rename';
import htmlmin from 'gulp-htmlmin';
import terser from 'gulp-terser';
import squoosh from 'gulp-libsquoosh';
import svgo from 'gulp-svgmin';

// Styles

const styles = () => {
  return gulp.src('source/less/style.less', { sourcemaps: true })
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
}

// HTML
const html = () =>
  gulp.src('source/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('build'));

// Scripts
const scripts = () =>
  gulp.src('source/js/*.js')
    .pipe(terser())
    .pipe(gulp.dest('build/js'));


// Server

const server = (done) => {
  browser.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
    port: 3005,
  });
  done();
}

// Images
const optimizeImages = () =>
  gulp.src('source/img/**/*.{jpg,png}')
  .pipe(squoosh())
  .pipe(gulp.dest('build/img'));

// SVG
const svg = () =>
  gulp.src('source/img/icons/*.svg')
    .pipe(svgo())
    .pipe(gulp.dest('build/img/icons'));

// Copy

const copy = (done) =>
  gulp.src([
    'source/fonts/*.{woff2,woff}',
    'source/*.ico'
  ], {
    base: 'source'
  })
    .pipe(gulp.dest('build'));


// Watcher

const watcher = () => {
  gulp.watch('source/less/**/*.less', gulp.series(styles));
  gulp.watch('source/*.html').on('change', browser.reload);
}


export default gulp.series(
  html, styles, scripts, svg, optimizeImages, copy, server, watcher
);
