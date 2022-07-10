export class VideoPlayer {
    constructor() {
        /*videoplayer*/
        /*start&pause video*/
        this.videoWrapper = document.querySelector('.video-player');
        this.video = document.querySelector('.video-player__video');
        this.controls = document.querySelector('.video-player__controls');
        this.playButton = document.querySelector('.video-player__play');
        this.stopButtonSVG = document.querySelector('.video-player__stop-svg');
        this.playButtonSVG = document.querySelector('.video-player__play-svg');
        this.startButtonSVG = document.querySelector('.video-player__start-button-svg');
        this.startButton = document.querySelector('.video-player__start-button');
        this.volumeSVG = document.querySelector('.video-player__volume-svg');
        this.muteSVG = document.querySelector('.video-player__mute-svg');
        this.volumeButton = document.querySelector('.video-player__volume-button');
        /*full screen*/
        this.fullScreen = document.querySelector('.video-player__fullscreen');
        this.fullScreenSVG = document.querySelector('.video-player__fullscreen-svg');
        this.exitFullScreenSVG = document.querySelector('.video-player__exit-fullscreen-svg');
        this.isFullscreen = false;
        this.timer = 0;
        /* volume*/
        this.volumeRange = document.querySelector('.video-player__volume-range');
        /*backward&forward*/
        this.backwardButton = document.querySelector('.video-player__backward');
        this.forwardButton = document.querySelector('.video-player__forward');
        /* progress bar*/
        this.progressBar = document.querySelector('.video-player__progress-bar');
        this.gap = 0;
        /*speed and skip settings */
        this.settingsButton = document.querySelector('.video-player__settings');
        this.settingsMenu = document.querySelector('.settings-menu');
        this.settingsClose = document.querySelector('.settings-menu__close');
        this.skipSize = 10;
    }

    init() {
        this.createControlPanel();
        this.addEventListeners();
    }

    createControlPanel() {
      
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



















