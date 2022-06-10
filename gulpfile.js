let gulp = require('gulp'); // это имя установленного плагина
let less = require('gulp-less'); 
let autoprefixer = require('gulp-autoprefixer');
let concat = require('gulp-concat');
let sourcemaps = require('gulp-sourcemaps');
// let cleanCss = require('gulp-clean-css'); // не нужен особо
let browserSync = require('browser-sync').create(); // запрашиваем и сразу вызываем create()


//Далее Влад создает config - но у Жеки это отдельный модуль config.js который он импортирует в сборщик файлов gulpfile.js
//создаем объект конфига который будет отвечать за пути к файлам
let config = {
  paths: {
    //less будет отвечать за путь ко всем less файлам чтобы использовыать ее в дальнейшем в коде а неписать пути вручную
    less: './src/less/**/*.less', //все файлы с разреш. less
    html: './public/index.html',
    },
    output: {
      cssName: 'bundle.min.css', // имя выходного файла
      path: './public'
    }
  };

//Создаем главную задачу - цепочка ф. здесь идет
//task получил задачу Less
 gulp.task('less', function () { // метод task
  // сначала получаем все файлы less
  // следим за файлами расширения типа Less
  return gulp.src(config.paths.less) // путь  к less файлам

 .pipe(sourcemaps.init()) //инициализация sourcemaps чтобы начали добавляться файлы
.pipe(less()) // компилируем все в css - пакет gulp-less
.pipe(concat(config.output.cssName)) // объединяем все less файлы в один bundle.min.css
.pipe(autoprefixer()) // можно убрать если не нужен
// .pipe(cleanCss()) // минификация css - отключил
.pipe(sourcemaps.write()) // запишет данные в css - из какого именноф файла бфл импортирован конкретный стиль для тега 
.pipe(gulp.dest(config.output.path)); // и в конце перемещаем все в public - метод dest()
// в конце обновляем браузер
// .pipe(browserSync.stream()); // stream метод
});


//Вторая задача по синхронизации и слежению за файлами Less
gulp.task('serve', function () { 
//убрал т.к обновление через LiveServer
});

//Мой вариант - синтаксис gulp 4.0
let lessStart = gulp.series('less');
function watcher() { 
 gulp.watch(config.paths.less, lessStart );
}
const mainTask = gulp.parallel('less', watcher);
gulp.task('default', mainTask);





