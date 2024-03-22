// подключаем маски
let nlTelMask = document.querySelectorAll('.tel-mask');
if(nlTelMask.length > 0){
    nlTelMask.forEach(nodeTel=>{
        let mask = IMask(nodeTel, { mask: '+{7} (000) 000-00-00'});
    });
    
}
 
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
                    placeholder: false,
                    searchChoices: false,
                    placeholderValue: null,
                    placeholder: true,
                    removeItemButton: true,
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
                    placeholder: true,
                    placeholderValue: null,
                    placeholder: true,
                    removeItemButton: true,
                    loadingText: 'Загрузка...',
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
  
