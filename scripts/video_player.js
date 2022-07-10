export class VideoPlayer {
    constructor() {
        this.videoWrapper = document.querySelector('.video-player_1');
        this.video = document.querySelector('.video-player__video_1');
        this.startButton = document.querySelector('.video-player__start-button_1');
        this.startButtonSVG = document.querySelector('.video-player__start-button-svg_1');


        /*start&pause video*/

        this.isFullscreen = false;
        this.timer = 0;

        this.gap = 0;
        /*speed and skip settings */



        
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

        const progressBarContainer = document.createElement("div");
        progressBarContainer.classList.add("video-player__progress-bar-container");
        this.progressBar = document.createElement("input");
        this.progressBar.classList.add("video-player__progress-bar");
        this.progressBar.type = "range";
        this.progressBar.min = "0";
        this.progressBar.max = "59";
        this.progressBar.step = "0.01";

        this.forwardButton = document.createElement("button");
        this.forwardButton.classList.add("video-player__forward");

        const forwardButtonSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        forwardButtonSVG.classList.add("video-player__forward-svg");
        const useForwardSVG = document.createElementNS("http://www.w3.org/2000/svg", "use");
        useForwardSVG.setAttributeNS("http://www.w3.org/1999/xlink", 'xlink:href', "../assets/svg/player-sprite.svg#fast-forward");

        const timer = document.createElement("div");
        timer.classList.add("video-player__timer");
        this.currentTime = document.createElement("span");
        this.currentTime.classList.add("video-player__current-time");
        this.currentTime.innerHTML = "00:00";
        this.durationTime = document.createElement("span");
        this.durationTime.classList.add("video-player__duration-time");
        this.durationTime.innerHTML = "00:00";
        const slash = document.createElement("span");
        slash.innerHTML = "/";

        const volumeSettings = document.createElement("div");
        volumeSettings.classList.add("video-player__volume-settings");

        this.volumeButton = document.createElement("button");
        this.volumeButton.classList.add("video-player__volume-button");

        this.volumeSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.volumeSVG.classList.add("video-player__volume-svg");
        const useVolumeSVG = document.createElementNS("http://www.w3.org/2000/svg", "use");
        useVolumeSVG.setAttributeNS("http://www.w3.org/1999/xlink", 'xlink:href', "../assets/svg/player-sprite.svg#volume");

        this.muteSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.muteSVG.classList.add("video-player__mute-svg");
        const useMuteSVG = document.createElementNS("http://www.w3.org/2000/svg", "use");
        useMuteSVG.setAttributeNS("http://www.w3.org/1999/xlink", 'xlink:href', "../assets/svg/player-sprite.svg#mute");

        const volumeRangeWrapper = document.createElement("div");
        volumeRangeWrapper.classList.add("video-player__volume-range-wrapper");
        this.volumeRange = document.createElement("input");
        this.volumeRange.classList.add("video-player__volume-range");
        this.volumeRange.type = "range";
        this.volumeRange.min = "0";
        this.volumeRange.max = "1";
        this.volumeRange.step = "0.01";
        this.volumeRange.value = "0.5";

        this.settingsButton = document.createElement("button");
        this.settingsButton.classList.add("video-player__settings");

        const settingsButtonSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        settingsButtonSVG.classList.add("video-player__settings-svg");
        const useSettingsSVG = document.createElementNS("http://www.w3.org/2000/svg", "use");
        useSettingsSVG.setAttributeNS("http://www.w3.org/1999/xlink", 'xlink:href', "../assets/svg/player-sprite.svg#settings-button");

        this.settingsMenu = document.createElement("div");
        this.settingsMenu.classList.add("settings-menu", "disappearance");

        this.settingsClose = document.createElement("span");
        this.settingsClose.classList.add("settings-menu__close");
        this.settingsClose.innerHTML = "X";

        const settingsSpeedHeader = document.createElement("span");
        settingsSpeedHeader.classList.add("settings-menu__header");
        settingsSpeedHeader.innerHTML = "Playback Speed";

        const settingsSkipHeader = document.createElement("span");
        settingsSkipHeader.classList.add("settings-menu__header");
        settingsSkipHeader.innerHTML = "Skip Interval";

        const settingsSpeed1 = document.createElement("span");
        const settingsSpeed2 = document.createElement("span");
        const settingsSpeed3 = document.createElement("span");
        const settingsSpeed4 = document.createElement("span");
        const settingsSpeed5 = document.createElement("span");
        const settingsSpeed6 = document.createElement("span");
        const settingsSpeed7 = document.createElement("span");
        const settingsSpeed8 = document.createElement("span");
        const settingsSkip1 = document.createElement("span");
        const settingsSkip2 = document.createElement("span");
        const settingsSkip3 = document.createElement("span");
        const settingsSkip4 = document.createElement("span");
        settingsSpeed1.classList.add("settings-menu__video-speed");
        settingsSpeed2.classList.add("settings-menu__video-speed");
        settingsSpeed3.classList.add("settings-menu__video-speed");
        settingsSpeed4.classList.add("settings-menu__video-speed", "active");
        settingsSpeed5.classList.add("settings-menu__video-speed");
        settingsSpeed6.classList.add("settings-menu__video-speed");
        settingsSpeed7.classList.add("settings-menu__video-speed");
        settingsSpeed8.classList.add("settings-menu__video-speed");
        settingsSkip1.classList.add("settings-menu__video-skip");
        settingsSkip2.classList.add("settings-menu__video-skip", "active");
        settingsSkip3.classList.add("settings-menu__video-skip");
        settingsSkip4.classList.add("settings-menu__video-skip");
        settingsSpeedHeader.dataset.translate = "speed";
        settingsSpeed1.dataset.speed = "0.25";
        settingsSpeed2.dataset.speed = "0.5";
        settingsSpeed3.dataset.speed = "0.75";
        settingsSpeed4.dataset.speed = "1";
        settingsSpeed5.dataset.speed = "1.25";
        settingsSpeed6.dataset.speed = "1.5";
        settingsSpeed7.dataset.speed = "1.75";
        settingsSpeed8.dataset.speed = "2";
        settingsSkipHeader.dataset.translate = "skip";
        settingsSkip1.dataset.skip = "3";
        settingsSkip2.dataset.skip = "5";
        settingsSkip3.dataset.skip = "10";
        settingsSkip4.dataset.skip = "20";
        settingsSpeed1.innerHTML = "0.25x";
        settingsSpeed2.innerHTML = "0.5x";
        settingsSpeed3.innerHTML = "0.75x";
        settingsSpeed4.innerHTML = "1x";
        settingsSpeed5.innerHTML = "1.25x";
        settingsSpeed6.innerHTML = "1.5x";
        settingsSpeed7.innerHTML = "1.75x";
        settingsSpeed8.innerHTML = "2x";
        settingsSkip1.innerHTML = "3s";
        settingsSkip2.innerHTML = "5s";
        settingsSkip3.innerHTML = "10s";
        settingsSkip4.innerHTML = "20s";

        this.speedArray = [settingsSpeed1, settingsSpeed2, settingsSpeed3, settingsSpeed4, settingsSpeed5, settingsSpeed6, settingsSpeed7, settingsSpeed8];
        this.skipArray = [settingsSkip1, settingsSkip2, settingsSkip3, settingsSkip4];
        
        this.fullScreen = document.createElement("button");
        this.fullScreen.classList.add("video-player__fullscreen");

        this.fullScreenSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.fullScreenSVG.classList.add("video-player__fullscreen-svg");
        const useFullScreenSVG = document.createElementNS("http://www.w3.org/2000/svg", "use");
        useFullScreenSVG.setAttributeNS("http://www.w3.org/1999/xlink", 'xlink:href', "../assets/svg/player-sprite.svg#fullscreen");

        this.exitFullScreenSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.exitFullScreenSVG.classList.add("video-player__exit-fullscreen-svg");
        const useExitFullScreenSVG = document.createElementNS("http://www.w3.org/2000/svg", "use");
        useExitFullScreenSVG.setAttributeNS("http://www.w3.org/1999/xlink", 'xlink:href', "../assets/svg/player-sprite.svg#exit-full-screen");

        this.stopButtonSVG.append(useStopSVG);
        this.playButtonSVG.append(usePlaySVG);
        backwardButtonSVG.append(useBackwardSVG);
        forwardButtonSVG.append(useForwardSVG);
        this.volumeSVG.append(useVolumeSVG);
        this.muteSVG.append(useMuteSVG);
        settingsButtonSVG.append(useSettingsSVG);
        this.fullScreenSVG.append(useFullScreenSVG);
        this.exitFullScreenSVG.append(useExitFullScreenSVG);

        this.playButton.append(this.stopButtonSVG, this.playButtonSVG);
        this.backwardButton.append(backwardButtonSVG);
        progressBarContainer.append(this.progressBar);
        this.forwardButton.append(forwardButtonSVG);
        timer.append(this.currentTime, slash, this.durationTime);
        this.volumeButton.append(this.volumeSVG, this.muteSVG);
        volumeRangeWrapper.append(this.volumeRange);
        this.settingsButton.append(settingsButtonSVG);
        this.settingsMenu.append(this.settingsClose,
            settingsSpeedHeader,
            settingsSpeed1,
            settingsSpeed2,
            settingsSpeed3,
            settingsSpeed4,
            settingsSpeed5,
            settingsSpeed6,
            settingsSpeed7,
            settingsSpeed8,
            settingsSkip1,
            settingsSkip2,
            settingsSkip3,
            settingsSkip4,
            );
        this.fullScreen.append(this.fullScreenSVG, this.exitFullScreenSVG);
        
        volumeSettings.append(this.volumeButton, volumeRangeWrapper);

        this.controls.append(this.playButton,
            this.backwardButton,
            progressBarContainer,
            this.forwardButton,
            timer,
            volumeSettings,
            this.settingsButton,
            this.settingsMenu,
            this.fullScreen);

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



















