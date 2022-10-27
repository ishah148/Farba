import { VideoSlider } from './video_slider';
import { videoGaleryConfig } from './configs/video-configs';



export class VideoGaleryPagination {
  constructor() {
    this.promoButton = document.querySelector('.video-galery__promo-section-button');
    this.reviewsButton = document.querySelector('.video-galery__reviews-section-button');
    this.slideContainer = document.querySelector('.video-galery__container');
    this.rightButton = document.querySelector(".video-galery__area-right");
    this.leftButton = document.querySelector(".video-galery__area-left");
    this.currentVideoSlider = null;
    this.storedPromotionalPosition = 0;
    this.storedReviewsPosition = 0;
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
      this.removeEventHandlers();
      this.slideContainer.classList.add('video-galery__container-transition-transparent');

      if (targetLink.classList.contains('video-galery__promo-section-button')) {
        this.storedReviewsPosition = this.currentVideoSlider.currentPos;
        delete this.currentVideoSlider;
        this.slideContainer.classList.add('video-galery__container-transition');
        setTimeout(() => {
          this.slideContainer.replaceChildren();
          this.slideContainer.classList.remove('video-galery__container-transition');
          this.currentVideoSlider = new VideoSlider('promotional', this.storedPromotionalPosition, videoGaleryConfig.promotional);
        }, 400)
        this.promoButton.classList.add('video-galery__active-section');
        this.reviewsButton.classList.remove('video-galery__active-section');
      }

      if (targetLink.classList.contains('video-galery__reviews-section-button')) {
        this.storedPromotionalPosition = this.currentVideoSlider.currentPos;
        delete this.currentVideoSlider;
        this.slideContainer.classList.add('video-galery__container-transition');
        setTimeout(() => {
          this.slideContainer.replaceChildren();
          this.slideContainer.classList.remove('video-galery__container-transition');
          this.currentVideoSlider = new VideoSlider('productReviews', this.storedReviewsPosition, videoGaleryConfig.productReviews);
        }, 400)
        this.reviewsButton.classList.add('video-galery__active-section');
        this.promoButton.classList.remove('video-galery__active-section');
      }
    }
  }

  removeEventHandlers() {
    if(this.currentVideoSlider.keyHandler) {
      document.removeEventListener('keyup', this.currentVideoSlider.keyHandler); //TODO таким же (или иным) образом удалять события тача
    }
    let rightButtonClone = this.rightButton.cloneNode(true);
    let leftButtonClone = this.leftButton.cloneNode(true);
    this.rightButton.parentNode.replaceChild(rightButtonClone, this.rightButton);
    this.leftButton.parentNode.replaceChild(leftButtonClone, this.leftButton);
    this.rightButton = document.querySelector(".video-galery__area-right");
    this.leftButton = document.querySelector(".video-galery__area-left");
  }
}