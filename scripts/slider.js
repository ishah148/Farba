export class Slider {
    constructor(src, photoCategory, currentPos, photoNumbersArray) {
        this.src = src;
        this.photoCategory = photoCategory;
        this.currentPos = currentPos;
        this.photoNumbersArray = photoNumbersArray;
        this.wrapper = document.querySelector(".modal-window__wrapper");
        this.buttons = {
            closeButton: document.querySelector(".modal-window__close-button"),
            closeAreaUp: document.querySelector('.modal-window__mouse-close.area-up'),
            closeAreaDown: document.querySelector('.modal-window__mouse-close.area-down'),
            rightButton: document.querySelector(".modal-window__mouse.area-right"),
            leftButton: document.querySelector(".modal-window__mouse.area-left"),
        };
        this.slideCodes = {
            prev: -1,
            current: 0,
            next: 1
        }
        this.init();
    }

    init() {
        this.createModalWindow(this.src);
        this.addEvents();
    }

    createModalWindow(src) {
        this.generatePrevSlide();
        this.generateCurrentSlide();
        this.generateNextSlide();
        this.wrapper.classList.add("visible");
        document.querySelector('body').classList.add('stop-scrolling');
        this.wrapper.setAttribute('tabindex', 1);
        this.wrapper.focus();
    }

    addEvents() {
        this.buttons.rightButton.onclick = this.openNextSlide.bind(this);
        this.buttons.leftButton.onclick = this.openPrevSlide.bind(this);
        this.buttons.closeButton.onclick = () => this.closeModalWindow();
        this.buttons.closeAreaUp.onclick = () => this.closeModalWindow();
        this.buttons.closeAreaDown.onclick = () => this.closeModalWindow();
        if (this.isTouchDevice) {
            this.touchHandle()
        }
        this.keyHandler = this.keyHandler.bind(this);
        document.addEventListener('keyup', this.keyHandler);
    }

    keyHandler(e) {
        if (e.code === 'ArrowRight') this.openNextSlide();
        if (e.code === 'ArrowLeft') this.openPrevSlide();
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
                this.openNextSlide();
                xStart = xMove;
            }

            if (right()) {
                this.openPrevSlide();
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
                document.querySelector('.current--slide').classList.add('down');
                document.querySelector('.current--slide').addEventListener('transitionend', () => {
                    this.closeModalWindow();
                    removeEvents();
                })
            }
        };
    }

    openNextSlide() {
        if (this.currentPos === this.photoNumbersArray.length - 1) {
            this.currentPos = 0;
        } else {
            this.currentPos++;
        }
        document.querySelector('.current--slide').classList.replace('current--slide', 'prev--slide')
        document.querySelector('.next--slide').classList.replace('next--slide', 'current--slide')
        this.generateNextSlide();
        this.clearSlide(0)
    }

    openPrevSlide() {
        if (this.currentPos === 0) {
            this.currentPos = this.photoNumbersArray.length - 1;
        } else {
            this.currentPos--;
        }
        document.querySelector('.current--slide').classList.replace('current--slide', 'next--slide')
        document.querySelector('.prev--slide').classList.replace('prev--slide', 'current--slide')
        this.generatePrevSlide();
        this.clearSlide(3)
    }

    clearSlide(order) {
        let slides = this.wrapper.querySelectorAll(".modal-window__container");
        if (slides[order]) {
            slides[order].remove()
        }
    }

    generateNextSlide() {
        const html = `
            <div class="modal-window__container next--slide" >
                ${this.spinnerHTML}
                <img src='${this.getSrc(this.slideCodes.next)}' alt = ''>
            </div>    
        `;
        this.wrapper.insertAdjacentHTML("beforeend", html);
    }

    generateCurrentSlide() {
        const modalWindow = `
            <div class="modal-window__container current--slide">
                ${this.spinnerHTML}
                <img src='${this.getSrc(this.slideCodes.current)}' alt = ''>
            </div>
            `;
        this.wrapper.insertAdjacentHTML("beforeend", modalWindow);
    }

    generatePrevSlide() {
        const html = `
            <div class="modal-window__container prev--slide" >
                ${this.spinnerHTML}
                <img src='${this.getSrc(this.slideCodes.prev)}' alt = ''>
            </div>    
        `;
        this.wrapper.insertAdjacentHTML("afterbegin", html);
    }

    getSrc(order = 0) {
        let number = this.photoNumbersArray[this.currentPos + order];
        if ((this.currentPos === 0 && order === -1)) {
            number = this.photoNumbersArray[this.photoNumbersArray.length - 1];
        }
        if (this.currentPos === this.photoNumbersArray.length - 1 && order === 1) {
            number = this.photoNumbersArray[0];
        }
        return `../assets/portfolio/${this.photoCategory}_full/${this.photoCategory}_${number}.webp`;
    }

    closeModalWindow() {
        this.wrapper.classList.remove("visible");
        document
            .querySelectorAll(".modal-window__container")
            .forEach((i) => i.remove());
        document.querySelector('body').classList.remove("stop-scrolling");
        this.wrapper.replaceWith(this.wrapper.cloneNode(true));
        document.removeEventListener('keyup', this.keyHandler);
    }

    get spinnerHTML() {
        return `
        <div class="spinner show">
            <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
            </div>
            <p class="spinner__persent"></p>
        </div>
        `
    }
}
