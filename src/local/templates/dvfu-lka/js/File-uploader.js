class FileUploader {
    constructor(elem, options = {
        accept: ['.pdf', '.jpg', '.png'], //допустимые файлы
        maxSize: 5242880, //5 МБ - максисальный размер файла
        maxLongNameFile: 7, //максисальная длинна имени файла, если больше, то при выводе данных файла на страницу, название будет обрезаться тремя точками.
        maxSizeErrorMessage: 'Максимальный размер загружаемого файла 5МБ', 
        acceptErrorMessage: 'Недопустимое расширение файла'
    }){
        this.elem = elem;
        this.uploadBtn = this.elem.querySelector('.file-uploader-element-btn');
        this.input = this.elem.querySelector('.file-uploader-element__input');
        this.previewBox = this.elem.querySelector('.file-uploader-element__preview-box');
        this.errorMessageBox = this.elem.nextElementSibling;
        this.maxSize = options.maxSize;
        this.accept = options.accept;
        this.maxLongNameFile = options.maxLongNameFile;
        this.multiple = false;
        this.fileBank = []; 
        this.maxSizeErrorMessage = options.maxSizeErrorMessage;
        this.acceptErrorMessage = options.acceptErrorMessage;
        this.arImagePreview = []
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

            arTmpFiles.forEach(item=>{ 
                let promise = new Promise((resolve, reject)=>{
                    let fr = new FileReader();
                    fr.onload = (e)=>{

                        resolve( {
                            name: item.name,
                            result: e.target.result
                        } )
                    }
                    fr.onerror = (e)=>{
                        resolve(e.target.error)
                    }
                    fr.readAsDataURL(item);
                }); 
                this.arImagePreview.push(promise); 
            });
             
           
            // создать html превьюшки файлов, сформировать название ирасширение
            if(!this.multiple && this.fileBank.length > 0){
                this.previewBox.innerHTML = '';
                this.fileBank = [];
            } 

            this.createFileElemAndAppend(arTmpFiles); 

            arTmpFiles.forEach(item=>{
                this.fileBank.push(item);
            });  
        }); 



        this.elem.addEventListener('click', (e)=>{
            if(e.target.classList.contains('file-uploader-element-preview__delete')){
                let deleteBtn = e.target;
                let deleteFileName = deleteBtn.dataset.id; 
                let preview = deleteBtn.closest('.file-uploader-element-preview');
                this.deletePreview(preview); 
                this.deletearFileFromFileBank(deleteFileName)
                
                if(this.fileBank.length == 0){
                    this.elem.classList.remove('active');
                }
            } 
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

        Promise.all(this.arImagePreview)
            .then((results)=> { 
                results.forEach(item=>{
                    let previewElemStr = ''; 
                      
                    switch(this.getExtension(item.name)){
                        case '.jpg': 
                            previewElemStr +=  `<div class="file-uploader-element-preview file-uploader-element-preview--photo">
                                <button type="button" class="file-uploader-element-preview__delete" data-id="${item.name}"></button>
                                <img src="${item.result}" aria-hidden="true" alt="">
                                <span class="file-uploader-element-preview__caption">
                                ${this.getFileName(item.name)+''+this.getExtension(item.name)}
                                </span>
                            </div>
                            `;
                        break;
                        case '.png':
                            previewElemStr +=  `<div class="file-uploader-element-preview file-uploader-element-preview--photo">
                                <button type="button" class="file-uploader-element-preview__delete" data-id="${item.name}"></button>
                                <img src="${item.result}" aria-hidden="true" alt="">
                                <span class="file-uploader-element-preview__caption">
                                ${this.getFileName(item.name)+''+this.getExtension(item.name)}
                                </span>
                            </div>
                            `;
                        break;
                        case '.pdf':
                            previewElemStr +=  `
                            <div class="file-uploader-element-preview file-uploader-element-preview--pdf">
                                <button type="button" class="file-uploader-element-preview__delete" data-id="${item.name}"></button>
                                <img src="./local/templates/dvfu-lka/img/pdf-preview.svg" aria-hidden="true" alt="">
                                <span class="file-uploader-element-preview__caption">
                                ${this.getFileName(item.name)+''+this.getExtension(item.name)}
                                </span>
                            </div>
                            `;
                        break;
                        case '.doc':
                            previewElemStr +=  ` 
                            <div class="file-uploader-element-preview">
                                <button type="button" class="file-uploader-element-preview__delete" data-id="${item.name}"></button>
                                <img src="./local/templates/dvfu-lka/img/doc-preview.svg" aria-hidden="true" alt="">
                                <span class="file-uploader-element-preview__caption">
                                ${this.getFileName(item.name)+''+this.getExtension(item.name)}
                                </span>
                            </div>
                            `;
                        break;
                        case '.docx':
                            previewElemStr +=  `
                            <div class="file-uploader-element-preview">
                                <button type="button" class="file-uploader-element-preview__delete" data-id="${item.name}"></button>
                                <img src="./local/templates/dvfu-lka/img/doc-preview.svg" aria-hidden="true" alt="">
                                <span class="file-uploader-element-preview__caption">
                                ${this.getFileName(item.name)+''+this.getExtension(item.name)}
                                </span>
                            </div>
                            `;
                        break;
                        default: 
                        previewElemStr +=  `<div class="file-uploader-element-preview">
                                <button type="button" class="file-uploader-element-preview__delete" data-id="${item.name}"></button>
                                <img src="./local/templates/dvfu-lka/img/file-preview.svg" aria-hidden="true" alt="">
                                <span class="file-uploader-element-preview__caption">
                                ${this.getFileName(item.name)+''+this.getExtension(item.name)}
                                </span>
                            </div>
                            `;
                        break;
                    } 
                    //добавить класс коробке
                    this.elem.classList.add('active');
                    //добавляю элементы в коробку
                    this.previewBox.insertAdjacentHTML('beforeEnd', previewElemStr); 
                }); 
            }) 
            .catch(function(error) {
                console.error(error);  
            });

            this.arImagePreview = [];
            // console.log(this.getFileBank())
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
 