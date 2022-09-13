import { tdSensibility, tdSensibilityTouch, tdTotalAmount } from "./3D_Manager";
import FullSizeViewer from "./FullSizeViewer";

export class ThreeDViewerMouse {
    location: any;
    folder: any;
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
    constructor(location, folder) { // For 3D!
        this.location = location;
        this.folder = folder;
        this.currentPhoto = this.location.querySelector('img')
        this.startPhoto = 1;
        this.lastPhoto = tdTotalAmount[folder];
        this.photoNumber = Math.floor(this.lastPhoto / 2);
        this.magicNumber = 0;
        this.speed = tdSensibility[folder];
        console.log('speed', this.speed)
        this.xStart = null;
        this.xStart = null;
        this.isMouseUp = true;
        this.isMouseDown = false;
        this.step = 10; // !FOR 3D PHOTO
        this.addListeners();
    }
    addListeners() {
        console.log(this.location)
        this.location.querySelector('.threeD__svg-zoom').addEventListener('click', (e) => { const a = new FullSizeViewer(this.photoNumber, this.folder) })
        this.location.addEventListener('mouseup', this.handleTouchStart.bind(this));
        this.location.addEventListener('mousemove', this.handleTouchMove.bind(this));
        this.location.addEventListener('mousedown', this.handleMouseDown.bind(this));
    }
    handleMouseDown(e) {
        this.isMouseDown = true;
        this.xStart = e.offsetX;
        this.yStart = e.offsetY;
    }

    handleTouchStart(e) {
        this.isMouseDown = false;
    };

    correctBugs(e) {
        const locationWidth = e.target.offsetWidth;
        const locationHeight = e.target.offsetHeight
        const colision = 10
        if ((e.offsetX < colision) || (e.offsetX > locationWidth - colision) || (e.offsetY < colision) || (e.offsetY > (locationHeight - colision))) {
            console.log('Bug!')
            this.isMouseDown = !this.isMouseDown;
        }

    }

    handleTouchMove(e) {
        if (!this.isMouseDown) { return }
        let xMove = e.offsetX;
        this.correctBugs(e)
        // console.log(xMove)
        if (this.xStart || 0 > (xMove + this.step)) { // !FOR 3D photo!
            this.photoNumber <= this.startPhoto + this.speed ? this.photoNumber = this.lastPhoto : this.photoNumber -= this.speed;
            this.currentPhoto.src = `../assets/3D-webp/${this.folder}-${this.photoNumber}.webp`
            this.xStart = xMove

        }
        if ((this.xStart || 0 + this.step) < xMove) { // !FOR 3D photo!
            this.photoNumber >= this.lastPhoto - this.speed ? this.photoNumber = this.startPhoto : this.photoNumber += this.speed;
            this.currentPhoto.src = `../assets/3D-webp/${this.folder}-${this.photoNumber}.webp`
            this.xStart = xMove
        }
    };
}

export class ThreeDViewerTouch extends ThreeDViewerMouse {
    constructor(location, folder) {
        // debugger
        super(location, folder)
        this.location = location;
        this.folder = folder;
        this.init()
        this.test()
        this.step = 0;
        this.speed = tdSensibilityTouch[folder];
    }
    test() {
        console.log('---')
        // console.log(super.photoNumber)
        console.log(this)
    }
    init() {
        this.location.addEventListener('touchstart', this.handleTouchStart.bind(this), false);
        this.location.addEventListener('touchmove', this.handleTouchMove.bind(this), false);
    }
    handleTouchStart(e) {
        if (!(e?.touches?.[0]?.clientX)) return// correct bug
        this.xStart = e.touches[0].clientX;
        this.yStart = e.touches[0].clientY;
    };
    handleTouchMove(e) {
        if (!(e?.touches?.[0]?.clientX)) return // correct bug
        let xMove = e.touches[0].clientX;
        if (this.xStart || 0 > (xMove + this.step)) { // !FOR 3D photo!       
            this.photoNumber <= this.startPhoto ? this.photoNumber = this.lastPhoto : this.photoNumber -= this.speed;
            this.currentPhoto.src = `../assets/3D-webp/${this.folder}-${this.photoNumber}.webp`
            this.xStart = xMove
        }
        if ((this.xStart || 0 + this.step) < xMove) { // !FOR 3D-webp photo!
            this.photoNumber >= this.lastPhoto ? this.photoNumber = 1 : this.photoNumber += this.speed;
            this.currentPhoto.src = `../assets/3D-webp/${this.folder}-${this.photoNumber}.webp`
            this.xStart = xMove
        }
    };
}