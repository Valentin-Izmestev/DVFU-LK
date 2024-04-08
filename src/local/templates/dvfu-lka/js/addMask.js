// подключаем маски телефона
let nlTelMask = document.querySelectorAll('.tel-mask');
if(nlTelMask.length > 0){
    nlTelMask.forEach(nodeTel=>{
        let mask = IMask(nodeTel, { 
            mask: '+{7} (000) 000-00-00',  
        });
    });
    
};
// маска номера чего то
let nlNumMask = document.querySelectorAll('.num-mask');
if(nlNumMask.length > 0) {
    nlNumMask.forEach(nodeNum=>{
        let mask = IMask(nodeNum, {
            mask: '000-000'
        });
    });
};


// маска номера СНИЛС
let nlNumSnilsMask = document.querySelectorAll('.num-mask-snils');
if(nlNumSnilsMask.length > 0) {
    nlNumSnilsMask.forEach(nodeSnils=>{
        let mask = IMask(nodeSnils, {
            mask: '000-000-000-00', 
        });
    });
};

// маска серии паспорта
let nlNumSeriesMask = document.querySelectorAll('.num-mask-series');
if(nlNumSeriesMask.length > 0) {
    nlNumSeriesMask.forEach(nodeSnils=>{
        let mask = IMask(nodeSnils, {
            mask: '0000',
        });
    });
};

// маска номера паспорта
let nlNumPassMask = document.querySelectorAll('.num-mask-pass');
if(nlNumPassMask.length > 0) {
    nlNumPassMask.forEach(nodeSnils=>{
        let mask = IMask(nodeSnils, {
            mask: '000000',
        });
    });
};
// Подключение маски года
let nlYearMask = document.querySelectorAll('.year-mask');
if(nlYearMask.length > 0) {
    nlYearMask.forEach(item=>{
        let mask = IMask(item, {
            mask: '0000'
        });
    });
};
// Подключение маски года
let nlEstimationMask = document.querySelectorAll('.estimation-mask');
if(nlEstimationMask.length > 0) {
    nlEstimationMask.forEach(item=>{
        let mask = IMask(item, {
            mask: '00'
        });
    });
};