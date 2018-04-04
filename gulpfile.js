var gulp         = require('gulp');
var pump         = require('pump');
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS     = require('gulp-clean-css');
var uglify       = require('gulp-uglify');
var concat       = require('gulp-concat');
var htmlmin      = require('gulp-htmlmin');
var shell        = require('gulp-shell');

/*
# Estils
*******************************************************************************/
/*
## SASS
----------------------------------------------------------------------------- */
gulp.task('sass', function(scss) {
  pump([
    gulp.src([
      'src/scss/**/*.scss'
    ]),
    sass(),
    gulp.dest('src/css')
  ],
    scss
  );
});

/*
## CSS
----------------------------------------------------------------------------- */
gulp.task('css', function (css) {
  pump([
    gulp.src([
      'src/css/**/*.css'
    ]),
    autoprefixer({
      browsers: ['last 3 versions'],
      cascade: true
    }),
    cleanCSS({compatibility: '*'}),
    concat('ilercapp.css'),
    gulp.dest('assets/css')
  ],
    css
  );
});

/*
## Estils: execució ordenada:
   1. gulp sass
   2. gulp css
----------------------------------------------------------------------------- */
gulp.task('styles', shell.task('gulp sass && gulp css'));

/*
# JavaScript
*******************************************************************************/
gulp.task('javascript', function (js) {
  pump([
    gulp.src([
      'src/js/*.js'
    ]),
    uglify(),
    concat('ilercapp.js'),
    gulp.dest('assets/js')
  ],
    js
  );
});

/*
# Site
*******************************************************************************/
/*
## Jekyll build
Si "jekyll build/serve" dona un error de codificació de caràcters, primer s'ha
d'executar "chcp 65001" i desprès tornar a executar la comanda de jekyll.
----------------------------------------------------------------------------- */
gulp.task('build', shell.task([
  'jekyll build'
]));

/*
## Minificar HTML
----------------------------------------------------------------------------- */
gulp.task('html', function (html) {
  pump([
    gulp.src('_site/**/*.html', {base: './'}),
    htmlmin({
      removeComments: true,
      collapseWhitespace: true
    }),
    gulp.dest('./')
  ],
    html
  );
});

/*
## Site: execució ordenada:
   1. gulp build
   2. gulp html
----------------------------------------------------------------------------- */
gulp.task('site', shell.task('gulp build && gulp html'));

/*
# Gulp
*******************************************************************************/
gulp.task('default', shell.task([
  'gulp styles',
  'gulp javascript',
  'gulp watch'
]));

gulp.task('watch', ['site'], function() {
  gulp.watch('src/scss/**/*.scss', ['sass']);
  gulp.watch('src/css/**/*.css', ['css']);
  gulp.watch('src/js/**/*.js', ['javascript']);
  gulp.watch([
    '_i18n/**/*.html',
    '_includes/**/*.html',
    '_layouts/**/*.html',
    '_posts/**/*.{html, md}',
    './*.html',
  ], ['site']);
  // gulp.watch("_site/**/*.html", ['html']);
});
