import {
  tdSensibility,
  tdSensibilityTouch,
  tdTotalAmount,
  tdSensibilityStep,
  tdSensibilityTouchStep,
} from "./configs";
import FullSizeViewer from "./FullSizeViewer";

export class ThreeDViewerMouse {
  location: HTMLElement;
  folder: string;
  currentPhoto: any;
  startPhoto: number;
  lastPhoto: any;
  photoNumber: number;
  magicNumber: number;
  speed: any;
  xStart: null;
  isMouseUp: boolean;
  isMouseDown: boolean;
  step: number;
  yStart: any;
  tdSensibilityStep: any;
  isFullScreen: boolean;
  isRotate: boolean;
  constructor(location: HTMLElement, folder: string) {
    // For 3D!
    this.location = location;
    this.folder = folder;
    this.currentPhoto = this.location.querySelector("img");
    this.startPhoto = 1;
    this.lastPhoto = tdTotalAmount[folder];
    this.photoNumber = Math.floor(this.lastPhoto / 2);
    this.magicNumber = 0;
    this.speed = tdSensibility[folder];
    this.isFullScreen = false
    this.xStart = null;
    this.xStart = null;
    this.isMouseUp = true;
    this.isMouseDown = false;
    this.step = tdSensibilityStep[folder]; // !FOR 3D PHOTO
    this.isRotate = true
    this.addListeners();
    this.autoRotate();
    console.log("viewerThis", this);
  }
  addListeners() {
    if(this.location){
        this.location.querySelector(".threeD__svg-zoom")?.addEventListener("click", (e) => {
        this.location.classList.toggle('full-size')
        this.isFullScreen = !this.isFullScreen
        });
    }
    this.location.addEventListener("mouseup", this.handleTouchStart.bind(this));
    this.location.addEventListener(
      "mousemove",
      this.handleTouchMove.bind(this)
    );
    this.location.addEventListener(
      "mousedown",
      this.handleMouseDown.bind(this)
    );
  }
  handleMouseDown(e) {
    this.isMouseDown = true;
    this.xStart = e.offsetX;
    this.yStart = e.offsetY;
  }

  handleTouchStart(e) {
    this.isMouseDown = false;
  }

  correctBugs(e) {
    const locationWidth = e.target.offsetWidth;
    const locationHeight = e.target.offsetHeight;
    const colision = 10;
    if (
      e.offsetX < colision ||
      e.offsetX > locationWidth - colision ||
      e.offsetY < colision ||
      e.offsetY > locationHeight - colision
    ) {
      console.log("Bug!");
      this.isMouseDown = !this.isMouseDown;
    }
  }

  handleTouchMove(e) {
    if (!this.isMouseDown) {
      return;
    }
    let xMove = e.offsetX;
    this.correctBugs(e);
    // 
    if ((this.xStart || 0) > xMove + this.step) {
      // !FOR 3D photo!
      
      this.photoNumber <= this.startPhoto + this.speed
        ? (this.photoNumber = this.lastPhoto)
        : (this.photoNumber -= this.speed);
      this.currentPhoto.src = `../assets/3D${this.isFullScreen?'':'-webp'}/${this.folder}-${this.photoNumber}.webp`;
      this.xStart = xMove;
    }
    if ((this.xStart || 0) + this.step < xMove) {
      // !FOR 3D photo!
      
      this.photoNumber >= this.lastPhoto - this.speed
        ? (this.photoNumber = this.startPhoto)
        : (this.photoNumber += this.speed);
      this.currentPhoto.src = `../assets/3D${this.isFullScreen?'':'-webp'}/${this.folder}-${+(this.photoNumber.toFixed())}.webp`;
      this.xStart = xMove;
    }
  }

  autoRotate() {
    const a = this;
    animate();
    function update() {
      a.photoNumber >= a.lastPhoto
        ? (a.photoNumber = 1)
        : (a.photoNumber += 0.2);
      a.photoNumber = +a.photoNumber.toFixed(2);
      // 
      if (Number.isInteger(+a.photoNumber.toFixed(2))) {
        a.currentPhoto.src = `../assets/3D-webp/${a.folder}-${a.photoNumber}.webp`;
      }
      // 
    }

    function animate() {
      requestAnimationFrame(animate);
      update();
    }
  }
}

export class ThreeDViewerTouch extends ThreeDViewerMouse {
  constructor(location: HTMLElement, folder: string) {
    // debugger
    super(location, folder);
    this.location = location;
    this.folder = folder;
    this.init();
    this.step = tdSensibilityTouchStep[folder];
    this.speed = tdSensibilityTouch[folder];
    // this.autoRotate();
  }

  init() {
    this.location.addEventListener(
      "touchstart",
      this.handleTouchStart.bind(this),
      false
    );
    this.location.addEventListener(
      "touchmove",
      this.handleTouchMove.bind(this),
      false
    );
  }
  handleTouchStart(e) {
    if (!e?.touches?.[0]?.clientX) return; // correct bug
    this.xStart = e.touches[0].clientX;
    this.yStart = e.touches[0].clientY;
  }
  handleTouchMove(e) {
    if (!e?.touches?.[0]?.clientX) return; // correct bug
    let xMove = e.touches[0].clientX;
    if ((this.xStart || 0) > xMove + this.step) {
      // !FOR 3D photo!
      
      this.photoNumber <= this.startPhoto
        ? (this.photoNumber = this.lastPhoto)
        : (this.photoNumber -= this.speed);
      this.currentPhoto.src = `../assets/3D${this.isFullScreen?'':'-webp'}/${this.folder}-${this.photoNumber}.webp`;
      this.xStart = xMove;
    }
    if ((this.xStart || 0) + this.step < xMove) {
      // !FOR 3D-webp photo!
      
      this.photoNumber >= this.lastPhoto
        ? (this.photoNumber = 1)
        : (this.photoNumber += this.speed);
      this.currentPhoto.src = `../assets/3D${this.isFullScreen?'':'-webp'}/${this.folder}-${this.photoNumber}.webp`;
      this.xStart = xMove;
    }
  }
}
