var gulp         = require('gulp');
var pump         = require('pump');
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS     = require('gulp-clean-css');
var uglify       = require('gulp-uglify');
var concat       = require('gulp-concat');
var shell        = require('gulp-shell');
var browserSync  = require('browser-sync').create();

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

gulp.task('stylesheets', function (css) {
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
    gulp.dest('assets/css'),
    shell('gulp build'),
    browserSync.stream()
  ],
    css
  );
});

gulp.task('javascript', function (js) {
  pump([
    gulp.src([
      'src/js/*.js'
    ]),
    uglify(),
    concat('ilercapp.js'),
    gulp.dest('assets/js'),
    shell('gulp build'),
    browserSync.stream()
  ],
    js
  );
});

gulp.task('build', shell.task([
  'chcp 65001',
  'jekyll build'
]));

gulp.task('serve', ['sass', 'stylesheets', 'javascript'], function() {
  browserSync.init({
    server: "./_site"
  });

  gulp.watch("src/scss/**/*.scss", ['sass']);
  gulp.watch('src/css/**/*.css', ['stylesheets']);
  gulp.watch('src/js/**/*.js', ['javascript']);
  gulp.watch([
    '_i18n/**/*.html',
    '_includes/**/*.html',
    '_layouts/**/*.html',
    '_posts/**/*.{html, md}'
  ], ['build', browserSync.reload]);
  // gulp.watch("_site/**/*.html").on('change', browserSync.reload);
});
