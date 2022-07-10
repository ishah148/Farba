export class VideoPlayer {
    constructor() {
        this.videoWrapper = document.querySelector('.video-player_1');
        this.video = document.querySelector('.video-player__video_1');
        this.startButton = document.querySelector('.video-player__start-button_1');
        this.startButtonSVG = document.querySelector('.video-player__start-button-svg_1');
        /*start&pause video*/
        

        

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
        /*time*/
        this.currentTime = document.querySelector('.video-player__current-time');
        this.durationTime = document.querySelector('.video-player__duration-time');
        /*backward&forward*/
        this.forwardButton = document.querySelector('.video-player__forward');
        /* progress bar*/
        this.gap = 0;
        /*speed and skip settings */
        this.settingsButton = document.querySelector('.video-player__settings');
        this.settingsMenu = document.querySelector('.settings-menu');
        this.settingsClose = document.querySelector('.settings-menu__close');
        this.speedArray = document.querySelectorAll('.settings-menu__video-speed');
        this.skipArray = document.querySelectorAll('.settings-menu__video-skip');
        this.skipSize = 5;
        this.videoSpeed = 1;
        /****************************************************************/
    }

    init() {
        this.createControlPanel();
        this.addEventListeners();
    }

    createControlPanel() {
        this.controls = document.createElement("div");
        this.controls.classList.add("video-player__controls", "disappearance");  //* remove disappearance?

        this.playButton = document.createElement("button");
        this.playButton.classList.add("video-player__play");

        this.stopButtonSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.stopButtonSVG.classList.add("video-player__stop-svg", "disappearance");
        const useStopSVG = document.createElementNS("http://www.w3.org/2000/svg", "use");
        useStopSVG.setAttributeNS("http://www.w3.org/1999/xlink", 'xlink:href', "../assets/svg/player-sprite.svg#pausebutton");

        this.playButtonSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.playButtonSVG.classList.add("video-player__play-svg");
        const usePlaySVG = document.createElementNS("http://www.w3.org/2000/svg", "use");
        usePlaySVG.setAttributeNS("http://www.w3.org/1999/xlink", 'xlink:href', "../assets/svg/player-sprite.svg#playbutton");

        this.backwardButton = document.createElement("button");
        this.backwardButton.classList.add("video-player__backward");

        const backwardButtonSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        backwardButtonSVG.classList.add("video-player__backward-svg");
        const useBackwardSVG = document.createElementNS("http://www.w3.org/2000/svg", "use");
        useBackwardSVG.setAttributeNS("http://www.w3.org/1999/xlink", 'xlink:href', "../assets/svg/player-sprite.svg#fast-backward");

        const progressBarContainer =  document.createElement("div");
        progressBarContainer.classList.add("video-player__progress-bar-container");
        this.progressBar = document.createElement("input");
        this.progressBar.classList.add("video-player__progress-bar");
        this.progressBar.type = "range";
        this.progressBar.min = "0";
        this.progressBar.max = "59";
        this.progressBar.step = "0.01"

        this.forwardButton = document.createElement("button");
        this.forwardButton.classList.add("video-player__forward");

        const forwardButtonSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        forwardButtonSVG.classList.add("video-player__forward-svg");
        const useForwardSVG = document.createElementNS("http://www.w3.org/2000/svg", "use");
        useForwardSVG.setAttributeNS("http://www.w3.org/1999/xlink", 'xlink:href', "../assets/svg/player-sprite.svg#fast-forward");

        this.stopButtonSVG.append(useStopSVG);
        this.playButtonSVG.append(usePlaySVG);
        backwardButtonSVG.append(useBackwardSVG)
        forwardButtonSVG.append(useForwardSVG)

        this.playButton.append(this.stopButtonSVG);
        this.playButton.append(this.playButtonSVG);
        this.backwardButton.append(backwardButtonSVG);
        progressBarContainer.append(this.progressBar);
        this.forwardButton.append(forwardButtonSVG);
        
        this.controls.append(this.playButton);
        this.controls.append(this.backwardButton);
        this.controls.append(progressBarContainer);
        this.controls.append(this.forwardButton);

        this.videoWrapper.append(this.controls);
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

        this.skipArray.forEach((item) => item.addEventListener('click', (e) => this.setSkipSize(e)));
        this.speedArray.forEach((item) => item.addEventListener('click', (e) => this.setSpeed(e)));

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



















