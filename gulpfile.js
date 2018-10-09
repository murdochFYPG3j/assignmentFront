'use strict'

var ENV = 'development';

var gulp = require('gulp'),
    gutil = require('gulp-util'),       
    source = require('vinyl-source-stream'),
    ngConfig = require('gulp-ng-config'),    
    fs = require('fs'),
    config = require('./app/app.config.js'),
    rename = require("gulp-rename"),   
    jshint = require('gulp-jshint'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    notify = require('gulp-notify'),
    del = require('del'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    removeLogging = require("gulp-remove-logging"),
    mainBowerFiles = require('main-bower-files'),
    runSequence = require("run-sequence"),
    exists = require('path-exists').sync,
    inject = require('gulp-inject'),
    replace = require('gulp-replace'),
    paths = {
        app: {
            html: 'app/**/*.html',
            styles: 'assets/css/*.+(less|css)',  
            images: 'assets/img/**/*',
            scripts: {
                app: './app/components/**/*.js',
                shared: './app/shared/**/*.js',
                all: './app/**/*.js',
                lib: './assets/js/*.js'
            }
        }
    };

/*
 *  We first generate the json file that gulp-ng-config uses as input.
 *  Then we source it into our gulp task.
 *  The env constants will be a saved as a sub-module of our app, ngEnVars.
 *  So we shall name it ngEnvVars.config.
 */
gulp.task('ng-config', ['set-env'], function() {
    //var abc = require('./app/config.json');

    fs.writeFileSync('./app/config.json',
                     JSON.stringify(config[ENV]));
    gulp.src('./app/config.json')
        .pipe(
        ngConfig('was-admin', {
            createModule: false
        })
    )
        .pipe(rename('app.constant.js'))
        .pipe(gulp.dest('./app/'))
});

gulp.task('set-env', function () {
    var envId = gutil.env.env;    
    if(envId)
        ENV = envId;    
});


//scripts
gulp.task('scripts:angular', function() {
    return gulp.src(paths.app.scripts.all)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))  
        .pipe(removeLogging({namespace: ['console', 'window.console']}))
        .pipe(uglify())
        .pipe(gulp.dest('dist/app'));    
    cb();
});

gulp.task('scripts:library', function (cb) {
    return gulp.src(paths.app.scripts.lib)
        .pipe(gulp.dest('dist/assets/js'));
});

//And this task will launch the process of copy and include into index.html
gulp.task('scripts:buildlib', function (cb) {
    runSequence('scripts:angular', 'scripts:library', cb);
})

// Images
gulp.task('images', function() {
    return gulp.src(paths.app.images)
        .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        .pipe(gulp.dest('dist/assets/img'));
});

// html
gulp.task('html', function () {
    return gulp.src(paths.app.html)
        .pipe(gulp.dest('dist/app'));
});

// css
gulp.task('css', function () {
    return gulp.src(paths.app.styles)
        .pipe(gulp.dest('dist/assets/css'));
});

//Here we only copy files to folder inside source code.
//In this case ./src/lib/
gulp.task("bower:copyfiles", function (cb) {
    // Replace files by their minified version when possible
    var bowerWithMin = mainBowerFiles().map( function(path, index, arr) {
        //var newPath = path.replace(/.([^.]+)$/g, '.min.$1');
        //return exists( newPath ) ? newPath : path;
        return path;
    });

    return gulp.src(bowerWithMin)
        .pipe(gulp.dest('dist/bower_components'))
    cb();
});

//This task is the one wich insert the script tag into
// HTML file. In this case is index.html and is in root
gulp.task('bower:insertfiles', function (cb) {
    return gulp.src('index.html') //file with tags for injection
        .pipe(inject(gulp.src(['dist/bower_components/*.js', 'dist/bower_components/*.css'], {
        read: false
    }), {
        starttag: '<!-- bower:{{ext}} -->',
        endtag: '<!-- endbower -->',
        relative: true
    }))
        .pipe(gulp.dest('dist')); //where index.html will be saved. Same dir for overwrite old one

    cb();
})

gulp.task('bower:replacepaths', function(cb){
    return gulp.src('dist/index.html')
        .pipe(replace(/(dist\/)/g, function(match, p1, offset, string) {
        // Replace foobaz with barbaz and log a ton of information 
        // See http://mdn.io/string.replace#Specifying_a_function_as_a_parameter 

        //gutil.log('Found ' + match + ' with param ' + p1 + ' at ' + offset);
        return '';
    }))
        .pipe(gulp.dest('dist/'));
})

//And this task will launch the process of copy and include into index.html
gulp.task('bower:buildlib', function (cb) {
    runSequence('bower:copyfiles', 'bower:insertfiles', 'bower:replacepaths', cb);
})

// Clean
gulp.task('clean', function() {
    return del(['dist']);
});

// Copy
gulp.task('copy', ['clean'], function() {
    runSequence('scripts:buildlib', 'html', 'images', 'css', 'bower:buildlib');
});

// define the default task and add the watch task to it
gulp.task('default', ['ng-config', 'copy']);
