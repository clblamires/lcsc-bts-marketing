"use strict";

var gulp = require('gulp')
var sass = require('gulp-sass')
var sync = require('browser-sync').create()

var sass_src  = "app/scss/"
var sass_main = "style.scss"
var sass_dest = "app/css"

gulp.task('sass', () => {
    return gulp.src( sass_src + sass_main )
        .pipe( sass().on('error', sass.logError) )
        .pipe( gulp.dest( sass_dest ) )
        .pipe( sync.reload({
            stream: true
        }))
})

gulp.task('sync', () => {
    sync.init({
        server: { baseDir: 'app/' }
    })
})

gulp.task('watch', ['sync', 'sass'] , () => {
    gulp.watch( sass_src + "**/*.scss", ['sass'] )
    gulp.watch( "app/**/*.html", sync.reload )
    gulp.watch( "app/js/**/*.js", sync.reload )
})

gulp.task('default', ['watch'] )