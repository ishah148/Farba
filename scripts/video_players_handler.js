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
    }

    createVideoPlayer(event) {
        const startButton = event.currentTarget;
        const videoNumber = (startButton.id.match(/\d+$/m) || [])[0];
        const videoPlayer = new VideoPlayer(videoNumber);
        this.videoPlayers[`${videoNumber}`] = videoPlayer;
        document.getElementById(`video-player__video_${videoNumber}`).addEventListener("videoEnded", (event) =>
            this.removeVideoPlayer(event));
        videoPlayer.start();
        startButton.classList.add('disappearance');
    }

    removeVideoPlayer(event) {
        const video = event.target;
        const videoNumber = (video.id.match(/\d+$/m) || [])[0];
        delete this.videoPlayers[`${videoNumber}`];
        document.getElementById(`video-player__start-button_${videoNumber}`).classList.remove('disappearance');
        document.getElementById(`video-player__controls_${videoNumber}`).remove();


        let videoClone = video.cloneNode(true);  //remove event listeners from video
        video.parentNode.replaceChild(videoClone, video);
    }
}