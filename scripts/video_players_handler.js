import { VideoPlayer } from "./video_player.js";

export class VideoPlayersHandler {
    constructor(videoInfoList) {
        this.videoPlayersContainer = document.querySelector('.video-section__content');
        this.videoPlayers = {};
        this.init(videoInfoList);
    }

    init(videoInfoList) {
        this.renderVideoPlayersContainerContent(videoInfoList);
        this.startButtons = document.querySelectorAll(".video-player__start-button");
        this.addEventListeners();
    }

    renderVideoPlayersContainerContent(videoInfoList) {
        for (const videoInfo of videoInfoList) {
            const videoPlayerElement = `
            <div class="video-player">
                <!--item-->
                <div class="video-player__video-wrapper" id="video-player__video-wrapper_${videoInfo.number}">
                    <!--item__video-->
                    <video class="video-player__video" id="video-player__video_${videoInfo.number}"
                        poster="../assets/images/video_posters/poster${videoInfo.number}.jpg" preload="metadata">
                        <source id="source__HD-quality_${videoInfo.number}" src="../assets/video/content/video_${videoInfo.number}_1080.mp4"
                            type="video/mp4">
                        <source id="source__high-quality_${videoInfo.number}" src="../assets/video/content/video_${videoInfo.number}_720.mp4"
                            type="video/mp4">
                        <source id="source__medium-quality_${videoInfo.number}"
                            src="../assets/video/content/video_${videoInfo.number}_540.mp4" type="video/mp4">
                        <source id="source__low-quality_${videoInfo.number}" src="../assets/video/content/video_${videoInfo.number}_360.mp4"
                            type="video/mp4">
                    </video>
                    <button class="video-player__start-button" id="video-player__start-button_${videoInfo.number}">
                        <svg class="video-player__start-button-svg">
                            <use xlink:href="../assets/svg/player-sprite.svg#Play_hover"></use>
                        </svg>
                    </button>
                </div>
                <p class="video-player__caption" data-translate="${videoInfo.dataTranslate}">${videoInfo.caption}</p>
            </div>
            `;
            this.videoPlayersContainer.insertAdjacentHTML('beforeend', videoPlayerElement);
        }
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