// @ts-nocheck
export class VideoSlider {
    constructor(src, videoCategory, currentPos, videoInfoArray) {
        this.src = src;
        this.videoCategory = videoCategory;
        this.currentPos = currentPos;
        this.videoInfoArray = videoInfoArray;
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
        this.createSlides(this.src);
        this.addEvents();
    }

    createSlides(src) {
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
        if (this.currentPos === this.videoInfoArray.length - 1) {
            this.currentPos = 0;
        } else {
            this.currentPos++;
        }
        document.querySelector('.current--slide').classList.replace('current--slide', 'prev--slide');
        document.querySelector('.next--slide').classList.replace('next--slide', 'current--slide');
        this.generateNextSlide();
        this.clearSlide(0);
    }

    openPrevSlide() {
        if (this.currentPos === 0) {
            this.currentPos = this.videoInfoArray.length - 1;
        } else {
            this.currentPos--;
        }
        document.querySelector('.current--slide').classList.replace('current--slide', 'next--slide');
        document.querySelector('.prev--slide').classList.replace('prev--slide', 'current--slide');
        this.generatePrevSlide();
        this.clearSlide(3);
    }

    clearSlide(order) {
        let slides = this.wrapper.querySelectorAll(".video-galery__container");
        if (slides[order]) {
            slides[order].remove()
        }
    }

    generateNextSlide() {
        const index = this.getIndexOfVideoInfoArray(this.slideCodes.next);
        const videoInfo = this.videoInfoArray[index];
        const html = `
        <div class="video-galery__container next--slide" >
            ${this.getVideoPlayerElement(videoInfo)}
        </div>    
        `;
        this.wrapper.insertAdjacentHTML("beforeend", html);
    }

    generateCurrentSlide() {
        const index = this.getIndexOfVideoInfoArray(this.slideCodes.current);
        const videoInfo = this.videoInfoArray[index];
        const html = `
                <div class="video-galery__container current--slide">
                    ${this.getVideoPlayerElement(videoInfo)}
                    ${this.getDescription()}
                </div>
            `;
        this.wrapper.insertAdjacentHTML("beforeend", html);
    }

    generatePrevSlide() {
        const index = this.getIndexOfVideoInfoArray(this.slideCodes.prev);
        const videoInfo = this.videoInfoArray[index];
        const html = `
        <div class="video-galery__container prev--slide" >
            ${this.getVideoPlayerElement(videoInfo)}
        </div>    
        `;
        this.wrapper.insertAdjacentHTML("afterbegin", html);
    }

    getIndexOfVideoInfoArray(order) {
        let index = this.currentPos + order;
        if ((this.currentPos === 0 && order === -1)) {
            index = this.videoInfoArray.length - 1;
        }
        if (this.currentPos === this.videoInfoArray.length - 1 && order === 1) {
            index = 0;
        }
        return index;
    }

    getVideoPlayerElement(videoInfo) {
        return `
        <div class="video-player">
            <p class="video-player__caption" data-translate="${videoInfo.dataTranslate}">${videoInfo.caption}</p>
            <div class="video-player__video-wrapper" id="video-player__video-wrapper_${videoInfo.id}">
                <video class="video-player__video" id="video-player__video_${videoInfo.id}"
                    poster="../assets/images/video_posters/poster${videoInfo.id}.jpg" preload="metadata">
                    <source id="source__HD-quality_${videoInfo.id}" src="../assets/video/content/video_${videoInfo.id}_1080.mp4"
                        type="video/mp4">
                    <source id="source__high-quality_${videoInfo.id}" src="../assets/video/content/video_${videoInfo.id}_720.mp4"
                        type="video/mp4">
                    <source id="source__medium-quality_${videoInfo.id}"
                        src="../assets/video/content/video_${videoInfo.id}_540.mp4" type="video/mp4">
                    <source id="source__low-quality_${videoInfo.id}" src="../assets/video/content/video_${videoInfo.id}_360.mp4"
                        type="video/mp4">
                </video>
                <button class="video-player__start-button" id="video-player__start-button_${videoInfo.id}">
                    <svg class="video-player__start-button-svg">
                        <use xlink:href="../assets/svg/player-sprite.svg#Play_hover"></use>
                    </svg>
                </button>
            </div>
            <div class="video-contacts">
                stfarba@gmail.com // +375 29 777 40 59
                <a>VK</a> // <a>Instagram</a> // <a>Vimeo</a>
            </div>
        </div>`
    }

    getDescription() {
        return `
            <div class="video-description">
                Обычно, когда бренду нужен ролик на 5 секунд, получается один пэк-шот. Но не в этот раз. 
                Три слова и три ролика о наших любимых консервах Доброфлот. По традиции, в стоп-моушн анимации.
            </div>
        `
    }

    // getContacts() {
    //     return `
    //     <div class="video-contacts">
    //         stfarba@gmail.com // +375 29 777 40 59
    //         <a>VK</a> // <a>Instagram</a> // <a>Vimeo</a>
    //     </div>`
    // }
}
