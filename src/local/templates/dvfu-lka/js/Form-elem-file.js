class FormElemFile {
    constructor(elem, options = {
        accept: ['.pdf', '.jpg', '.png'], //допустимые файлы
        maxSize: 5242880, //5 МБ - максисальный размер файла
        maxLongNameFile: 7, //максисальная длинна имени файла, если больше, то при выводе данных файла на страницу, название будет обрезаться тремя точками.
        maxSizeErrorMessage: 'Максимальный размер загружаемого файла 5МБ', //сообщение, если размер файла больше указанного
        acceptErrorMessage: 'Недопустимое расширение файла' //сообщение, если не подходит расширение файла
    }){
        this.elem = elem;
        this.uploadBtn = this.elem.querySelector('.form-elem-file__upload-btn');
        this.input = this.elem.querySelector('.form-elem-file__input');
        this.previewBox = this.elem.querySelector('.form-elem-file__preview-box');
        this.errorMessageBox = this.elem.nextElementSibling;
        this.maxSize = options.maxSize;
        this.accept = options.accept;
        this.maxLongNameFile = options.maxLongNameFile;
        this.multiple = false;
        this.fileBank = []; 
        this.maxSizeErrorMessage = options.maxSizeErrorMessage;
        this.acceptErrorMessage = options.acceptErrorMessage;
        this.init();
    }
    
    init(){   
        if(this.input.getAttribute('multiple')){
            this.multiple = true;
        }

        this.uploadBtn.addEventListener('click', (e)=>{
            e.preventDefault();
            this.input.click();
        });

        this.input.addEventListener('change', (e)=>{
            let arTmpFiles = Array.from(e.target.files); 
      
            if(!this.multiple){
                let tmpAr = arTmpFiles[0];
                arTmpFiles = [];
                arTmpFiles.push(tmpAr);
            }
              
            arTmpFiles = arTmpFiles.filter(item=>item.size <= this.maxSize); 
         
            if(arTmpFiles.length == 0){
                this.errorMessageBox.innerHTML = this.maxSizeErrorMessage;
                this.elem.classList.add('error');
                setTimeout(()=>{
                    this.elem.classList.remove('error');
                    this.errorMessageBox.innerHTML = ''; 
                }, 3000);
                return;
            }

            arTmpFiles = this.extensionFilter(arTmpFiles); 
            if(arTmpFiles.length == 0){
                this.errorMessageBox.innerHTML = this.acceptErrorMessage;
                this.elem.classList.add('error');
                setTimeout(()=>{
                    this.elem.classList.remove('error');
                    this.errorMessageBox.innerHTML = ''; 
                }, 3000);
                return;
            }
            
             //добавить класс коробке
            this.elem.classList.add('form-elem-file--active');
           
            // создать html превьюшки файлов, сформировать название ирасширение
            if(!this.multiple && this.fileBank.length > 0){
                this.previewBox.innerHTML = '';
                this.fileBank = [];
            } 

            this.createFileElemAndAppend(arTmpFiles); 

            arTmpFiles.forEach(item=>{
                this.fileBank.push(item);
            }); 
            // console.log(this.fileBank); 
        }); 

        this.elem.addEventListener('click', (e)=>{
            if(e.target.classList.contains('form-elem-file-preview__delete-cross')){
                let deleteBtn = e.target;
                let deleteFileName = deleteBtn.dataset.id;
                // console.log(deleteFileName);
                let preview = deleteBtn.closest('.form-elem-file-preview');
                this.deletePreview(preview); 
                this.deletearFileFromFileBank(deleteFileName)
                
                if(this.fileBank.length == 0){
                    this.elem.classList.remove('form-elem-file--active');
                }
            }
            // console.log(this.fileBank)
        });
    } 
    
    
    // проверяю, что расширение файла входит во допустимые расширения
    extensionFilter(arr){ 
        let arrEF = arr.filter(item=>{
           let res = this.accept.includes(this.getExtension(item.name)); 
           return res;
        });
        return arrEF;
    }

     // принимает строку с названием и расширением файла и возвращает его расширение
     getExtension(str, deletePoint = false) { 
        if(deletePoint){
            let s = str.match(/\.[0-9a-z]+$/i)[0];
            return s.slice(1);
        }else{
            return str.match(/\.[0-9a-z]+$/i)[0];
        } 
    }

    // принимает строку с названием и расширением файла и возвращает его название
    getFileName(str) {
        let fileName = str.match(/(.*)\.[^.]+$/i)[1];
        if(fileName.length > this.maxLongNameFile){
            fileName = fileName.slice(0, this.maxLongNameFile) + '..';
        }
        return fileName;
    }

    // создает html элементы с данными подгруженных файлов и добавляет их в DOM
    createFileElemAndAppend(arr) {  
        let previewElemStr = '';

        arr.forEach(elem=>{
              previewElemStr += `
            <div class="form-elem-file-preview">
                <span class="form-elem-file-preview__caption">${this.getFileName(elem.name)+''+this.getExtension(elem.name)}</span>
                <button type="button" class="form-elem-file-preview__delete-cross" data-id="${elem.name}"></button>
            </div>
            `;
        });
        
        this.previewBox.insertAdjacentHTML('beforeEnd', previewElemStr); 
    }
 
    // удаление данных файла из банка подгруженных файлов
    deletearFileFromFileBank(deleteFileName){
        this.fileBank = this.fileBank.filter((item)=>{
            if(item.name == deleteFileName){
                return false;
            }else{
                return true;
            }
        });
    }

    // удаляет превьюшку файла
    deletePreview(preview){
        preview.classList.add('delete');
        setTimeout(()=>{
            preview.remove();
        }, 200);
    }

    // отдает массив с подгруженными файлами
    getFileBank(){
        return this.fileBank;
    }
}
 