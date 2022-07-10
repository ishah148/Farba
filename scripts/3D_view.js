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

 class ThreeDViewerMouse{
    constructor(location) { // For 3D!
        this.location = document.getElementById(location);
        this.startPhoto = 1;
        this.lastPhoto = 55;
        this.photoNumber = 43;
        this.magicNumber = 0;
        this.xStart = null;
        this.yStart = null;
        this.isMouseUp = true;
        this.isMouseDown = false;
        this.step = 1; // !FOR 3D PHOTO
        console.log('here')
        this.addListeners()
    }
    addListeners() {
        location.addEventListener('mouseup', this.handleTouchStart.bind(this));
        location.addEventListener('mousemove', this.handleTouchMove.bind(this));
        location.addEventListener('mousedown', this.handleMouseDown.bind(this));
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
        if (xStart > (xMove + step)) { // !FOR 3D photo!
            console.log('-')
            this.photoNumber === this.startPhoto ? this.photoNumber = this.lastPhoto : this.photoNumber--;
            document.getElementById(this.location).src = `../assets/3D/canon-${photoNumber}.webp`
            xStart = xMove
        }
        if ((xStart + step) < xMove) { // !FOR 3D photo!
            console.log('+')
            this.photoNumber === this.lastPhoto ? this.photoNumber = this.startPhoto : this.photoNumber++;
            document.getElementById(this.location).src = `../assets/3D/canon-${this.photoNumber}.webp`
            this.xStart = xMove
        }
        // setInterval(() => {
        //     photoNumber === lastPhoto ? photoNumber = startPhoto : photoNumber++;
        //     console.log(photoNumber)
        //     document.getElementById('img').src = `../assets/3D/canon-${photoNumber}.webp`
        // }, 200);
    };
}





 class ThreeDViewer{
    constructor(){
        this.init()
    }
    init(){
        new ThreeDViewerMouse('threeD__one')
    }

}

class ThreeDViewerEvents extends ThreeDViewer{
    constructor(){
        super()
        this.init()
    }
    init(){
        console.log(super.startPhoto)
    }
}