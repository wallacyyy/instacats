import gulp from 'gulp'
import browserify from 'browserify'
import reactify from 'reactify'
import source from 'vinyl-source-stream'
import babelify from 'babelify'
import uglify from 'gulp-uglify'

gulp.task('browserify', () => {
  return browserify('./src/main.js')
    .transform(babelify)
    .transform(reactify)
    .bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest('dist/js'))
})

gulp.task('copy', () => {
  gulp.src('src/index.html').pipe(gulp.dest('dist'))
  gulp.src('src/assets/**/*.*').pipe(gulp.dest('dist/assets'))
})

gulp.task('default', ['browserify', 'copy'], () => {
  return gulp.watch('src/**/*.*', ['browserify', 'copy'])
})

gulp.task('compress', ['browserify'], () => {
  return gulp.src('dist/js/main.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
})

gulp.task('build', ['copy', 'browserify', 'compress'])
