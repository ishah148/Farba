import { VideoPlayer } from "./video_player.js";

export class VideoPlayersHandler {
    constructor() {
        this.startButton = document.querySelector(".video-player__start-button");
        
    }

    init() {
        this.addEventListeners();
    }

    addEventListeners() {
        this.startButton.addEventListener("click", () => this.createVideoPlayer());
        window.addEventListener("videoEnded", () => {
            delete this.videoPlayer1;
            this.startButton.classList.remove('disappearance');
            document.querySelector(".video-player__controls").remove();

            let video = document.querySelector('.video-player__video'); //remove event listeners from video
            let videoClone = video.cloneNode(true);
            video.parentNode.replaceChild(videoClone, video);

        })
    }

    createVideoPlayer() {
        this.videoPlayer1 = new VideoPlayer();
        this.videoPlayer1.start();
        this.startButton.classList.add('disappearance');
    }
}