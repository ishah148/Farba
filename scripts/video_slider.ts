// @ts-nocheck
export class VideoSlider {
    constructor(src, videoCategory, currentPos, videoNumbersArray) {
        this.src = src;
        this.videoCategory = videoCategory;
        this.currentPos = currentPos;
        this.videoNumbersArray = videoNumbersArray;
        this.wrapper = document.querySelector(".video-galery__wrapper");
        this.buttons = {
            rightButton: document.querySelector(".video-galery__mouse.area-right"),
            leftButton: document.querySelector(".video-galery__mouse.area-left"),
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
        document.querySelector('body').classList.add('stop-scrolling');
    }

    addEvents() {
        this.buttons.rightButton.onclick = this.openNextSlide.bind(this);
        this.buttons.leftButton.onclick = this.openPrevSlide.bind(this);
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
        };
    }

    openNextSlide() {
        if (this.currentPos === this.videoNumbersArray.length - 1) {
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
            this.currentPos = this.videoNumbersArray.length - 1;
        } else {
            this.currentPos--;
        }
        document.querySelector('.current--slide').classList.replace('current--slide', 'next--slide')
        document.querySelector('.prev--slide').classList.replace('prev--slide', 'current--slide')
        this.generatePrevSlide();
        this.clearSlide(3)
    }

    clearSlide(order) {
        let slides = this.wrapper.querySelectorAll(".video-galery__container");
        if (slides[order]) {
            slides[order].remove()
        }
    }

    generateNextSlide() {
        const html = `
        <div class="video-galery__container next--slide" >
            ${this.spinnerHTML}
            ${this.getVideoPlayerElement(this.slideCodes.next)}
        </div>    
        `;
        this.wrapper.insertAdjacentHTML("beforeend", html);
    }

    generateCurrentSlide() {
        const modalWindow = `
                <div class="video-galery__container current--slide">
                    ${this.spinnerHTML};
                    ${this.getVideoPlayerElement(this.slideCodes.current)}
                </div>
            `;
        this.wrapper.insertAdjacentHTML("beforeend", modalWindow);
    }

    generatePrevSlide() {
        const html = `
        <div class="video-galery__container prev--slide" >
            ${this.spinnerHTML}
            ${this.getVideoPlayerElement(this.slideCodes.prev)}
        </div>    
        `;
        this.wrapper.insertAdjacentHTML("afterbegin", html);
    }

    getVideoPlayerElement(x) {
        const src = this.getSrc(x);
        const videoInfo = {
            number: this.currentPos,
            dataTranslate: 'loft-furniture',
            caption: 'Рекламный видеоролик - Лофт Мебель',
        };
        return `
        <div class="video-player">
            <!--item-->
            <div class="video-player__video-wrapper" id="video-player__video-wrapper_${videoInfo.number}">
                <!--item__video-->
                <video class="video-player__video" id="video-player__video_${videoInfo.number}"
                    poster="../assets/images/video_posters/poster${videoInfo.number}.jpg" preload="metadata">
                    <source id="source__HD-quality_${videoInfo.number}" src="../assets/video/content/video_${videoInfo.number}_1080.mp4"
                        type="video/mp4">
                    <source id="source__high-quality_${videoInfo.number}" src="../assets/video/content/video_${videoInfo.number}_720.mp4"
                        type="video/mp4">
                    <source id="source__medium-quality_${videoInfo.number}"
                        src="../assets/video/content/video_${videoInfo.number}_540.mp4" type="video/mp4">
                    <source id="source__low-quality_${videoInfo.number}" src="../assets/video/content/video_${videoInfo.number}_360.mp4"
                        type="video/mp4">
                </video>
                <button class="video-player__start-button" id="video-player__start-button_${videoInfo.number}">
                    <svg class="video-player__start-button-svg">
                        <use xlink:href="../assets/svg/player-sprite.svg#Play_hover"></use>
                    </svg>
                </button>
            </div>
            <p class="video-player__caption" data-translate="${videoInfo.dataTranslate}">${videoInfo.caption}</p>
        </div>`
    }
    
    getSrc(order = 0) {
        let number = this.videoNumbersArray[this.currentPos + order];
        if ((this.currentPos === 0 && order === -1)) {
            number = this.videoNumbersArray[this.videoNumbersArray.length - 1]
        }
        if (this.currentPos === this.videoNumbersArray.length - 1 && order === 1) {
            number = this.videoNumbersArray[0];
        }
        return `../assets/video-galery/${this.videoCategory}/video_${number}_720`;
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
