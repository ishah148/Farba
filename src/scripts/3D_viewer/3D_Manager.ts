// @ts-nocheck  //! delete
// import "./FullSizeViewer.js";
import { tdSensibility, tdSensibilityTouch, tdTotalAmount } from "./configs";
import { ThreeDViewerMouse, ThreeDViewerTouch } from "./TouchMouseHandlers";

export class ThreeDManager {
  container: any;
  preparedList: any[];
  countOfLoadedPhotos: {
    canon: number;
    gillette: number;
    babycar: number;
    lg: number;
  };
  constructor() {
    this.container = document.querySelector(".threeD__container");
    this.init();
    // this.countOfLoadedPhotos = 1;
    this.preparedList = [];
    this.countOfLoadedPhotos = {
      canon: 0,
      gillette: 0,
      babycar: 0,
      lg: 0,
    };
  }
  init() {
    this.addListeners();
    console.time();
  }
  addListeners() {
    this.container.addEventListener("click", (e: Event) =>
      this.prepareThreeDViewer(e)
    );
    this.container?.addEventListener("click", (e: Event) => {
      console.log("", e);
      const target = e.target as HTMLElement;
      const parent = (e.target as HTMLElement).parentElement;
    //   if (target.classList.contains("threeD__svg-zoom"))
        
      // (e.target as HTMLElement).parentElement?.classList.add('full-size')
    });
  }

  prepareThreeDViewer(e: Event) {
    const folderTarget = (e.target as HTMLElement).dataset.folder;
    const target = e.target as HTMLElement;
    if (!this.preparedList.includes(folderTarget) && folderTarget) {
      this.showSpinner(e.target);
      this.dowloadPhotos(target, folderTarget);
    }
    if (folderTarget) {
      this.preparedList.push(target.dataset.folder);
    }
  }

  startThreeDHandler(folderTarget, folder) {
    if (this.isTouchDevice()) {
      const handler = new ThreeDViewerTouch(folderTarget, folder);
    } else {
      const handler = new ThreeDViewerMouse(folderTarget, folder);
    }
    this.hiddenSpinner(folderTarget);
  }

  dowloadPhotos(target, folder) {
    for (let i = 1; i < tdTotalAmount[folder] + 1; i++) {
      const img = new Image();
      img.src = `./assets/3D-webp/${folder}-${i}.webp`;
      img.onload = () => {
        this.checkCountDownloadedPhotos(target, folder);
      };
    }
  }

  checkCountDownloadedPhotos(target, folder) {
    let persent = Math.ceil((this.countOfLoadedPhotos[folder] / 85) * 100);
    target.querySelector(".spinner__persent").textContent = ` ${persent}%`;
    this.countOfLoadedPhotos[folder]++;

    if (this.countOfLoadedPhotos[folder] === tdTotalAmount[folder]) {
      this.countOfLoadedPhotos[folder] = 0;
      this.startThreeDHandler(target, folder);
      this.prepareFullSize(target as HTMLElement);
    }
  }
  // styles
  showSpinner(target) {
    target.querySelector(".spinner").classList.toggle("show");
    target.querySelector(".threeD__svg-container").classList.toggle("hidden");
  }
  hiddenSpinner(target) {
    target.classList.add("show");
    target.querySelector(".spinner").classList.remove("show");
    target.querySelector(".threeD__svg-container").classList.add("hidden");
  }

  prepareFullSize(target: HTMLElement) {
    // this.showSpinner(target)
    const folder = target.dataset.folder;
    if (folder) {
      for (let i = 1; i < tdTotalAmount[folder] + 1; i++) {
        const img = new Image();
        img.src = `./assets/3D/${folder}-${i}.webp`;
      }
    }
  }

  isTouchDevice() {
    try {
      document.createEvent("TouchEvent");
      return true;
    } catch (e) {
      return false;
    }
  }
}

export default ThreeDManager;
