// @ts-nocheck
export class VideoSlider {
    constructor(src, videoCategory, currentPos, videoArray) {
        this.src = src;
        this.videoCategory = videoCategory;
        this.currentPos = currentPos;
        this.videoArray = videoArray;
        this.wrapper = document.querySelector(".video-galery__wrapper");
        this.NEXT = 1;
        this.PREV = -1;
        this.buttons = [
            document.querySelector('.video-galery__mouse.area-right'),
            document.querySelector('.video-galery__mouse.area-left'),
        ]
        this.init();
    }

    init() {
        this.createModalWindow(this.src);
        this.addEvents();
    }

    createModalWindow(src) {
        this.generatePrevSlide()
        this.generateCurrentSlide();
        this.generateNextSlide()
        this.wrapper.classList.add("visible");
        document.querySelector('body').classList.add('stop-scrolling');
        this.wrapper.setAttribute('tabindex', 1);
        this.wrapper.focus();
    }

    addEvents() {
        const rightButton = document.querySelector(".video-galery__mouse.area-right");
        const leftButton = document.querySelector(".video-galery__mouse.area-left");

        rightButton.onclick = this.nextPhoto.bind(this);
        leftButton.onclick = this.prevPhoto.bind(this);
        this.keyHandler = this.keyHandler.bind(this);
        document.addEventListener('keyup', this.keyHandler);
    }

    keyHandler(e) {
        if (e.code === 'ArrowRight') this.nextPhoto();
        if (e.code === 'ArrowLeft') this.prevPhoto();
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
        };
    }

    nextPhoto() {
        if (this.currentPos === this.videoArray.length - 1) this.currentPos = 0;
        this.currentPos++;
        document.querySelector('.current--slide').classList.replace('current--slide', 'prev--slide')
        document.querySelector('.next--slide').classList.replace('next--slide', 'current--slide')
        this.generateNextSlide();
        this.clearSlides(0)
    }

    prevPhoto() {
        if (this.currentPos === 0) this.currentPos = this.videoArray.length
        this.currentPos--
        document.querySelector('.current--slide').classList.replace('current--slide', 'next--slide')
        document.querySelector('.prev--slide').classList.replace('prev--slide', 'current--slide')
        this.generatePrevSlide();
        this.clearSlides(3)
    }

    clearSlides(order) {
        let slides = this.wrapper.querySelectorAll(".video-galery__container");
        if (slides[order]) {
            slides[order].remove()
        }
    }

    generateNextSlide() {
        const html = `
        <div class="video-galery__container next--slide" >
        ${this.spinnerHTML}
            <img src='${this.getSrc(this.NEXT)}' alt = ''>
        </div>    
        `;
        this.wrapper.insertAdjacentHTML("beforeend", html);
    }

    generateCurrentSlide() {
        const modalWindow = `
                <div class="video-galery__container current--slide">
                    <div class="spinner show">
                        <div class="spinner-border" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                        <p class="spinner__persent"></p>
                    </div>
                    <img src='${this.getSrc()}' alt = ''>
                </div>
            `;
        this.wrapper.insertAdjacentHTML("beforeend", modalWindow);
    }

    generatePrevSlide() {
        const html = `
        <div class="video-galery__container prev--slide" >
        ${this.spinnerHTML}
            <img src='${this.getSrc(this.PREV)}' alt = ''>
        </div>    
        `;
        this.wrapper.insertAdjacentHTML("afterbegin", html);
    }

    getSrc(order = 0) {
        let number = this.videoArray[this.currentPos + order];
        if ((this.currentPos === 0 && order === -1)) {
            number = this.videoArray[this.videoArray.length - 1]
            if (!number) debugger;
        }
        if (this.currentPos === this.videoArray.length - 1 && order === 1) {
            number = this.videoArray[0];
            if (!number) debugger;
        }
        return `../assets/portfolio/${this.videoCategory}_full/${this.videoCategory}_${number}.webp`;
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
