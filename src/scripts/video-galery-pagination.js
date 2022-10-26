import { VideoSlider } from './video_slider';
import { videoGaleryConfig } from './configs/video-configs';



export class VideoGaleryPagination {
  constructor() {
    this.promoButton = document.querySelector('.video-galery__promo-section-button');
    this.reviewsButton = document.querySelector('.video-galery__reviews-section-button');
    this.videoSliderContainer = document.querySelector('.video-galery__container');
    this.videoSliderContainerInner = document.querySelector('.video-galery__container-inner');
    this.rightButton = document.querySelector(".video-galery__area-right");
    this.leftButton = document.querySelector(".video-galery__area-left");
    this.currentVideoSlider = null;
    this.init();
    this.addEventHandlers();
  }

  init() {
    this.currentVideoSlider = new VideoSlider('promotional', 0, videoGaleryConfig.promotional);
  }

  addEventHandlers() {
    this.promoButton.addEventListener('click', (event) => this.changePage(event.target))
    this.reviewsButton.addEventListener('click', (event) => this.changePage(event.target))
  }

  changePage(targetLink) {
    if (!targetLink.classList.contains('video-galery__active-section')) {
      this.videoSliderContainerInner.replaceChildren();
      this.removeEventHandlers();
      delete this.currentVideoSlider;

      if (targetLink.classList.contains('video-galery__promo-section-button')) {
        this.videoSliderContainerInner.classList.replace('video-galery__reviews-slides', 'video-galery__promotional-slides');
        this.videoSliderContainerInner.classList.remove('container-inner-transition');
        setTimeout(() => {
          this.videoSliderContainerInner.classList.add('container-inner-transition');
        }, 1000)
        this.currentVideoSlider = new VideoSlider('promotional', 0, videoGaleryConfig.promotional);
        this.promoButton.classList.add('video-galery__active-section');
        this.reviewsButton.classList.remove('video-galery__active-section');
      }

      if (targetLink.classList.contains('video-galery__reviews-section-button')) {
        this.videoSliderContainerInner.classList.replace('video-galery__promotional-slides', 'video-galery__reviews-slides');
        this.videoSliderContainerInner.classList.remove('container-inner-transition');
        setTimeout(() => {
          this.videoSliderContainerInner.classList.add('container-inner-transition');
        }, 1000)
        this.currentVideoSlider = new VideoSlider('productReviews', 0, videoGaleryConfig.productReviews);
        this.reviewsButton.classList.add('video-galery__active-section');
        this.promoButton.classList.remove('video-galery__active-section');
      }
    }
  }

  removeEventHandlers() {
    document.removeEventListener('keyup', this.currentVideoSlider.keyHandler); //TODO таким же (или иным) образом удалять события тача
    let rightButtonClone = this.rightButton.cloneNode(true);
    let leftButtonClone = this.leftButton.cloneNode(true);
    this.rightButton.parentNode.replaceChild(rightButtonClone, this.rightButton);
    this.leftButton.parentNode.replaceChild(leftButtonClone, this.leftButton);
    this.rightButton = document.querySelector(".video-galery__area-right");
    this.leftButton = document.querySelector(".video-galery__area-left");
  }
}