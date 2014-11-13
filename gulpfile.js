var gulp        = require('gulp'),
    templates   = require('gulp-angular-templatecache'),
    minifyHTML  = require('gulp-minify-html'),
    jshint      = require('gulp-jshint'),
    clean       = require('gulp-clean'),
    rjs         = require('gulp-requirejs'),
    uglify      = require('gulp-uglify'),
    concat      = require('gulp-concat'),
    htmlReplace = require('gulp-html-replace'),
    tmpl        = require('gulp-template'),
    rename      = require('gulp-rename'),
    sass        = require('gulp-sass'),
    replace     = require('gulp-replace'),
    _           = require('lodash'),
    connect     = require('gulp-connect'),
    prefix      = require('gulp-autoprefixer'),
    fs          = require('fs');

var props = fs.readFileSync('project.properties', 'utf-8');
var version = props.match(/version="([^\n]*)"/)[1];

BUILD_VERSION = version + '-dev';

gulp.task('default', ['compilejs', 'copy', 'sass'], function() {
    gulp.src('app/js/nocache.tmpl')
        .pipe(tmpl({
            version: BUILD_VERSION
        }))
        .pipe(rename('nocache.js'))
        .pipe(gulp.dest('build'));

    return gulp.src('app/index.html')
        .pipe(htmlReplace({
            'css': 'nocache.css',
            'js': BUILD_VERSION + '/appmonitor.js'
        }))
        .pipe(gulp.dest('build'));
});

// Alias for the default task
gulp.task('package', ['default']);

gulp.task('clean', function(cb) {
    gulp.src('build')
        .pipe(clean())
        .on('end', cb);
});

gulp.task('copy', ['clean'], function() {
    var paths = [
        'app/img/**',
        'app/fonts/**',
        'app/*.xml'
    ];
    return gulp.src(paths, {
        base: './app'
    }).pipe(gulp.dest('build'));
});

gulp.task('sass', ['clean'], function() {
    function nocache(){
        gulp.src('app/js/tmpl_nocache.css')
            .pipe(tmpl({
                appmonitor_version: BUILD_VERSION
            }))
            .pipe(rename('nocache.css'))
            .pipe(gulp.dest('build/'))
    }
    return gulp.src(['app/sass/style.scss'])
        .pipe(sass({'style': 'compressed'}))
        .pipe(prefix("last 1 version", "> 1%"))
        .pipe(rename('styles.css'))
        .pipe(gulp.dest('build/' + BUILD_VERSION))
        .on('end', nocache);
});

gulp.task('sass:dev', ['clean'], function() {
    gulp.src([
        'app/sass/style.scss'
    ])
        .pipe(sass())
        .pipe(prefix("last 1 version", "> 1%"))
        .pipe(rename('style.css'))
        .pipe(gulp.dest('app/css'))
        .pipe(connect.reload());
});


gulp.task('compilejs', ['clean', 'copy', 'templates', 'jshint'], function() {
    function almond() {
        var s = gulp.src('build/*.js');
        s.pipe(concat('appmonitor.js'))
            .pipe(uglify())
            .pipe(gulp.dest('build/' + BUILD_VERSION));
        s.pipe(clean());
    }

    return gulp.src('app/bower_components/almond/almond.js')
        .pipe(gulp.dest('build'))
        .pipe(rjs({
            out: 'require.config.js',
            baseUrl: 'app/js/',
            name: 'require.config',
            mainConfigFile: 'app/js/require.config.js'
        }))
        .pipe(gulp.dest('build'))
        .on('end', almond);
});

gulp.task('templates', function() {
    return gulp.src('app/js/modules/**/*.html')
        .pipe(minifyHTML({
            quotes: true,
            empty: true
        }))
        .pipe(templates({
            standalone: true,
            filename: 'template.js',
            module: 'template',
            root: 'js/modules/'
        }))
        .pipe(gulp.dest('app/js'))
        .pipe(connect.reload());
});

gulp.task('jshint', function() {
    var stream = gulp.src('app/js/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter(require('jshint-stylish')));
    if (!isWatch) {
        stream.pipe(jshint.reporter('fail'));
    }
    return stream;
});

var isWatch = false;
gulp.task('watch', ['templates', 'sass:dev', 'jshint'], function() {
    isWatch = true;
    gulp.watch('app/js/**/*.html', ['templates']);
    gulp.watch(['app/js/**/*.js', 'tests/**/*.js'], ['jshint']);
    gulp.watch(['app/sass/**/*.scss'], ['sass:dev']);
});