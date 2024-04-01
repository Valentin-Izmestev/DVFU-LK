'use strict';

document.addEventListener('DOMContentLoaded', function(){
        // подключение SimpleBar
        Array.prototype.forEach.call(
            document.querySelectorAll('.simplebar'),
            (el) => new SimpleBar(el)
        ); 

        var explandMenuBtn = document.querySelector('.sh-header-menu-box-btn');
        if(explandMenuBtn){
            explandMenuBtn.addEventListener('click', function(){
                document.body.classList.toggle('expland-menu');
            });
        }
 
        window.addEventListener('resize', function(){
            if(window.innerWidth <= 1100){
                document.body.classList.add('expland-menu');
            } 
        });

        let burgerBtn = document.querySelector('.burger-btn');
        if(burgerBtn){
            burgerBtn.addEventListener('click', function(e){
                e.preventDefault();
                document.body.classList.toggle('show-menu');
            });
        }
        
        let nlFormElemFiles = document.querySelectorAll('.form-elem-file');
        let arFef = [];
        if(nlFormElemFiles.length > 0){
            nlFormElemFiles.forEach(item=>{
                let fef = new FormElemFile(item);
                arFef.push(fef);
            }); 
        }

        let nlFileUploaderElelments = document.querySelectorAll('.file-uploader-element');
        let arFUE = [];
        if(nlFileUploaderElelments.length > 0){
            nlFileUploaderElelments.forEach(item=>{
                let fue = new FileUploader(
                    item, 
                    {
                        accept: ['.pdf', '.jpg', '.png', '.doc', '.docx'], //допустимые файлы
                        maxSize: 5242880, //5 МБ - максисальный размер файла
                        maxLongNameFile: 7, //максисальная длинна имени файла, если больше, то при выводе данных файла на страницу, название будет обрезаться тремя точками.
                        maxSizeErrorMessage: 'Максимальный размер загружаемого файла 5МБ', 
                        acceptErrorMessage: 'Недопустимое расширение файла'
                    }
                );
                arFUE.push(fue);
            });
        }
        
});

