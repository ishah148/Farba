import { VideoPlayer } from "./video_player.js";

export class VideoPlayersHandler {
    constructor() {
        this.startButtons = document.querySelectorAll(".video-player__start-button");
        this.videoPlayers = {};
    }

    init() {
        this.addEventListeners();
    }

    addEventListeners() {
        this.startButtons.forEach((startButton) => {
            startButton.addEventListener("click", (event) => this.createVideoPlayer(event))
        });
        window.addEventListener("videoEnded", () => this.removeVideoPlayer());
    }

    createVideoPlayer(event) {
        const startButton = event.currentTarget;
        const videoNumber = (startButton.id.match(/\d$/m)||[])[0];
        const videoPlayer = new VideoPlayer(videoNumber);
        this.videoPlayers[`${videoNumber}`] = videoPlayer;
        videoPlayer.start();
        startButton.classList.add('disappearance');
    }

    removeVideoPlayer() {
        delete this.videoPlayer1;
        this.startButton.classList.remove('disappearance');
        document.querySelector(".video-player__controls").remove();

        let video = document.querySelector('.video-player__video'); //remove event listeners from video
        let videoClone = video.cloneNode(true);
        video.parentNode.replaceChild(videoClone, video);
    }
}