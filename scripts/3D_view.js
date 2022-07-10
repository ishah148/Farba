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
        this.location = location;
        this.folder = folder;
        this.currentPhoto = this.location.querySelector('img')
        this.startPhoto = 1;
        this.lastPhoto = 85;
        this.photoNumber = 43;
        this.magicNumber = 0;
        this.speed = 4;
        this.xStart = null;
        this.yStart = null;
        this.isMouseUp = true;
        this.isMouseDown = false;
        this.step = 0; // !FOR 3D PHOTO
        this.addListeners()
    }
    addListeners() {
        console.log(this.location)
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
        if (this.xStart > (xMove + this.step)) { // !FOR 3D photo!
            this.photoNumber <= this.startPhoto ? this.photoNumber = this.lastPhoto : this.photoNumber -= this.speed;
            this.currentPhoto.src = `../assets/3D/${this.folder}-${this.photoNumber}.webp`
            this.xStart = xMove

        }
        if ((this.xStart + this.step) < xMove) { // !FOR 3D photo!
            this.photoNumber >= this.lastPhoto ? this.photoNumber = this.startPhoto : this.photoNumber += this.speed;
            this.currentPhoto.src = `../assets/3D/${this.folder}-${this.photoNumber}.webp`
            this.xStart = xMove
        }
    };
}


class ThreeDViewer {
    constructor() {
        this.container = document.querySelector('.threeD__container')
        this.init()
        this.countOfLoadedPhotos = 1;
        this.preparedList = []
    }
    init() {
        this.addListeners();
        console.time();
    }
    addListeners() {
        this.container.addEventListener('click', (e) => this.prepareThreeDViewer(e))
    }

    prepareThreeDViewer(e) {
        const folderTarget = e.target.dataset.folder;
        const target = e.target
        if (!this.preparedList.includes(folderTarget)) {
            this.showSpinner(e.target);
            // this.dowloadPhotos(target, folderTarget); //! must be HERE /
            // TODO return this <-------------------------------------------
        }
        this.dowloadPhotos(target, folderTarget);
        this.preparedList.push(e.target.dataset.folder)
    }

    startThreeDHandler(folderTarget, folder) {
        const handler = new ThreeDViewerMouse(folderTarget, folder)
        // const handler = new ThreeDViewerTouch(folderTarget, folder)
        this.hiddenSpinner(folderTarget)
    }

    dowloadPhotos(folderTarget, folder) {
        for (let i = 1; i < 86; i++) {
            const img = new Image()
            img.src = `../assets/3D/${folder}-${i}.webp`
            img.onload = () => {
                this.checkCountDownloadedPhotos(folderTarget, folder)
            }
        }
    }

    checkCountDownloadedPhotos(folderTarget, folder) {
        this.countOfLoadedPhotos++
        if (this.countOfLoadedPhotos === 85) {
            this.countOfLoadedPhotos = 0;
            this.startThreeDHandler(folderTarget, folder)
        }
    }
    // styles
    showSpinner(target) {
        target.querySelector('.spinner').classList.toggle('show');
        target.querySelector('.threeD__svg-container').classList.toggle('hidden');
    }
    hiddenSpinner(target) {
        target.classList.add('show')
        target.querySelector('.spinner').classList.remove('show');
        target.querySelector('.threeD__svg-container').classList.add('hidden');
    }
}


b = new ThreeDViewer()


class ThreeDViewerTouch extends ThreeDViewerMouse {
    constructor(location, folder) {
        // debugger
        super(location, folder)
        this.location = location;
        this.folder = folder;
        this.init()
        this.test()
        this.step = 0;
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
        this.xStart = e.touches[0].clientX;
        this.yStart = e.touches[0].clientY;
    };
    handleTouchMove(e) {
        let xMove = e.touches[0].clientX;
        if (this.xStart > (xMove + this.step)) { // !FOR 3D photo!       
            this.photoNumber <= this.startPhoto ? this.photoNumber = this.lastPhoto : this.photoNumber -= this.speed;
            this.currentPhoto.src = `../assets/3D/canon-${this.photoNumber}.webp`
            this.xStart = xMove
        }
        if ((this.xStart + this.step) < xMove) { // !FOR 3D photo!
            this.photoNumber >= this.lastPhoto ? this.photoNumber = 1 : this.photoNumber += this.speed;
            this.currentPhoto.src = `../assets/3D/canon-${this.photoNumber}.webp`
            this.xStart = xMove
        }
    };
}

// c = new ThreeDViewerTouch()
// console.log(c)