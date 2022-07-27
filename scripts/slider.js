export class Slider {
    constructor(src, photoCategory, photoNumber, currentOrder, orderPhotos) {
        this.src = src;
        this.photoCategory = photoCategory;
        this.photoNumber = photoNumber;  //!slider don't use it
        this.currentOrder = currentOrder;
        this.orderPhotos = orderPhotos;
        this.wrapper = document.querySelector(".modal-window__wrapper");
        this.NEXT = 1;
        this.PREV = -1;
        this.buttons = [
            document.querySelector('.modal-window__mouse.area-right'),
            document.querySelector('.modal-window__mouse.area-left'),
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
        return `../assets/portfolio/${this.photoCategory}_full/${this.photoCategory}_${this.orderPhotos[this.currentOrder + order]}.webp`;
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
        const closeAreaUp = document.querySelector('.modal-window__mouse-close.area-up');
        const closeAreaDown = document.querySelector('.modal-window__mouse-close.area-down');
        const rightButton = document.querySelector(".modal-window__mouse.area-right");
        const leftButton = document.querySelector(".modal-window__mouse.area-left");

        rightButton.onclick = this.nextPhoto.bind(this);
        leftButton.onclick = this.prevPhoto.bind(this);
        closeButton.onclick = this.closeModalWindow;
        closeAreaUp.onclick = this.closeModalWindow;
        closeAreaDown.onclick = this.closeModalWindow;
        if (this.isTouchDevice) {
            this.touchHandle()
        }
        // document.addEventListener('keyup', this.keyHandler);
        document.addEventListener('keyup', (e) => this.keyHandler(e));
    }

    keyHandler(e) {
        if(e.code === 'ArrowRight') this.nextPhoto();
        if(e.code === 'ArrowLeft') this.prevPhoto();
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
            }
            if (right()) {
                this.prevPhoto();
                xStart = xMove;
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

    generatePrev() {
        const html = `
        <div class="modal-window__container prev--slide" >
            <img src='${this.getSrc(this.PREV)}' alt = ''>
        </div>    
        `;
        this.wrapper.insertAdjacentHTML("afterbegin", html);
    }

    clearSlides(order) {
        let slides = this.getSlides();
        if (slides[order]) {
            slides[order].remove()
        }
    }



    closeModalWindow() {
        document.querySelector(".modal-window__wrapper").classList.remove("visible");
        document
            .querySelectorAll(".modal-window__container")
            .forEach((i) => i.remove());
        document.querySelector('body').classList.remove("stop-scrolling");
        document.removeEventListener('keyup',() => this.keyHandler);
        this.wrapper.replaceWith(wrapper.cloneNode(true));
    }
}
