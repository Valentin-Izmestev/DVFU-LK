'use strict';

document.addEventListener('DOMContentLoaded', function(){
        // подключение SimpleBar
        Array.prototype.forEach.call(
            document.querySelectorAll('.simplebar'),
            (el) => new SimpleBar(el)
        );
        console.log(123);
});