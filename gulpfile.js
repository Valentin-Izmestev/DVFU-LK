
// -------------------------------------------------------------------------------------------------
let project_folder = "dist";
let source_folder = "src";
//Объект с путями
let path = {
    //готовый результат
    build:{
        html: project_folder +"/",
        css: project_folder + "/local/templates/dvfu-lka/css/",
        js: project_folder +"/local/templates/dvfu-lka/js/",
        img: project_folder +"/local/templates/dvfu-lka/img/",
        image: project_folder +"/local/templates/dvfu-lka/image/",
        fonts: project_folder +"/local/templates/dvfu-lka/fonts/"
    },
    //исходники
    src:{ 
        html: [source_folder +"/*.html", "!" + source_folder +"/_*.html"],
        scss: source_folder +"/local/templates/dvfu-lka/scss/style.scss",
        js: source_folder +"/local/templates/dvfu-lka/js/script.js",
        img: source_folder +"/local/templates/dvfu-lka/img/**/*.{jpg,png,svg,gif,ico,webp}",
        image: source_folder +"/local/templates/dvfu-lka/image/**/*.{jpg,png,svg,gif,ico,webp}",
        fonts: source_folder + "/local/templates/dvfu-lka/fonts/**/*.{eot,ttf,woff,woff2,svg}"
    },
    // пути папок за которыми нужно будет следить
    watch:{
        html: source_folder +"/**/*.html",
        scss: source_folder +"/local/templates/dvfu-lka/scss/**/*.scss",
        js: source_folder +"/local/templates/dvfu-lka/js/**/*.js",
        img: source_folder +"/local/templates/dvfu-lka/img/**/*.{jpg,png,svg,gif,ico,webp}",
        image: source_folder +"/local/templates/dvfu-lka/image/**/*.{jpg,png,svg,gif,ico,webp}",
        fonts: source_folder + "/local/templates/dvfu-lka/fonts/**/*.{eot,ttf,woff,woff2,svg}"
    },
    // путь к папке, которая будет чиститься при сохранении
    clean: "./" + project_folder + "/"
}

// -------------------------------------------------------------------------------------------------

// создаем переменные в которые подключаем модули
let {src, dest} = require('gulp'),
gulp = require('gulp'),
browsersync = require("browser-sync").create(),
fileInclude = require("gulp-file-include"),
del = require("del"),
scss = require('gulp-sass')(require('sass')),
autoprefixer = require('gulp-autoprefixer'),
//grouCssMediaQueries = require('gulp-group-css-media-queries'),
cleanCss = require('gulp-clean-css'),
rename = require('gulp-rename'),
uglifyJS = require('gulp-uglify-es').default,
svgSprite = require('gulp-svg-sprite');

const sourcemaps = require('gulp-sourcemaps');



// функция для работы с html файлами.
function html(){
    return src(path.src.html)
        .pipe(fileInclude())
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream()) 
}

// функция для работы с css файлами  
function styles(){
        return src(path.src.scss)  
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(scss({outputStyle: 'expanded'}).on('error', scss.logError)) 
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 5 versions'],
            grid: true,
        }))
        //.pipe(grouCssMediaQueries()) 
        .pipe(dest(path.build.css))
        .pipe(cleanCss())
        .pipe(rename({extname: ".min.css"})) 
        .pipe(sourcemaps.write('./'))
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream()) 
}

function scripts(){
    return src(path.src.js) 
        .pipe(fileInclude())
        .pipe(dest(path.build.js))
        .pipe(uglifyJS())
        .pipe(rename({extname: ".min.js"}))
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream()) 
}
// функция для работы со шрифтами.
function fonts(){
    return src(path.src.fonts) 
        .pipe(dest(path.build.fonts)) 
}

function img(){
    return src(path.src.img)
        .pipe(dest(path.build.img))
        
}
function image(){
    return src(path.src.image)
        .pipe(dest(path.build.image))
        
}
function browserSync(params){
    browsersync.init({
        server: {
            baseDir: "./" + project_folder + "/"
        }, 
        port: 3000,
        notify: false
    });
}

gulp.task('svgSprite', function(){ 
    return gulp.src('src/local/templates/dvfu-lka/img/for-svg-icon/*.svg')
        .pipe(svgSprite({
            mode:{
                stack:{
                    sprite: '../icon-sprite.svg', // задаем имя svg спрайта и адрес его размещения
                    //example: true  // если стоит этот параметр то в папке, где будет генерироваться svg спрайт, будет создаваться html файл с примерами этих иконок
                }
            }
        }))
        .pipe(dest('src/local/templates/dvfu-lka/img/'))
});

function watchFiles(params){
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.fonts], fonts);
    gulp.watch([path.watch.scss], styles);
    gulp.watch([path.watch.js], scripts);
    gulp.watch([path.watch.img], img);
    gulp.watch([path.watch.image], image);
}



function clean(){
    return del(path.clean); 
}

let build = gulp.series(clean, gulp.parallel(fonts, styles, html,  scripts, img, image ));// указываем, какие функции должны выполняться gulp-ом
let watch = gulp.parallel(build, watchFiles, browserSync);//фукции которые будут выполняться при прослушивании

// экспортируем переменные и функции в gulp
exports.html    = html; 
exports.css     = styles;
exports.scripts = scripts;
exports.fonts   = fonts;
exports.img     = img;
exports.image   = image;
exports.build   = build;
exports.watch   = watch;
exports.default = watch;