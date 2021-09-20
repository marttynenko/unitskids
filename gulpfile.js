const { src,dest,watch,series } = require('gulp');
const less = require('gulp-less')
const image = require('gulp-image')
const del = require('del')
const svgSprite = require('gulp-svg-sprites')
const concat = require('gulp-concat')
const cssmin = require('gulp-cssmin')
const LessAutoprefix = require('less-plugin-autoprefix');
const autoprefix = new LessAutoprefix({ browsers: ['last 3 versions'] });

//compile styles
function styles(cb) {
    return src('src/styles/main.less')
        .pipe(less({plugins: [autoprefix]}))
        // .pipe(concat('style.css'))
        .pipe(cssmin())
        .pipe(dest('src/css'))
    cb();
}

//symobl's vector sprite
function svg(cb) {
    return src('src/images/svg/*.svg')
    .pipe(svgSprite({
        mode: 'symbols',
        svg: {
            svgPath: "../svg/svg/%f"
        }
    }))
    .pipe(dest("src/svg"));
    cb();
}

exports.styles = styles;
exports.default = function() {
    watch('src/styles/**/*.less', styles);
    watch('src/images/svg/*.svg', svg);
};


// const {src, dest, series, parallel, watch: gulpWatch} = require('gulp');
// const less = require('gulp-less');
// const twig = require('gulp-twig');
// const image = require('gulp-image');
// const gulpClean = require('gulp-clean');
// const webpack = require('webpack-stream');
// const htmlbeautify = require('gulp-html-beautify');

// const webpackConfig = require('./webpack.config.js');

// const styles = () => {
//     return src('./src/styles/main.less')
//         .pipe(less({
//             plugins: [require('less-plugin-glob')],
//         }))
//         .pipe(dest('./public/styles'));
// };

// const templates = () => {
//     return src('./src/templates/pages/**/*.twig')
//         .pipe(twig())
//         .pipe(htmlbeautify())
//         .pipe(dest('./public'));
// };

// const scripts = () => {
//     return src('./src/scripts/main.js')
//         .pipe(webpack(webpackConfig))
//         .pipe(dest('./public/scripts'));
// };

// const compressImages = () => {
//     return src('./src/img/**/*')
//         .pipe(image())
//         .pipe(dest('./src/img'));
// };

// const copyImages = () => {
//     return src('./src/img/**/*')
//         .pipe(dest('./public/img'));
// };

// const copyFonts = () => {
//     return src('./src/fonts/**/*')
//         .pipe(dest('./public/fonts'));
// };

// const clean = () => {
//     return src('./public', {read: false, allowEmpty:  true})
//         .pipe(gulpClean());
// };

// const watch = cb => {
//     gulpWatch('./src/styles/**/*', styles);
//     gulpWatch('./src/templates/**/*', templates);
//     gulpWatch('./src/scripts/**/*', scripts);
//     gulpWatch('./src/img/**/*', copyImages);
//     gulpWatch('./src/fonts/**/*', copyFonts);
//     cb();
// };

// const build = series(clean, parallel(series(compressImages, copyImages), copyFonts, templates, scripts, styles));

// exports.dev = series(build, watch);
// exports.compress = compressImages;
// exports.default = build;
