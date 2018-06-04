// Gulp + Consola
const gulp  = require('gulp');
const shell = require('gulp-shell');

// Estils
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS     = require('gulp-clean-css');
const sass         = require('gulp-sass');

// Fitxers
const concat = require('gulp-concat');

// HTML
const htmlmin = require('gulp-htmlmin');

// JavaScript
const uglify = require('gulp-uglify');

/*
| ------------------------------------------------------------------------------
| Estils
| ------------------------------------------------------------------------------
| Comandes gulp destinades a la compilació i millora del codi relacionat amb els
| fulls d'estils.
|
*/

/*
| SASS
----------------------------------------------------------------------------- */
gulp.task('sass', function() {
  return gulp.src([
    './src/scss/app.scss'
  ])
  .pipe(sass())
  .pipe(gulp.dest('./src/css'))
});

/*
| CSS
----------------------------------------------------------------------------- */
gulp.task('css', function () {
  return gulp.src([
    './src/css/app.css'
  ])
  .pipe(autoprefixer({
    browsers: ['last 3 versions'],
    cascade: true
  }))
  .pipe(cleanCSS({
    compatibility: '*'
  }))
  .pipe(concat('ilercapp.css'))
  .pipe(gulp.dest('./assets/css'))
});

/*
| Compilar estils: execució ordenada:
|   1. gulp sass
|   2. gulp css
----------------------------------------------------------------------------- */
gulp.task('styles', shell.task('gulp sass && gulp css'));

/*
| ------------------------------------------------------------------------------
| JavaScript
| ------------------------------------------------------------------------------
| Comandes gulp destinades a la compilació i millora del codi relacionat amb els
| fitxers de JavaScript.
|
*/
gulp.task('javascript', function () {
  return gulp.src([
    './node_modules/axios/dist/axios.min.js',
    './node_modules/vue/dist/vue.min.js',
    './src/js/app.js',
    './src/js/vue/*.js'
  ])
  .pipe(uglify())
  .pipe(concat('ilercapp.js'))
  .pipe(gulp.dest('./assets/js'))
});

/*
| ------------------------------------------------------------------------------
| Compilació del lloc web
| ------------------------------------------------------------------------------
| Comandes gulp destinades a la compilació general del lloc web.
|   - Jekyll build (shell)
|   - Minificar HTML
|
*/

/*
| Jekyll build
----------------------------------------------------------------------------- */
gulp.task('build', shell.task([
  'jekyll build'
  // 'jekyll build --config _config.yml,_config-prod.yml'
]));

/*
| Minificar HTML
----------------------------------------------------------------------------- */
gulp.task('html', function () {
  return gulp.src(
    './_site/**/*.html', {base: './'}
  )
  .pipe(htmlmin({
    removeComments: true,
    collapseWhitespace: true,
    minifyCSS: true,
    minifyJS: true,
    minifyURLs: true,
  }))
  .pipe(gulp.dest('./'))
});

/*
| Service Worker
|   El service worker es compila amb Jekyll donat que necessitem certa Informació
|   dels fitxers de configuració .yml. Un cop compilat ens interessa tractar el
|   fitxer.
----------------------------------------------------------------------------- */
gulp.task('sw', function () {
  return gulp.src(
    './_site/sw.js', {base: './'}
  )
  .pipe(uglify())
  .pipe(gulp.dest('./'))
});

/*
| Compilació: execució ordenada:
|   1. gulp build
|   2. gulp sw
|   3. gulp html
----------------------------------------------------------------------------- */
gulp.task('site', shell.task('gulp build && gulp sw && gulp html'));

/*
| ------------------------------------------------------------------------------
| Gulp
| ------------------------------------------------------------------------------
| Comandes propies de gulp, aquestes preparades per executar les comandes anteriors
| fent-ne ús de la shell.
|
| $ gulp       => shell (+ watch)
| $ gulp watch => S'executaran les comandes pertinents segons les modificacions
|                 que es duguin a terme als fitxers.
|
*/

/*
| $ gulp => execució ordenada de totes les comandes shell:
|   1. gulp styles     => Compila SASS + CSS
|   2. gulp javascript => Compila JavaScript
|   3. gulp site       => Executa "jekyll build"
|                         + Compila Service Worker
|                         + Compila HTML (minifica)
----------------------------------------------------------------------------- */
gulp.task('default', shell.task([
  'gulp styles',
  'gulp javascript',
  'gulp site'
]));

/*
| $ gulp watch
----------------------------------------------------------------------------- */
gulp.task('watch', function() {
  gulp.watch('./src/css/**/*.css', gulp.series('css', 'build', 'html'));
  gulp.watch('./src/scss/**/*.scss', gulp.series('sass', 'build', 'html'));
  gulp.watch('./src/js/*.js', gulp.series('javascript', 'build', 'html'));
  gulp.watch('./src/js/vue/*.js', gulp.series('javascript', 'build', 'html'));
  gulp.watch('./sw.js', gulp.series('sw', 'build', 'html'));
  gulp.watch([
    './*.html',
    './.htaccess',
    './_feed/**/*.json',
    './_feed/**/*.xml',
    './_i18n/**/*.html',
    './_includes/**/*.html',
    './_layouts/**/*.html',
    './_pages/**/*.html',
    './_pages/**/*.md',
    './_posts/**/*.html',
    './_posts/**/*.md',
  ], gulp.series('build', 'html'));
  gulp.watch('./**/*.yml', gulp.series('build', 'html'));
});
