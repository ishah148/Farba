export class VideoPlayer {
    constructor() {
        this.videoWrapper = document.querySelector('.video-player');
        this.video = document.querySelector('.video-player__video');
        this.startButton = document.querySelector('.video-player__start-button');
        this.startButtonSVG = document.querySelector('.video-player__start-button-svg');
        this.timer = 0;  
        this.gap = 0;  //progress bar
        this.skipSize = 10;
    }

    start() {
        this.createControlPanel();
        this.init();
        this.addEventListeners();
    }

    createControlPanel() {
        const controlPanel = `
        <div class="video-player__controls disappearance">
        <button class="video-player__play">
            <svg class="video-player__stop-svg disappearance">
                <use xlink:href="../assets/svg/player-sprite.svg#pausebutton"></use>
            </svg>
            <svg class="video-player__play-svg">
                <use xlink:href="../assets/svg/player-sprite.svg#playbutton"></use>
            </svg>
        </button>
        <button class="video-player__backward">
            <svg class="video-player__backward-svg">
                <use xlink:href="../assets/svg/player-sprite.svg#fast-backward"></use>
            </svg>
        </button>
        <div class="video-player__progress-bar-container">
            <input class="video-player__progress-bar" type="range" min="0" max="59" step="0.01">
        </div>
        <button class="video-player__forward">
            <svg class="video-player__forward-svg">
                <use xlink:href="../assets/svg/player-sprite.svg#fast-forward"></use>
            </svg>
        </button>
        <div class="video-player__volume-settings">
            <button class="video-player__volume-button">
                <svg class="video-player__volume-svg">
                    <use xlink:href="../assets/svg/player-sprite.svg#volume"></use>
                </svg>
                <svg class="video-player__mute-svg disappearance">
                    <use xlink:href="../assets/svg/player-sprite.svg#mute"></use>
                </svg>
            </button>
            <div class="video-player__volume-range-wrapper">
                <input class="video-player__volume-range" type="range" min="0" max="1" step="0.01"
                    value="0.5">
            </div>
        </div>
        <button class="video-player__settings">
            <svg class="video-player__settings-svg">
                <use xlink:href="../assets/svg/player-sprite.svg#settings-button"></use>
            </svg>
        </button>
        <div class="settings-menu disappearance">
            <span class="settings-menu__close">X</span>
            <span class="settings-menu__video-quality">1080p</span>
            <span class="settings-menu__video-quality">720p</span>
            <span class="settings-menu__video-quality">480p</span>
            <span class="settings-menu__video-quality">360p</span>
        </div>
        <button class="video-player__fullscreen">
            <svg class="video-player__fullscreen-svg">
                <use xlink:href="../assets/svg/player-sprite.svg#fullscreen"></use>
            </svg>
            <svg class="video-player__exit-fullscreen-svg disappearance">
                <use xlink:href="../assets/svg/player-sprite.svg#exit-full-screen"></use>
            </svg>
        </button>
    </div>`
        this.videoWrapper.insertAdjacentHTML('beforeend', controlPanel);
    }

    init() {    
        this.controls = document.querySelector('.video-player__controls');
        this.playButton = document.querySelector('.video-player__play');
        this.stopButtonSVG = document.querySelector('.video-player__stop-svg');
        this.playButtonSVG = document.querySelector('.video-player__play-svg');
        this.volumeSVG = document.querySelector('.video-player__volume-svg');
        this.muteSVG = document.querySelector('.video-player__mute-svg');
        this.volumeButton = document.querySelector('.video-player__volume-button');
        /*full screen*/
        this.fullScreen = document.querySelector('.video-player__fullscreen');
        this.fullScreenSVG = document.querySelector('.video-player__fullscreen-svg');
        this.exitFullScreenSVG = document.querySelector('.video-player__exit-fullscreen-svg');
        this.isFullscreen = false;
        /* volume*/
        this.volumeRange = document.querySelector('.video-player__volume-range');
        /*backward&forward*/
        this.backwardButton = document.querySelector('.video-player__backward');
        this.forwardButton = document.querySelector('.video-player__forward');
        /* progress bar*/
        this.progressBar = document.querySelector('.video-player__progress-bar');
        /*speed and skip settings */
        this.settingsButton = document.querySelector('.video-player__settings');
        this.settingsMenu = document.querySelector('.settings-menu');
        this.settingsClose = document.querySelector('.settings-menu__close');
    }

    addEventListeners() {
        this.video.addEventListener('ended', (event) => {
            this.video.pause();
            this.stopButtonSVG.classList.add('disappearance');
            this.playButtonSVG.classList.remove('disappearance');
            this.startButtonSVG.classList.remove('disappearance');
            this.startButton.classList.remove('disappearance');
            this.controls.classList.add('disappearance');
        });

        this.startButtonSVG.addEventListener('click', () => this.startVideo());
        this.video.addEventListener('click', () => this.toggleVideo());
        this.playButton.addEventListener('click', () => this.toggleVideo());

        this.fullScreen.addEventListener('click', () => this.toggleFullScreen());

        this.videoWrapper.addEventListener('mousemove', () => this.hideControls())
        this.videoWrapper.addEventListener('click', () => this.hideControls())

        this.volumeRange.addEventListener('mousemove', (e) => this.changeVolume(e));

        this.volumeButton.addEventListener('click', () => this.toggleMute());


        this.backwardButton.addEventListener('click', () => {
            ((this.video.currentTime - this.skipSize) !== 0) ? this.video.currentTime -= this.skipSize : this.video.currentTime = 0;
            // this.progressBar.dispatchEvent(new Event('input'));
        })

        this.forwardButton.addEventListener('click', () => {
            ((this.video.currentTime + this.skipSize) < this.video.duration) ? this.video.currentTime = this.video.currentTime + this.skipSize : this.video.currentTime = this.video.duration;
            // this.progressBar.dispatchEvent(new Event('input'));
        })

        this.progressBar.addEventListener('input', (e) => {
            this.video.currentTime = e.target.value;
        });

        this.settingsButton.addEventListener('click', () => {
            this.settingsMenu.classList.toggle('disappearance');
        });

        this.settingsClose.addEventListener('click', () => {
            this.settingsMenu.classList.add('disappearance');
        });
    }

    toggleClassActive(target, className, arr) {
        arr.forEach(item => { item.classList.remove(className) })
        target.classList.add(className);
    }

    startVideo() {
        this.controls.classList.remove('disappearance');
        this.toggleVideo();
    }

    toggleVideo() {
        if (this.video.paused) {
            this.video.play();
            this.stopButtonSVG.classList.remove('disappearance');
            this.playButtonSVG.classList.add('disappearance');
            this.startButtonSVG.classList.add('disappearance');
            this.startButton.classList.add('disappearance');
            this.gap = setInterval(() => this.checkProgress(), 10);

        } else {
            this.video.pause();
            this.stopButtonSVG.classList.add('disappearance');
            this.playButtonSVG.classList.remove('disappearance');
            this.startButtonSVG.classList.remove('disappearance');
            this.startButton.classList.remove('disappearance');
            clearInterval(this.gap)
        };
    }

    toggleFullScreen() {
        if (this.isFullscreen) {
            document.exitFullscreen();
            this.isFullscreen = false;
            this.fullScreenSVG.classList.remove('disappearance');
            this.exitFullScreenSVG.classList.add('disappearance');
        } else {
            document.querySelector(".video-player").requestFullscreen();
            this.isFullscreen = true;
            this.fullScreenSVG.classList.add('disappearance');
            this.exitFullScreenSVG.classList.remove('disappearance');
        }

    }

    hideControls() {
        if (this.video.currentTime) {
            this.controls.classList.remove('disappearance');
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.controls.classList.add('disappearance');
                this.settingsMenu.classList.add('disappearance');
            }, 3000)
        }
    }

    changeVolume(event) {
        if (!this.video.muted) {
            this.video.volume = event.target.value;
            if (!this.video.volume) {
                this.volumeSVG.classList.add('disappearance');
                this.muteSVG.classList.remove('disappearance');
            } else {
                this.volumeSVG.classList.remove('disappearance');
                this.muteSVG.classList.add('disappearance');
            }
        }
    }

    toggleMute() {
        if (!this.volumeSVG.classList.contains('disappearance')) {
            this.volumeSVG.classList.add('disappearance');
            this.muteSVG.classList.remove('disappearance');
            this.video.muted = true;
            this.volumeRange.disabled = true;
        } else if (this.video.volume) {
            this.volumeSVG.classList.remove('disappearance');
            this.muteSVG.classList.add('disappearance');
            this.video.muted = false;
            this.volumeRange.disabled = false;
        }

    }

    checkProgress() {
        this.progressBar.value = this.video.currentTime;
    }
}



/*speed and skip settings */



















