export class VideoPlayer {
    constructor(number) {
        this.videoNumber = number;
        this.videoWrapper = document.getElementById(`video-player_${this.videoNumber}`);
        this.video = document.getElementById(`video-player__video_${this.videoNumber}`);
        this.timer = 0;  
        this.gap = 0;  //progress bar
        this.skipSize = 10;
    }

    start() {
        this.createControlPanel();
        this.init();
        this.addEventListeners();
        this.startVideo();
    }

    createControlPanel() {
        const controlPanel = `
    <div class="video-player__controls disappearance" id="video-player__controls_${this.videoNumber}">
        <button class="video-player__play" id="video-player__play_${this.videoNumber}">
            <svg class="video-player__stop-svg disappearance" id="video-player__stop-svg_${this.videoNumber}">
                <use xlink:href="../assets/svg/player-sprite.svg#pausebutton"></use>
            </svg>
            <svg class="video-player__play-svg" id="video-player__play-svg_${this.videoNumber}">
                <use xlink:href="../assets/svg/player-sprite.svg#playbutton"></use>
            </svg>
        </button>
        <button class="video-player__backward" id="video-player__backward_${this.videoNumber}">
            <svg class="video-player__backward-svg">
                <use xlink:href="../assets/svg/player-sprite.svg#fast-backward"></use>
            </svg>
        </button>
        <div class="video-player__progress-bar-container">
            <input class="video-player__progress-bar" id="video-player__progress-bar_${this.videoNumber}" type="range" min="0" max="59" step="0.01">
        </div>
        <button class="video-player__forward" id="video-player__forward_${this.videoNumber}">
            <svg class="video-player__forward-svg">
                <use xlink:href="../assets/svg/player-sprite.svg#fast-forward"></use>
            </svg>
        </button>
        <div class="video-player__volume-settings">
            <button class="video-player__volume-button" id="video-player__volume-button_${this.videoNumber}">
                <svg class="video-player__volume-svg" id="video-player__volume-svg_${this.videoNumber}">
                    <use xlink:href="../assets/svg/player-sprite.svg#volume"></use>
                </svg>
                <svg class="video-player__mute-svg disappearance" id="video-player__mute-svg_${this.videoNumber}">
                    <use xlink:href="../assets/svg/player-sprite.svg#mute"></use>
                </svg>
            </button>
            <div class="video-player__volume-range-wrapper">
                <input class="video-player__volume-range" id="video-player__volume-range_${this.videoNumber}" type="range" min="0" max="1" step="0.01"
                    value="0.5">
            </div>
        </div>
        <button class="video-player__settings" id="video-player__settings_${this.videoNumber}">
            <svg class="video-player__settings-svg">
                <use xlink:href="../assets/svg/player-sprite.svg#settings-button"></use>
            </svg>
        </button>
        <div class="settings-menu disappearance" id="settings-menu_${this.videoNumber}">
            <span class="settings-menu__close" id="settings-menu__close_${this.videoNumber}">X</span>
            <span class="settings-menu__video-quality">1080p</span>
            <span class="settings-menu__video-quality">720p</span>
            <span class="settings-menu__video-quality">480p</span>
            <span class="settings-menu__video-quality">360p</span>
        </div>
        <button class="video-player__fullscreen" id="video-player__fullscreen_${this.videoNumber}">
            <svg class="video-player__fullscreen-svg" id="video-player__fullscreen-svg_${this.videoNumber}">
                <use xlink:href="../assets/svg/player-sprite.svg#fullscreen"></use>
            </svg>
            <svg class="video-player__exit-fullscreen-svg disappearance" id="video-player__exit-fullscreen-svg_${this.videoNumber}">
                <use xlink:href="../assets/svg/player-sprite.svg#exit-full-screen"></use>
            </svg>
        </button>
    </div>`
        this.videoWrapper.insertAdjacentHTML('beforeend', controlPanel);
    }

    init() {    
        this.controls = document.getElementById(`video-player__controls_${this.videoNumber}`);
        this.playButton = document.getElementById(`video-player__play_${this.videoNumber}`);
        this.stopButtonSVG = document.getElementById(`video-player__stop-svg_${this.videoNumber}`);
        this.playButtonSVG = document.getElementById(`video-player__play-svg_${this.videoNumber}`);
        this.volumeSVG = document.getElementById(`video-player__volume-svg_${this.videoNumber}`);
        this.muteSVG = document.getElementById(`video-player__mute-svg_${this.videoNumber}`);
        this.volumeButton = document.getElementById(`video-player__volume-button_${this.videoNumber}`);
        /*full screen*/
        this.fullScreen = document.getElementById(`video-player__fullscreen_${this.videoNumber}`);
        this.fullScreenSVG = document.getElementById(`video-player__fullscreen-svg_${this.videoNumber}`);
        this.exitFullScreenSVG = document.getElementById(`video-player__exit-fullscreen-svg_${this.videoNumber}`);
        this.isFullscreen = false;
        /* volume*/
        this.volumeRange = document.getElementById(`video-player__volume-range_${this.videoNumber}`);
        /*backward&forward*/
        this.backwardButton = document.getElementById(`video-player__backward_${this.videoNumber}`);
        this.forwardButton = document.getElementById(`video-player__forward_${this.videoNumber}`);
        /* progress bar*/
        this.progressBar = document.getElementById(`video-player__progress-bar_${this.videoNumber}`);
        /*speed and skip settings */
        this.settingsButton = document.getElementById(`video-player__settings_${this.videoNumber}`);
        this.settingsMenu = document.getElementById(`settings-menu_${this.videoNumber}`);
        this.settingsClose = document.getElementById(`settings-menu__close_${this.videoNumber}`);
    }

    addEventListeners() {
        this.video.addEventListener('ended', (event) => {
            this.video.pause();
            this.stopButtonSVG.classList.add('disappearance');
            this.playButtonSVG.classList.remove('disappearance');
            this.controls.classList.add('disappearance');
            this.video.dispatchEvent(new CustomEvent("videoEnded"));
        });

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
            this.gap = setInterval(() => this.checkProgress(), 10);

        } else {
            this.video.pause();
            this.stopButtonSVG.classList.add('disappearance');
            this.playButtonSVG.classList.remove('disappearance');
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
            this.video.requestFullscreen();
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



















