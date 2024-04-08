
 
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
            let choicesItem = {};
            if(item.classList.contains('select-ch--no-search')){ 
                if(item.getAttribute('multiple')){
                    choicesItem = new Choices(item, {
                        searchEnabled: false,
                        searchChoices: false,
                        placeholderValue: null,
                        placeholder: true,
                        removeItemButton: false,
                        itemSelectText: '',
                        loadingText: 'Загрузка...',
                        noResultsText: 'Результатов не найдено',
                        noChoicesText: 'Выбирать больше нечего',
                        shouldSort: false,
                        position: 'auto',
                        allowHTML: true,
                        removeItemButton: true, 
                    });
                }else{
                     choicesItem = new Choices(item, {
                        searchEnabled: false,
                        searchChoices: false,
                        placeholderValue: null,
                        placeholder: true,
                        removeItemButton: false,
                        itemSelectText: '',
                        loadingText: 'Загрузка...',
                        noResultsText: 'Результатов не найдено',
                        noChoicesText: 'Выбирать больше нечего',
                        shouldSort: false,
                        position: 'auto',
                        allowHTML: true, 
                    });
                }
                
                arNpaChoices.push(choicesItem);
            }else{
                if(item.getAttribute('multiple')){
                    choicesItem = new Choices(item, {
                        placeholderValue: null,
                        placeholder: true,
                        removeItemButton: false,
                        loadingText: 'Загрузка...',
                        itemSelectText: '',
                        noResultsText: 'Результатов не найдено',
                        noChoicesText: 'Выбирать больше нечего',
                        shouldSort: false,
                        position: 'auto',
                        allowHTML: true,
                        removeItemButton: true,
                        classNames: {
                            containerOuter: 'choices choices-dvfu',
                        }
                    });
                }else{
                    choicesItem = new Choices(item, {
                        placeholderValue: null,
                        placeholder: true,
                        removeItemButton: false,
                        loadingText: 'Загрузка...',
                        itemSelectText: '',
                        noResultsText: 'Результатов не найдено',
                        noChoicesText: 'Выбирать больше нечего',
                        shouldSort: false,
                        position: 'auto',
                        allowHTML: true, 
                    });
                }
                
                arNpaChoices.push(choicesItem);
            }
        });
    }
  
