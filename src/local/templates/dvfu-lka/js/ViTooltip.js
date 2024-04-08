class ViTooltip{
    constructor(elem){
        this.elem  = elem;
        this.trigger = this.elem.querySelector('.dvfu-tooltip__trigger');
        this.body = this.elem.querySelector('.dvfu-tooltip__body');
        this.winWidth = 0;
        this.winHeight = 0;
        this.init();
    }

    init(){ 
        this.getWinWidthAndHeigh();
        this.addClass();
        window.addEventListener('resize', ()=>{ 
            this.getWinWidthAndHeigh();
            this.addClass();
        });
        window.addEventListener('scroll', ()=>{ 
            this.getWinWidthAndHeigh();
            this.addClass();
        });

        this.trigger.addEventListener('mouseover', ()=>{
            this.addClass();
        });

    }

    getWinWidthAndHeigh(){ 
        this.winWidth = document.documentElement.clientWidth;
        this.winHeight = document.documentElement.clientHeight;   
    }
    addClass(){
        this.body.classList.remove('dvfu-tooltip__body--left');
        this.body.classList.remove('dvfu-tooltip__body--right');
        this.body.classList.remove('dvfu-tooltip__body--top');
        
        let gbcr = this.body.getBoundingClientRect();
        if(gbcr.x < 0){
            this.body.classList.add('dvfu-tooltip__body--left');
        }
        if(gbcr.x + gbcr.width > this.winWidth){
            this.body.classList.add('dvfu-tooltip__body--right');
        }  
        if(gbcr.y + gbcr.height > this.winHeight){
            this.body.classList.add('dvfu-tooltip__body--top');
        }
    }
}