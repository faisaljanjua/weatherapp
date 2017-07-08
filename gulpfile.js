var gulp = require("gulp"),
    jsmin = require("gulp-jsmin"),
    rename = require("gulp-rename"),
    scss = require("gulp-scss"),
    connect = require("gulp-connect");

var path = {
    dist: {
        js: 'dist/js/**/*.js',
        scss: 'dist/scss/**/*.scss',
        html: './*.html',
        img: 'dist/images/*.*'
    },
    src: {
        js: 'js/',
        css: 'css/',
        img: 'images/'
    },
    build: {
        js: 'build/js/',
        css: 'build/css/',
        html: 'build/',
        img: 'build/images/'
    }
};

gulp.task("connect", function () {
    connect.server({
        root: './',
        livereload: true
    });
});

gulp.task("style", function () {
    gulp.src(path.dist.scss)
        .pipe(scss())
        .pipe(gulp.dest(path.src.css))
        .pipe(gulp.dest(path.build.css))
        .pipe(connect.reload());
});

gulp.task("script", function () {
    gulp.src(path.dist.js)
        .pipe(jsmin())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(path.src.js))
        .pipe(gulp.dest(path.build.js))
        .pipe(connect.reload());

});

gulp.task("html", function () {
    gulp.src(path.dist.html)
        .pipe(gulp.dest(path.build.html))
        .pipe(connect.reload());
});

gulp.task("watch", function () {
    gulp.watch([path.dist.html], ["html"]);
    gulp.watch([path.dist.js], ["script"]);
    gulp.watch([path.dist.scss], ["style"]);
});

gulp.task("default", ['connect', 'watch', 'html', 'style', 'script']);