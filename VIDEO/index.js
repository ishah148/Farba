

/*videoplayer*/

/*start&pause video*/
const videoWrapper = document.querySelector('.video-player-wrapper');
const video = document.querySelector('.video-player');
const controls = document.querySelector('.video-controls');
const playButton = document.querySelector('.play-video');
const stopButtonSVG = document.querySelector('.stop-button-svg');
const playButtonSVG = document.querySelector('.play-button-svg');
const startButtonSVG = document.querySelector('.start-button');
const startButton = document.querySelector('.start-button-wrapper');
const fullScreenSVG = document.querySelector('.fullscreen-svg');
const exitFullScreenSVG = document.querySelector('.exit-fullscreen-svg');
const volumeSVG = document.querySelector('.volume-svg');
const muteSVG = document.querySelector('.mute-svg');
const volumeButton = document.querySelector('.volume-button');
/*full screen*/
const fullScreen = document.querySelector('.fullscreen');
let isFullscreen = false;
let timer = 0;
/* volume*/
const volumeRange = document.querySelector('.volume-range');
/*time*/
const currentTime = document.querySelector('.current-time');
const durationTime = document.querySelector('.duration-time');
/*backward&forward*/
const backwardButton = document.querySelector('.backward-button');
const forwardButton = document.querySelector('.forward-button');
/* progress bar*/
const progressBar = document.querySelector('.progress-bar-range');
let gap = 0;
/*speed and skip settings */
const settingsButton = document.querySelector('.common-settings');
const settingsMenu = document.querySelector('.settings-menu');
const settingsClose = document.querySelector('.settings-close');
const speedArray = document.querySelectorAll('.video-speed');
const skipArray = document.querySelectorAll('.video-skip');
let skipSize = 5;
let videoSpeed = 1;
/****************************************************************/











/*Toggle active class*/

function toggleClassActive(target, className, arr){        
    arr.forEach(item=>{item.classList.remove(className)})
    target.classList.add(className);
}


/**********videoplayer**************************/

/*start&pause video*/

function startVideo() {
    controls.classList.remove('disappearance');
    toggleVideo();
  }

  video.addEventListener('ended', (event) => {
    video.pause();
    stopButtonSVG.classList.add('disappearance');
    playButtonSVG.classList.remove('disappearance');
    startButtonSVG.classList.remove('disappearance');
    startButton.classList.remove('disappearance');
    controls.classList.add('disappearance');
  });

function toggleVideo() {
    if (video.paused) {
      video.play();
      stopButtonSVG.classList.remove('disappearance');
      playButtonSVG.classList.add('disappearance');
      startButtonSVG.classList.add('disappearance');
      startButton.classList.add('disappearance');
      gap = setInterval(checkProgress, 10);

    } else {
      video.pause();
      stopButtonSVG.classList.add('disappearance');
      playButtonSVG.classList.remove('disappearance');
      startButtonSVG.classList.remove('disappearance');
      startButton.classList.remove('disappearance');
      clearInterval(gap)
    };
  }

startButtonSVG.addEventListener('click', startVideo); 
video.addEventListener('click', toggleVideo);
playButton.addEventListener('click', toggleVideo);



/*full screen*/

function toggleFullScreen(){
    (isFullscreen) ? (document.exitFullscreen(),
                      isFullscreen = false,
                      fullScreenSVG.classList.remove('disappearance'),
                      exitFullScreenSVG.classList.add('disappearance')) 

                   : (document.querySelector(".video-player-wrapper").requestFullscreen(),
                      isFullscreen = true,
                      fullScreenSVG.classList.add('disappearance'),
                      exitFullScreenSVG.classList.remove('disappearance'));
  }


fullScreen.addEventListener('click', toggleFullScreen);


function hideControls() {
    if(video.currentTime) {
    controls.classList.remove('disappearance');
    clearTimeout(timer);
    timer = setTimeout(function(){
            controls.classList.add('disappearance');
            settingsMenu.classList.add('disappearance');
        },3000)
    }
}

videoWrapper.addEventListener('mousemove', hideControls )
videoWrapper.addEventListener('click', hideControls )



/* volume*/

function changeVolume(event) {
    if(!video.muted){
        video.volume = event.target.value;
        (!video.volume) ?  (volumeSVG.classList.add('disappearance'),
                            muteSVG.classList.remove('disappearance'))

                        :  (volumeSVG.classList.remove('disappearance'),
                            muteSVG.classList.add('disappearance'));
    }
}

volumeRange.addEventListener('mousemove',changeVolume);





/*toggle mute*/

function toggleMute(){
    if(!volumeSVG.classList.contains('disappearance')) {
        volumeSVG.classList.add('disappearance');
        muteSVG.classList.remove('disappearance');
        video.muted = true;
        volumeRange.disabled = true;
    } else if(video.volume){
        volumeSVG.classList.remove('disappearance');
        muteSVG.classList.add('disappearance');
        video.muted = false;
        volumeRange.disabled = false;
    }

}

volumeButton.addEventListener('click', toggleMute);




/*time*/

function timeCounter () {
    let currentMinutes = Math.floor(video.currentTime/60);
    let currentSeconds = Math.floor(video.currentTime - currentMinutes*60);
    let durationMinutes = Math.floor(video.duration/60);
    let durationSeconds = Math.floor(video.duration - durationMinutes*60);
    currentMinutes = (currentMinutes<10) ? '0'+ currentMinutes : currentMinutes;
    currentSeconds = (currentSeconds<10) ? '0'+ currentSeconds : currentSeconds;
    durationMinutes = (durationMinutes<10) ? '0'+ durationMinutes : durationMinutes;
    durationSeconds = (durationSeconds<10) ? '0'+ durationSeconds : durationSeconds;
    currentTime.innerHTML = `${currentMinutes}:${currentSeconds}`;
    durationTime.innerHTML = `${durationMinutes}:${durationSeconds}`;
}

video.addEventListener('timeupdate',timeCounter);




/*backward&forward*/

backwardButton.addEventListener('click', () => {
     ((video.currentTime - skipSize /*skip */) !== 0) ? video.currentTime -= skipSize : video.currentTime = 0;
})

forwardButton.addEventListener('click', () => {
    ((video.currentTime + skipSize /*skip*/) < video.duration) ? video.currentTime = video.currentTime + skipSize : video.currentTime = video.duration;
})



/* progress bar*/

function checkProgress() {
    progressBar.value = video.currentTime;
}

progressBar.addEventListener('input', function(){
    video.currentTime = this.value;
});




/*speed and skip settings */

function setSkipSize(event) {
    toggleClassActive(event.target,'active',skipArray);
    skipSize = +event.target.dataset.skip;
}

function setSpeed(event) {
    toggleClassActive(event.target,'active',speedArray);
    videoSpeed = +event.target.dataset.speed;
    video.playbackRate = videoSpeed;
}

skipArray.forEach((item)=>item.addEventListener('click',setSkipSize));
speedArray.forEach((item)=>item.addEventListener('click',setSpeed));

settingsButton.addEventListener('click', function(){
    settingsMenu.classList.toggle('disappearance');
});

settingsClose.addEventListener('click', function(){
    settingsMenu.classList.add('disappearance');
});











