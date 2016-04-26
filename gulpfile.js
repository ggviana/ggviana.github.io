const browserSync = require('browser-sync')
const gulp        = require('gulp')
const babel       = require('gulp-babel')
const concat      = require('gulp-concat')
const jade        = require('gulp-jade')
const rm          = require('gulp-rm')
const stylus      = require('gulp-stylus')
const uglifyJS    = require('gulp-uglify')
const uglifyCSS   = require('gulp-uglifycss')
const reload      = browserSync.reload
const projects    = require('./src/projects')

const BUILD_DIR   = '.'
const SOURCE_DIR  = './src'
const STYLE_DIR   = './src/styles'

const STYLES = [
  `${BUILD_DIR}/node_modules/normalize.css/normalize.css`,
  `${STYLE_DIR}/base.styl`,
  `${STYLE_DIR}/general.styl`,
  `${STYLE_DIR}/icons.styl`,
  `${STYLE_DIR}/projects.styl`,
  `${STYLE_DIR}/typing.styl`,
]

gulp.task('default', ['watch'])

/**
  Watch
*/
gulp.task('watch', ['browser-sync'], () => {
  gulp.watch(`${SOURCE_DIR}/*.jade`, ['jade'])
  gulp.watch(`${SOURCE_DIR}/*.js`, ['dev:js'])
  gulp.watch(`${STYLE_DIR}/*.styl`, ['dev:css'])
  gulp.watch(`${BUILD_DIR}/*`).on('change', reload)
})

/**
  Common
*/
gulp.task('clean', () => gulp
    .src([
      `${BUILD_DIR}/index.html`,
      `${BUILD_DIR}/style.css`,
      `${BUILD_DIR}/app.js`
      ], { read: false })
    .pipe(rm())
)

gulp.task('jade', () => gulp
  .src(`${SOURCE_DIR}/index.jade`)
  .pipe(jade({
    locals: {
      projects
    }
  }))
  .pipe(gulp.dest(`${BUILD_DIR}/`))
)

/**
  Development
*/
gulp.task('dev', ['clean', 'jade', 'dev:js', 'dev:css'])

gulp.task('dev:js', () => gulp
    .src(`${SOURCE_DIR}/app.js`)
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest(`${BUILD_DIR}/`))
)

gulp.task('dev:css', () => gulp
    .src(STYLES)
    .pipe(stylus())
    .pipe(concat('style.css'))
    .pipe(gulp.dest(`${BUILD_DIR}/`))
)

gulp.task('browser-sync', ['dev'], () => browserSync
    .init({
      server: {
        baseDir: `${BUILD_DIR}/`
      }
    })
)

/**
  Production
*/
gulp.task('build', ['clean', 'jade', 'build:js', 'build:css'])

gulp.task('build:js', () => gulp
    .src(`${SOURCE_DIR}/app.js`)
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(uglifyJS())
    .pipe(gulp.dest(`${BUILD_DIR}/`))
)

gulp.task('build:css', () => gulp
    .src(STYLES)
    .pipe(stylus())
    .pipe(concat('style.css'))
    .pipe(uglifyCSS())
    .pipe(gulp.dest(`${BUILD_DIR}/`))
)