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
