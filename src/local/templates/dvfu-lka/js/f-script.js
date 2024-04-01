// подключаем маски
let nlTelMask = document.querySelectorAll('.tel-mask');
if(nlTelMask.length > 0){
    nlTelMask.forEach(nodeTel=>{
        let mask = IMask(nodeTel, { 
            mask: '+{7} (000) 000-00-00', 
            // lazy: false,
            // placeholderChar: '__'
        });
    });
    
};
// маска номера 
let nlNumMask = document.querySelectorAll('.num-mask');
if(nlNumMask.length > 0) {
    nlNumMask.forEach(nodeNum=>{
        let mask = IMask(nodeNum, {
            mask: '000-000'
        })
    })
};

// маска номера СНИЛС
let nlNumSnilsMask = document.querySelectorAll('.num-mask-snils');
if(nlNumSnilsMask.length > 0) {
    nlNumSnilsMask.forEach(nodeSnils=>{
        let mask = IMask(nodeSnils, {
            mask: '000-000-000-00',
            lazy: false,
            placeholderChar: '__'
        })
    })
};

// маска серии паспорта
let nlNumSeriesMask = document.querySelectorAll('.num-mask-series');
if(nlNumSeriesMask.length > 0) {
    nlNumSeriesMask.forEach(nodeSnils=>{
        let mask = IMask(nodeSnils, {
            mask: '0000',
        })
    })
};

// маска номера паспорта
let nlNumPassMask = document.querySelectorAll('.num-mask-pass');
if(nlNumPassMask.length > 0) {
    nlNumPassMask.forEach(nodeSnils=>{
        let mask = IMask(nodeSnils, {
            mask: '000000',
        })
    })
};

 
// подключаем flatpickr для календаря
let nlDvfuFlatpickr = document.querySelectorAll('.dvfu-flatpickr');
if(nlDvfuFlatpickr.length > 0){
    nlDvfuFlatpickr.forEach(data=>{
        flatpickr(data, {
            dateFormat: "d.m.Y", 
            locale: "ru"
        });
    });
  
}

let nlNpaChoices = document.querySelectorAll('.select-ch');
    let arNpaChoices = [];
    if(nlNpaChoices.length > 0){
        nlNpaChoices.forEach(item=>{
            if(item.classList.contains('select-ch--no-search')){
                let choicesItem = new Choices(item, {
                    searchEnabled: false,
                    searchChoices: false,
                    placeholderValue: null,
                    placeholder: true,
                    removeItemButton: false,
                    itemSelectText: '',
                    loadingText: 'Загрузка...',
                    noResultsText: 'Результатов не найдено',
                    noChoicesText: 'Выбирать больше нечего',
                    classNames: {
                        containerOuter: 'choices choices-npa',
                    }
                });
                arNpaChoices.push(choicesItem);
            }else{
                let choicesItem = new Choices(item, {
                    placeholderValue: null,
                    placeholder: true,
                    removeItemButton: false,
                    loadingText: 'Загрузка...',
                    itemSelectText: '',
                    noResultsText: 'Результатов не найдено',
                    noChoicesText: 'Выбирать больше нечего',
                    classNames: {
                        containerOuter: 'choices choices-dvfu',
                    }
                });
                arNpaChoices.push(choicesItem);
            }
        });
    }
  
