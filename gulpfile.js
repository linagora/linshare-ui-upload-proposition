var gulp = require('gulp');

var closureCompiler = require('gulp-closure-compiler');
var livereload = require('gulp-livereload');
var inject = require('gulp-inject');
var bowerFiles = require('gulp-bower-files');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var clean = require('gulp-clean');
var jshint = require('gulp-jshint');
var gutil = require('gulp-util');
var filter = require('gulp-filter');

var sync = require('sync-pkg');

var paths = {
  src: 'app',
  dest: 'dist',
  ngComponents: ['app/ng_components/**/*.js', '!app/ng_components/**/*.spec.js'],
  states: ['app/states/**/*.js', '!app/states/**/*.pageobject.js', '!app/states/**/*.scenario.js', '!app/states/**/*.spec.js'],
  main: 'app/js/app.js',
  config: 'app/js/config.js',
  bowerComponents: 'bower_components',
  images: 'app/img/**/*'
};

gulp.task('clean', function(){
  return gulp.src(paths.dest, {read: false})
    .pipe(clean());
});

// Sync package.json & bower.json
gulp.task('sync', ['clean'], function(){
  sync({
    include: ['name', 'version', 'description', 'license', 'homepage'],
    exclude: ['main']
  });
  gulp.src('bower.json')
    .pipe(gulp.dest(paths.dest));
});

gulp.task('compile', ['clean', 'sass', 'lint'], function() {
  return gulp.src([].concat.apply([], [
      paths.ngComponents,
      paths.states,
      paths.main,
      paths.bowerComponents + '/closure-library-github/closure/goog/base.js'
    ]))
    .pipe(closureCompiler({
      compilerPath: paths.bowerComponents + '/closure-compiler/compiler.jar',
      fileName: 'app.js',
      compilerFlags: {
        compilation_level: 'SIMPLE_OPTIMIZATIONS',
        language_in: 'ECMASCRIPT5_STRICT',
        externs: [paths.bowerComponents + '/closure-compiler-github/contrib/externs/angular-1.2.js'],
        manage_closure_dependencies: true,
        generate_exports: true,
        angular_pass: true
      }
    }))
    .pipe(gulp.dest(paths.dest));
});

gulp.task('sass', ['clean'], function() {
  return gulp.src(paths.src + '/styles/main.scss')
    .pipe(sass())
    .pipe(gulp.dest(paths.dest + '/styles/'));
});

gulp.task('lint', function() {
  return gulp.src([paths.src + '/**/*.js', '!' + paths.src + '/styles/**/*'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('inject', ['clean', 'compile', 'concat'], function() {
  return gulp.src(paths.src + '/index.html')
    // Ordered css
    .pipe(inject(gulp.src([paths.dest + '/**/normalize.css', paths.dest + '/**/*.css'], {read: false}),
      {
        ignorePath: paths.dest,
        addRootSlash: false
      }
    ))
    // Ordered js
    .pipe(inject(gulp.src([
        paths.dest + '/vendor.js',
        paths.dest + '/app.js',
        paths.dest + '/config.js'
      ], {read: false}),
      {
        ignorePath: paths.dest,
        addRootSlash: false
      }
    ))
    .pipe(gulp.dest(paths.dest));
});

gulp.task('concat', ['clean'], function() {
  return bowerFiles({
    env: process.env.NODE_ENV || 'development'
  })
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest(paths.dest + '/'));
});

gulp.task('copy', ['clean'], function() {
  gulp.src(paths.src + '/states/**/*.html')
    .pipe(gulp.dest(paths.dest + '/states/'));
  gulp.src(paths.src + '/styles/linshare/fonts/**/*')
    .pipe(gulp.dest(paths.dest + '/styles/linshare/'));
  gulp.src([
    paths.bowerComponents + '/normalize-css/normalize.css',
    paths.src + '/styles/AdminLTE/css/bootstrap.css',
    paths.src + '/styles/AdminLTE/css/font-awesome.css',
    paths.src + '/styles/AdminLTE/css/AdminLTE.css',
    paths.bowerComponents + '/angular-loading-bar/build/loading-bar.min.css'
  ])
    .pipe(gulp.dest(paths.dest + '/styles/'));
  gulp.src(paths.src + '/i18n/**/*')
    .pipe(gulp.dest(paths.dest + '/i18n/'));
  gulp.src(paths.config)
    .pipe(gulp.dest(paths.dest));
});

gulp.task('connect', function(next) {
  var connect = require('connect');
  var server = connect();
  server.use(connect.static(paths.dest)).listen(process.env.PORT || 3501, next);
});

// Rerun the task when a file changes
gulp.task('watch', ['build'], function() {
  var server = livereload();
  gulp.watch(paths.src + '/**/*', ['build']);
  //gulp.watch(paths.dest + '/**').on('change', function(file) {
  //  server.changed(file.path);
  //});
});

gulp.task('build', ['sync', 'copy', 'concat', 'inject']);
gulp.task('serve', ['build', 'connect', 'watch']);

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['build']);
