var gulp     = require('gulp');
var pump     = require('pump');
var sass     = require('gulp-sass');
var uglify   = require('gulp-uglify');
var concat   = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');

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
    cleanCSS({compatibility: 'ie8'}),
    concat('ilercapp.css'),
    gulp.dest('assets/css')
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
    gulp.dest('assets/js')
  ],
    js
  );
});

gulp.task('watch', function(){
  gulp.watch('src/scss/**/*.scss', ['sass']);
  gulp.watch('src/css/**/*.css', ['stylesheets']);
  gulp.watch('src/js/**/*.js', ['javascript']);
});
