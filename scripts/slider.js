export class Slider {
    // openFullSize.openFullSizePhoto(e.target.src,dataAtr,currentPage,currentPos,orderPhotos[dataAtr]);
    constructor(src, dataAtr, currentPage, currentOrder, orderPhotos) {
        this.src = src;
        this.dataAtr = dataAtr;
        this.currentPage = currentPage;
        this.currentOrder = currentOrder;
        this.orderPhotos = orderPhotos;
        this.wrapper = document.querySelector(".modal-window__wrapper");
        this.NEXT = 1;
        this.PREV = -1;
        this.buttons = [
            document.querySelector('.modal-window__right-button'),
            document.querySelector('.modal-window__left-button'),
            document.querySelector('.modal-window__close-button'),
        ]
        this.init();
    }
    init() {
        document.querySelector('.modal-window__close-button.main').onclick = this.test
        this.createModalWindow(this.src);
    }
    test() {
    }
    getSrc(order = 0) {
        return `../assets/portfolio/${this.dataAtr}_full/${this.dataAtr}_${this.orderPhotos[this.currentOrder + order]}.webp`;
    }
    getSlides() {
        return this.wrapper.querySelectorAll(".modal-window__container");
    }
    createModalWindow(src) {
        const modalWindowHTML = `
        <div class="modal-window__container current--slide">
            <img src='${this.getSrc()}' alt = ''>
        </div>
        `;
        this.generateNext()
        this.generatePrev()
        this.wrapper.insertAdjacentHTML("beforeend", modalWindowHTML);
        this.wrapper.classList.add("visible");
        document.querySelector('body').classList.add('stop-scrolling');
        this.addEvents();
    }
    addEvents() {
        const closeButton = document.querySelector(".modal-window__close-button");
        const rightButton = document.querySelector(".modal-window__right-button");
        const leftButton = document.querySelector(".modal-window__left-button");
        rightButton.onclick = this.nextPhoto.bind(this);
        leftButton.onclick = this.prevPhoto.bind(this);
        closeButton.onclick = this.closeModalWindow;
        if (this.isTouchDevice) {
            this.touchHandle()
        }
    }

    isTouchDevice() {
        try {
            document.createEvent("TouchEvent");
            return true;
        } catch (e) {
            return false;
        }
    }

    touchHandle() {
        const wrapper = this.wrapper
        wrapper.addEventListener('touchstart', handleTouchStart.bind(this), false);
        wrapper.addEventListener('touchmove', handleTouchMove.bind(this), false);
        let xStart = null;
        let yStart = null;
        let sensitivity = 100;
        function handleTouchStart(e) {
            xStart = e.touches[0].clientX;
            yStart = e.touches[0].clientY;

        };
        function handleTouchMove(e) {
            let xMove = e.touches[0].clientX;
            let yMove = e.touches[0].clientY;
            function left() {
                return xStart > (xMove + sensitivity)
            }
            function right() {
                return (xStart + sensitivity) < xMove
            }
            function down() {
                return (yStart + sensitivity) < yMove
            }
            function up() {
                return yStart > (yMove + sensitivity)
            }
            const removeEvents = () => {
                wrapper.replaceWith(wrapper.cloneNode(true));
            }
            if (left()) {
                this.nextPhoto();
                xStart = xMove;
                console.log('next');
            }
            if (right()) {
                this.prevPhoto();
                xStart = xMove;
                console.log('prev');
            }
            if (down() && !left() && !right()) {
                document.querySelector('.current--slide').classList.add('up');
                document.querySelector('.current--slide').addEventListener('transitionend', () => {
                    this.closeModalWindow();
                    removeEvents();
                })

            }
            if (up() && !left() && !right()) {
                console.log('op')
                document.querySelector('.current--slide').classList.add('down');
                document.querySelector('.current--slide').addEventListener('transitionend', () => {
                    this.closeModalWindow();
                    removeEvents();
                })
            }
        };
    }

    nextPhoto() {
        if (this.currentOrder === this.orderPhotos.length - 1) { return -1 }
        this.currentOrder++;
        document.querySelector('.current--slide').classList.replace('current--slide', 'prev--slide')
        document.querySelector('.next--slide').classList.replace('next--slide', 'current--slide')
        this.generateNext();
        this.clearSlides(0)

    }

    prevPhoto() {

        if (this.currentOrder === 0) return -1
        this.currentOrder--
        document.querySelector('.current--slide').classList.replace('current--slide', 'next--slide')
        document.querySelector('.prev--slide').classList.replace('prev--slide', 'current--slide')
        this.generatePrev();
        this.clearSlides(3)

    }

    generateNext() {
        const html = `
        <div class="modal-window__container next--slide" >
            <img src='${this.getSrc(this.NEXT)}' alt = ''>
        </div>    
        `;
        this.wrapper.insertAdjacentHTML("beforeend", html);
    }

    clearSlides(order) {
        let slides = this.getSlides();
        if (slides[order]) {
            slides[order].remove()
        }
    }

    generatePrev() {
        const html = `
        <div class="modal-window__container prev--slide" >
            <img src='${this.getSrc(this.PREV)}' alt = ''>
        </div>    
        `;
        this.wrapper.insertAdjacentHTML("afterbegin", html);
    }

    closeModalWindow() {

        document.querySelector(".modal-window__wrapper").classList.remove("visible");
        document
            .querySelectorAll(".modal-window__container")
            .forEach((i) => i.remove());
        document.querySelector('body').classList.remove("stop-scrolling");

    }
}

class TouchHandle extends Slider{
    constructor(){
        super()
    }
}

class Slider3D extends Slider {
    constructor() {
        super()
    }
    //  TODO 3D handler for 3D photo
    //is it normal?
}

class TouchSlider3D extends Slider3D {
    constructor() {
        super()
        // TODO add touch , for 3D photo from td.js
    }
}

class Mouse3D extends Slider3D {
    constructor() {
        super()
    }
}