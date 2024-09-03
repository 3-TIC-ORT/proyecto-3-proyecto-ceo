import gulp from 'gulp'

gulp.task('default', function(done) {
    console.log('Gulp running..');
    done();
});

gulp.task('sass', function(){
    return gulp.src('src/scss/**/*.scss')  // Specifies source files
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))  // Compiles SASS to CSS and minifies it
        .pipe(gulp.dest('dist/css'))  // Outputs the resulting CSS to the destination folder
        .pipe(browserSync.stream());  // Refreshes the browser with BrowserSync
});