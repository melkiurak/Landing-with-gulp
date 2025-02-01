import gulp from 'gulp';
import fileinclude from 'gulp-file-include';
import { deleteAsync } from 'del'; 
import * as dartSass from 'sass'; 
import gulpSass from 'gulp-sass'; 
const sass = gulpSass(dartSass); 
import webp from 'gulp-webp';
import imagemin from 'gulp-imagemin';
import browserSync, { watch } from 'browser-sync';


const paths = {
    dist: './dist',
    src: './src',
    styles: './src/styles',
    html: './src/html',
    scripts: './src/js',
    img: './src/img',
}

gulp.task('html', () =>{
    return gulp.src(paths.src +'/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: paths.html,
        }))
        .pipe(gulp.dest(paths.dist))
});

gulp.task('styles', () =>{
    return gulp.src(paths.styles + '/*.scss')
        .pipe(sass())
        .pipe(gulp.dest(paths.dist + '/css' ))
});

gulp.task('img', () => {
    return  gulp.src('./src/img/**/*.*', {encoding: false})
        .pipe(webp())
        .pipe(imagemin())
        .pipe(gulp.dest(paths.dist + '/img'))
});

gulp.task('scripts', () => {
    return gulp.src(paths.scripts + '/*.js')
    .pipe(gulp.dest(paths.dist + '/js'))
})

gulp.task('clean', async () =>{
    return await deleteAsync(paths.dist);
});

gulp.task('replace-styles-path', () =>{
    return gulp.src('dist/**/*.html')
});
gulp.task('watch', () => {
    gulp.watch('./src/**/*.html', gulp.series('html'))
    gulp.watch('./src/**/*.scss', gulp.series('styles'))
    gulp.watch('./src/img/**/*.*', gulp.series('img'))
})
gulp.task('build', gulp.series('clean', gulp.parallel('html','styles','img', 'scripts', 'watch')));