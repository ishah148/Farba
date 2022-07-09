export class VideoPlayer {
    constructor() {
        /*videoplayer*/
        /*start&pause video*/
        this.videoWrapper = document.querySelector('.video-player');
        this.video = document.querySelector('.video-player__video');
        this.controls = document.querySelector('.video-controls');
        this.playButton = document.querySelector('.play-video');
        this.stopButtonSVG = document.querySelector('.stop-button-svg');
        this.playButtonSVG = document.querySelector('.play-button-svg');
        this.startButtonSVG = document.querySelector('.video-player__start-button-svg');
        this.startButton = document.querySelector('.video-player__start-button');
        this.fullScreenSVG = document.querySelector('.fullscreen-svg');
        this.exitFullScreenSVG = document.querySelector('.exit-fullscreen-svg');
        this.volumeSVG = document.querySelector('.volume-svg');
        this.muteSVG = document.querySelector('.mute-svg');
        this.volumeButton = document.querySelector('.volume-button');
        /*full screen*/
        this.fullScreen = document.querySelector('.fullscreen');
        this.isFullscreen = false;
        this.timer = 0;
        /* volume*/
        this.volumeRange = document.querySelector('.volume-range');
        /*time*/
        this.currentTime = document.querySelector('.current-time');
        this.durationTime = document.querySelector('.duration-time');
        /*backward&forward*/
        this.backwardButton = document.querySelector('.backward-button');
        this.forwardButton = document.querySelector('.forward-button');
        /* progress bar*/
        this.progressBar = document.querySelector('.progress-bar-range');
        this.gap = 0;
        /*speed and skip settings */
        this.settingsButton = document.querySelector('.common-settings');
        this.settingsMenu = document.querySelector('.settings-menu');
        this.settingsClose = document.querySelector('.settings-close');
        this.speedArray = document.querySelectorAll('.video-speed');
        this.skipArray = document.querySelectorAll('.video-skip');
        this.skipSize = 5;
        this.videoSpeed = 1;
        /****************************************************************/
    }
    
    init() {
        this.addEventListeners()
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

        this.video.addEventListener('timeupdate', () => this.timeCounter());


        this.backwardButton.addEventListener('click', () => {
            ((this.video.currentTime - this.skipSize /*skip */) !== 0) ? this.video.currentTime -= this.skipSize : this.video.currentTime = 0;
        })

        this.forwardButton.addEventListener('click', () => {
            ((this.video.currentTime + this.skipSize /*skip*/) < this.video.duration) ? this.video.currentTime = this.video.currentTime + this.skipSize : this.video.currentTime = this.video.duration;
        })

        this.progressBar.addEventListener('input', (e) => {
            this.video.currentTime = e.target.value;
        });

        this.skipArray.forEach((item) => item.addEventListener('click', this.setSkipSize.bind(this)));
        this.speedArray.forEach((item) => item.addEventListener('click', this.setSpeed.bind(this)));

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

    timeCounter() {
        let currentMinutes = Math.floor(this.video.currentTime / 60);
        let currentSeconds = Math.floor(this.video.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(this.video.duration / 60);
        let durationSeconds = Math.floor(this.video.duration - durationMinutes * 60);
        currentMinutes = (currentMinutes < 10) ? '0' + currentMinutes : currentMinutes;
        currentSeconds = (currentSeconds < 10) ? '0' + currentSeconds : currentSeconds;
        durationMinutes = (durationMinutes < 10) ? '0' + durationMinutes : durationMinutes;
        durationSeconds = (durationSeconds < 10) ? '0' + durationSeconds : durationSeconds;
        this.currentTime.innerHTML = `${currentMinutes}:${currentSeconds}`;
        this.durationTime.innerHTML = `${durationMinutes}:${durationSeconds}`;
    }

    checkProgress() {
        this.progressBar.value = this.video.currentTime;
    }

    setSkipSize(event) {
        this.toggleClassActive(event.target, 'active', this.skipArray);
        this.skipSize = +event.target.dataset.skip;
    }

    setSpeed(event) {
        this.toggleClassActive(event.target, 'active', this.speedArray);
        this.videoSpeed = +event.target.dataset.speed;
        this.video.playbackRate = this.videoSpeed;
    }

}



/*speed and skip settings */



















