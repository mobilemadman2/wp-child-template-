var gulp = require('gulp'),
    shell = require('gulp-shell'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    cssmin = require('gulp-cssmin'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    browsersync = require('browser-sync'),
    fs = require('fs'),
    fse = require('fs-extra');

var files = {
    vendor: {
        src: [
            'animate.css/animate.min.css',
            'css-ripple-effect/dist/ripple.min.css',
            'font-awesome/css/font-awesome.min.css',
            'jquery/dist/jquery.min.js',
            'jquery-parallax.js/parallax.min.js',
            'owl.carousel/dist/assets/owl.carousel.min.css',
            'owl.carousel/dist/assets/owl.theme.default.min.css',
            'owl.carousel/dist/owl.carousel.min.js'
        ],
        dest: './dist/vendor'
    },
    scss: {
        src: './src/styles/styles.scss',
        glob: './src/styles/**/*.scss',
        outfile: 'styles.css',
        dest: './dist/styles'
    },
    css: {
        src: './dist/styles/styles.css',
        outfile: 'styles.min.css',
        dest: './dist/styles'
    },
    wpcss: {
        src: 'dist/styles/styles.css',
        outfile: 'style.css',
        dest: './'
    },
    js: {
        pre: {
            src: './src/scripts/**/*.js',
            outfile: 'bundle.js',
            dest: './dist/scripts'
        },
        post: {
            src: './dist/scripts/bundle.js',
            outfile: 'bundle.min.js',
            dest: './dist/scripts'
        }
    }
};

/**
 *
 */
gulp.task('vendor', function() {
    return new Promise(function(resolve, reject) {
        for (var i in files.vendor.src) {
            fse.copy('./node_modules/' + files.vendor.src[i], files.vendor.dest + '/' + files.vendor.src[i])
                .then(function() {
                    // do nothing
                });
        }

        resolve();
    });
});

/**
 *
 */
gulp.task('scss', function() {
    return gulp.src(files.scss.src)
        .pipe(sass({
            outputStyle: 'expanded'
        }).on('error', sass.logError))
            .pipe(rename(files.scss.outfile))
                .pipe(gulp.dest(files.scss.dest));
});

/**
 *
 */
gulp.task('cssmin', gulp.series('scss', function() {
    return gulp.src(files.css.src)
        .pipe(cssmin())
            .pipe(rename(files.css.outfile))
                .pipe(gulp.dest(files.css.dest));
}));

/**
 *
 */
gulp.task('wpcss', function() {
    return new Promise(function(resolve, reject) {
        gulp.src(files.wpcss.src)
            .pipe(rename(files.wpcss.outfile))
                .pipe(gulp.dest(files.wpcss.dest));

        resolve();
    });
});

/**
 *
 */
gulp.task('css', gulp.series('cssmin', 'wpcss'));

/**
 *
 */
gulp.task('concat', function() {
    return gulp.src(files.js.pre.src)
        .pipe(concat(files.js.pre.outfile))
            .pipe(gulp.dest(files.js.pre.dest));
});

/**
 *
 */
gulp.task('minify', gulp.series('concat', function() {
    return gulp.src(files.js.post.src)
        .pipe(uglify({
            mangle: true
        }))
            .pipe(rename(files.js.post.outfile))
                .pipe(gulp.dest(files.js.post.dest));
}));

/**
 *
 */
gulp.task('js', gulp.series('minify'));

/**
 *
 */
gulp.task('clean', shell.task('npm run clean'));

/**
 *
 */
gulp.task('build', gulp.series('vendor', 'css', 'js'));

/**
 *
 */
gulp.task('watch', function() {
    gulp.watch(files.scss.glob, gulp.series('css'));
    gulp.watch(files.js.pre.src, gulp.series('js'));
});

/**
 *
 */
gulp.task('default', gulp.series('watch'));

/**
 *
 */
gulp.task('ftp', function() {
    var activeFiles = [];

    return new Promise(function(resolve, reject) {
        fs.readdir('./', function(err, files) {
            for (var i = 0; i < files.length; i++) {
                // only move production files
                if (
                    files[i].toLowerCase() === '.git' ||
                    files[i].toLowerCase() === '.gitignore' ||
                    files[i].toLowerCase() === 'changelog.md' ||
                    files[i].toLowerCase() === 'readme.md' ||
                    files[i].toLowerCase() === 'gulpfile.js' ||
                    files[i].toLowerCase() === 'node_modules' ||
                    files[i].toLowerCase() === 'package-lock.json' ||
                    files[i].toLowerCase() === 'package.json' ||
                    files[i].toLowerCase() === 'src'
                ) {
                    continue;
                } else {
                    activeFiles.push(files[i]);
                }
            }

            // copy files to parent directory
            for (var i = 0; i < activeFiles.length; i++) {
                fse.copy('./' + activeFiles[i], './../child/' + activeFiles[i])
                    .then(function() {
                        // do nothing
                    });
            }
        });

        resolve();
    });
});