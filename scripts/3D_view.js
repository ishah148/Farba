class FullSizeViewer {
    constructor(photoNumber, folder) {
        this.photoNumber = photoNumber;
        this.folder = folder;
        this.wrapper = document.querySelector(".modal-window__wrapper");
        this.createModalWindow()
        this.addEvents()
        this.touchHandle()
    }

    addEvents() {
        const closeButton = document.querySelector(".modal-window__close-button");
        // closeButton.onclick = this.closeModalWindow.bind(this);
        closeButton.onclick = () => this.closeModalWindow();
    }
    createModalWindow(src) {
        const modalWindowHTML = `
        <div class="modal-window__container current--slide">
            <img src='../assets/3D/${this.folder}-${this.photoNumber}.webp' alt = ''>
        </div>
        `;
        this.wrapper.insertAdjacentHTML("beforeend", modalWindowHTML);
        this.hiddenExtraButtons()
        this.wrapper.classList.add("visible");
        document.querySelector('body').classList.add('stop-scrolling');
    }
    closeModalWindow() {
        this.showExtraButtons()
        document.querySelector(".modal-window__wrapper").classList.remove("visible");
        document
            .querySelectorAll(".modal-window__container")
            .forEach((i) => i.remove());
        document.querySelector('body').classList.remove("stop-scrolling");
    }

    hiddenExtraButtons(){
        this.wrapper.querySelector('.modal-window__left-button').style.display = 'none';
        this.wrapper.querySelector('.modal-window__right-button').style.display = 'none';
    }
    showExtraButtons(){
        this.wrapper.querySelector('.modal-window__left-button').style.display = '';
        this.wrapper.querySelector('.modal-window__right-button').style.display = '';
    }
    touchHandle() {
        const wrapper = this.wrapper
        wrapper.addEventListener('touchstart', handleTouchStart.bind(this), false);
        wrapper.addEventListener('touchmove', handleTouchMove.bind(this), false);
        let xStart = null;
        let yStart = null;
        let sensitivity = 100;
        function handleTouchStart(e) {
            xStart = e.touches[0].clientX;
            yStart = e.touches[0].clientY;
        };

        function handleTouchMove(e) {
            let xMove = e.touches[0].clientX;
            let yMove = e.touches[0].clientY;
            function left() {
                return xStart > (xMove + sensitivity)
            }
            function right() {
                return (xStart + sensitivity) < xMove
            }
            function down() {
                return (yStart + sensitivity) < yMove
            }
            function up() {
                return yStart > (yMove + sensitivity)
            }
            const removeEvents = () => {
                wrapper.replaceWith(wrapper.cloneNode(true));
            }

            if (down() && !left() && !right()) {
                document.querySelector('.current--slide').classList.add('up');
                document.querySelector('.current--slide').addEventListener('transitionend', () => {
                    this.closeModalWindow();
                    removeEvents();
                })

            }
            if (up() && !left() && !right()) {
                document.querySelector('.current--slide').classList.add('down');
                document.querySelector('.current--slide').addEventListener('transitionend', () => {
                    this.closeModalWindow();
                    removeEvents();
                })
            }
        };
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
        if (this.xStart > (xMove + this.step)) { // !FOR 3D photo!
            this.photoNumber <= this.startPhoto + this.speed ? this.photoNumber = this.lastPhoto : this.photoNumber -= this.speed;
            this.currentPhoto.src = `../assets/3D/${this.folder}-${this.photoNumber}.webp`
            this.xStart = xMove

        }
        if ((this.xStart + this.step) < xMove) { // !FOR 3D photo!
            this.photoNumber >= this.lastPhoto - this.speed ? this.photoNumber = this.startPhoto : this.photoNumber += this.speed;
            this.currentPhoto.src = `../assets/3D/${this.folder}-${this.photoNumber}.webp`
            this.xStart = xMove
        }
    };
}


export class ThreeDViewer {
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
        if (!this.preparedList.includes(folderTarget) && folderTarget) {
            this.showSpinner(e.target);
            this.dowloadPhotos(target, folderTarget); //! must be HERE /
            // TODO return this <-------------------------------------------
        }
        // this.dowloadPhotos(target, folderTarget);
        if (folderTarget) {
            this.preparedList.push(e.target.dataset.folder)
        }
    }

    startThreeDHandler(folderTarget, folder) {
        if (this.isTouchDevice()) {
            const handler = new ThreeDViewerTouch(folderTarget, folder)
        } else {
            const handler = new ThreeDViewerMouse(folderTarget, folder)
        }
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
        let persent = Math.ceil(this.countOfLoadedPhotos / 85 * 100)
        folderTarget.querySelector('.spinner__persent').textContent = ` ${persent}%`;
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
    isTouchDevice() {
        try {
            document.createEvent("TouchEvent");
            return true;
        } catch (e) {
            return false;
        }
    }
}

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
        if (!(e?.touches?.[0]?.clientX)) return// correct bug
        this.xStart = e.touches[0].clientX;
        this.yStart = e.touches[0].clientY;
    };
    handleTouchMove(e) {
        if (!(e?.touches?.[0]?.clientX)) return // correct bug
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

// b = new ThreeDViewer()




// c = new ThreeDViewerTouch()
// console.log(c)