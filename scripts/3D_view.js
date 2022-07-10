class FullSizeViewer {
    constructor() {
        this.wrapper = document.querySelector(".modal-window__wrapper");
        this.createModalWindow()
        this.addEvents()
    }

    addEvents() {
        const closeButton = document.querySelector(".modal-window__close-button");
        closeButton.onclick = this.closeModalWindow;
    }
    createModalWindow(src) {
        const modalWindowHTML = `
        <div class="modal-window__container current--slide">
            <img src='../assets/3D/canon-${22}.webp' alt = ''>
        </div>
        `;
        this.wrapper.insertAdjacentHTML("beforeend", modalWindowHTML);
        this.wrapper.classList.add("visible");
        document.querySelector('body').classList.add('stop-scrolling');
    }
    closeModalWindow() {

        document.querySelector(".modal-window__wrapper").classList.remove("visible");
        document
            .querySelectorAll(".modal-window__container")
            .forEach((i) => i.remove());
        document.querySelector('body').classList.remove("stop-scrolling");

    }

}

class ThreeDViewerMouse {
    constructor(location, folder) { // For 3D!
        this.location = document.getElementById(location);
        this.currentPhoto = this.location.querySelector('img')
        this.startPhoto = 1;
        this.lastPhoto = 85;
        this.photoNumber = 43;
        this.magicNumber = 0;
        this.xStart = null;
        this.yStart = null;
        this.isMouseUp = true;
        this.isMouseDown = false;
        this.step = 1; // !FOR 3D PHOTO
        this.addListeners()
    }
    addListeners() {
        console.log(this.location)
        this.location.addEventListener('mouseup', this.handleTouchStart.bind(this));
        this.location.addEventListener('mousemove', this.handleTouchMove.bind(this));
        this.location.addEventListener('mousedown', this.handleMouseDown.bind(this));
    }
    handleMouseDown(e) {
        this.isMouseDown = !this.isMouseDown;
        this.xStart = e.offsetX;
        this.yStart = e.offsetY;
        console.log("DOWN")
    }

    handleTouchStart(e) {
        this.isMouseDown = !this.isMouseDown;
        console.log('UPPED')
    };

    handleTouchMove(e) {
        if (!this.isMouseDown) { return }
        let xMove = e.offsetX;
        if (this.xStart > (xMove + this.step)) { // !FOR 3D photo!
            console.log('-')
            this.photoNumber === this.startPhoto ? this.photoNumber = this.lastPhoto : this.photoNumber--;
            this.currentPhoto.src = `../assets/3D/canon-${this.photoNumber}.webp`
            this.xStart = xMove
        }
        if ((this.xStart + this.step) < xMove) { // !FOR 3D photo!
            console.log('+')
            this.photoNumber === this.lastPhoto ? this.photoNumber = this.startPhoto : this.photoNumber++;
            this.currentPhoto.src = `../assets/3D/canon-${this.photoNumber}.webp`
            this.xStart = xMove
        }
        // setInterval(() => {
        //     photoNumber === lastPhoto ? photoNumber = startPhoto : photoNumber++;
        //     console.log(photoNumber)
        //     document.getElementById('img').src = `../assets/3D/canon-${photoNumber}.webp`
        // }, 200);
    };
}


// a = new ThreeDViewerMouse('threeD__one')


class ThreeDViewer {
    constructor() {
        this.container = document.querySelector('.threeD__container')
        this.init()
        this.countOfLoadedPhotos = 1;
    }
    init() {
        // new ThreeDViewerMouse('threeD__one')
        // this.dowloadPhotos()
        this.addListeners();
        console.time();
    }
    addListeners() {
        this.container.addEventListener('click', (e) => this.openThreeDViewer(e))
    }
    openThreeDViewer(e){
        console.log(e.target.dataset.folder)
        this.toggleSpinner(e.target)
    }
    dowloadPhotos(folder) {
        for (let i = 1; i < 86; i++) {
            const img = new Image()
            img.src = `../assets/3D/${folder}-${i}.webp`
            img.onload = () => {
                this.checkCountDownloadedPhotos()
            }
        }
    }

    checkCountDownloadedPhotos() {
        this.countOfLoadedPhotos++
        if (this.countOfLoadedPhotos === 85) {
            console.log('done!')
            console.timeEnd()
        }
    }
    toggleSpinner(target){
        console.log(target)
        console.log(target.classList.contains('threeD__content'))
        console.log(target.querySelector('.spinner'))
        console.log(target.querySelector('.spinner').classList)
        target.querySelector('.spinner').classList.toggle('show');
        target.querySelector('.threeD__svg-container').classList.toggle('show');
        target.classList.toggle('show')
        // target.classList.toggle('show')
        debugger
    }
}

class ThreeDViewerEvents extends ThreeDViewer {
    constructor() {
        super()
        this.init()
    }
    init() {
        console.log(super.startPhoto)
    }
}

b = new ThreeDViewer()