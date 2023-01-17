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
                <div class="video-player__video-wrapper" id="video-player__video-wrapper_${videoInfo.id}">
                    <!--item__video-->
                    <video class="video-player__video" id="video-player__video_${videoInfo.id}"
                        poster="./assets/images/video_posters/mainPage/poster${videoInfo.id}.webp" preload="metadata">
                        <source id="source__HD-quality_${videoInfo.id}" src="./assets/video/content/video_${videoInfo.id}_1080.mp4"
                            type="video/mp4">
                        <source id="source__high-quality_${videoInfo.id}" src="./assets/video/content/video_${videoInfo.id}_720.mp4"
                            type="video/mp4">
                        <source id="source__medium-quality_${videoInfo.id}"
                            src="./assets/video/content/video_${videoInfo.id}_540.mp4" type="video/mp4">
                        <source id="source__low-quality_${videoInfo.id}" src="./assets/video/content/video_${videoInfo.id}_360.mp4"
                            type="video/mp4">
                    </video>
                    <button class="video-player__start-button" id="video-player__start-button_${videoInfo.id}">
                        <svg class="video-player__start-button-svg">
                            <use xlink:href="./assets/svg/player-sprite.svg#Play_hover"></use>
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
            startButton.addEventListener("click", (event) => {
                this.stopAllPlayers();
                this.createVideoPlayer(event);
            })
        });
    }

    stopAllPlayers() {
        for(let activeVideoPlayerNumber in this.videoPlayers) {
            this.removeVideoPlayer(document.querySelector(`#video-player__video_${activeVideoPlayerNumber}`));
        }
    }

    createVideoPlayer(event) {
        const startButton = event.currentTarget;
        const videoNumber = (startButton.id.match(/\d+$/m) || [])[0];
        const videoPlayer = new VideoPlayer(videoNumber);
        this.videoPlayers[`${videoNumber}`] = videoPlayer;
        document.getElementById(`video-player__video_${videoNumber}`).addEventListener("videoEnded", (event) =>
            this.removeVideoPlayer(event.target));
        videoPlayer.start();
        startButton.classList.add('disappearance');
    }

    removeVideoPlayer(video) {
        const videoNumber = (video.id.match(/\d+$/m) || [])[0];
        delete this.videoPlayers[`${videoNumber}`];
        document.getElementById(`video-player__start-button_${videoNumber}`).classList.remove('disappearance');
        document.getElementById(`video-player__controls_${videoNumber}`).remove();

        let videoClone = video.cloneNode(true);  //remove event listeners from video
        video.parentNode.replaceChild(videoClone, video);
    }
}