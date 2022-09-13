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
            <div class="spinner show">
                <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
                <p class="spinner__persent"></p>
            </div>
            <img src='../assets/3D/${this.folder}-${this.photoNumber}.webp' alt = ''>
        </div>
        `;
        // const a = new ThreeDViewerMouse(this.wrapper,'lg')
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

    hiddenExtraButtons() {
        this.wrapper.querySelector('.modal-window__left-button').style.display = 'none';
        this.wrapper.querySelector('.modal-window__right-button').style.display = 'none';
    }
    showExtraButtons() {
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

export default FullSizeViewer;