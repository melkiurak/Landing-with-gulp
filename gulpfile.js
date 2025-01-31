import gulp from 'gulp';
import fileinclude from 'gulp-file-include';
import { deleteAsync } from 'del'; 
import * as dartSass from 'sass'; 
import gulpSass from 'gulp-sass'; 
const sass = gulpSass(dartSass); 
import webp from 'gulp-webp';
import debug from 'gulp-debug';

const paths = {
    dist: './dist',
    src: './src',
    styles: './src/styles',
    html: './src/html',
    scripts: './src/js',
    img: './src/img',
}

gulp.task('html', function(){
    return gulp.src(paths.src +'/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: paths.html,
        }))
        .pipe(gulp.dest(paths.dist))
});

gulp.task('styles', function(){
    return gulp.src(paths.styles + '/*.scss')
        .pipe(sass())
        .pipe(gulp.dest(paths.dist + '/css' ))
});

gulp.task('img', function () {
    return gulp.src(paths.img + '/*.{jpg,png,svg}')
      .pipe(debug({ title: 'Исходные изображения:' }))
      .pipe(webp({ quality: 100 }))
      .pipe(debug({ title: 'WebP изображения:' }))
      .pipe(gulp.dest(paths.dist + '/img'))
      .pipe(debug({ title: 'Конечные изображения:' }));
  });

gulp.task('clean', async function(){
    return await deleteAsync(paths.dist);
});

gulp.task('replace-styles-path', function(){
    return gulp.src('dist/**/*.html')
});
gulp.task('build', gulp.series('clean', gulp.parallel( 'img')));