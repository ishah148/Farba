const el = {
    wrapper: document.querySelector('.td-wrapper'),
    isMouseUp: true,
    isMouseDown: false,
    direction: '',
    step: 15,
    lastX: -2,
    lastY: -2,
}

// document.addEventListener('drag',(e)=>{
//     console.log(e)
// })
// oldMouseHandle()

function oldMouseHandle() {
    document.addEventListener('onmousedown', (e) => {
        console.log(e)

    })
    el.wrapper.addEventListener('onmouseup', (e) => {
        // console.log(e)
    })
    el.wrapper.addEventListener('onmouseup', (e) => {
        // console.log(e)
    })

    el.wrapper.onmousedown = function (e) {
        el.isMouseDown = !el.isMouseDown;
    }
    el.wrapper.onmouseup = function (e) {
        el.isMouseDown = !el.isMouseDown;
        el.lastY = -2;
        el.lastX = -2;
        console.log('UPPED')
    }

    el.wrapper.onmousemove = function (e) {
        if (el.isMouseDown) {
            if (el.lastX === -2 || el.lastY === -2) {
                e.offsetX = el.lastX
                e.offsetX = el.lastY
            }
            if (el.lastX < e.offsetX) {
                console.log('right')
            }

            if (el.lastX > (e.offsetX)) {
                console.log('left')
            }
            console.log(e.offsetX)
            // console.log(e);
            // console.group()
            // console.log(e.offsetX)
            // console.log(e.offsetY)
            // console.groupEnd()
            el.lastX = e.offsetX
            el.lastY = e.offsetX
        }
        if (e.offsetX === -1 || e.offsetY === -1) {
            el.wrapper.dispatchEvent(new Event('mouseup'))
            console.log('UP!')
        }
    }


    document.addEventListener('onmousedown', (e) => {
        console.log(e)

    })
    el.wrapper.addEventListener('onmouseup', (e) => {
        // console.log(e)
    })
    el.wrapper.addEventListener('onmouseup', (e) => {
        // console.log(e)
    })

    el.wrapper.onmousedown = function (e) {
        el.isMouseDown = !el.isMouseDown;
    }
    el.wrapper.onmouseup = function (e) {
        el.isMouseDown = !el.isMouseDown;
        el.lastY = -2;
        el.lastX = -2;
        console.log('UPPED')
    }

    el.wrapper.ontouchmove = function (e) {
        if (el.isMouseDown) {
            if (el.lastX === -2 || el.lastY === -2) {
                e.offsetX = el.lastX
                e.offsetX = el.lastY
            }
            if (el.lastX < e.offsetX) {
                console.log('right')
            }

            if (el.lastX > e.offsetX) {
                console.log('left')
            }
            // console.log(e);
            // console.group()
            // console.log(e.offsetX)
            // console.log(e.offsetY)
            // console.groupEnd()
            el.lastX = e.offsetX
            el.lastY = e.offsetX
        }
        if (e.offsetX === -1 || e.offsetY === -1) {
            el.wrapper.dispatchEvent(new Event('mouseup'))
            console.log('UP!')
        }
    }
}
function isTouchDevice() {
    try {
        document.createEvent("TouchEvent");
        return true;
    } catch (e) {
        return false;
    }
}
function touchHandle() {
    document.addEventListener('touchstart', handleTouchStart, false);
    document.addEventListener('touchmove', handleTouchMove, false);

    let xStart = null;
    let yStart = null;
    // let step = 15; // !FOR 3D PHOTO
    function handleTouchStart(e) {
        xStart = e.touches[0].clientX;
        yStart = e.touches[0].clientY;

    };

    function handleTouchMove(e) {
        xMove = e.touches[0].clientX;
        yMove = e.touches[0].clientY;
        function left() {
            return xStart > (xMove + 70)
        }
        function right() {
            return (xStart + 70) < xMove
        }
        function down() {
            return (yStart + 70) < yMove
        }
        function up() {
            return yStart > (yMove + 70)
        }
        if (left()) {
            console.log('left')
        }
        // if(xStart > (xMove + step)){ // !FOR 3D photo!
        //     console.log(1)
        //     xStart = xMove
        // }
        if (right()) {
            console.log('right')
        }
        if (down() && !left() && !right()) {
            console.log('DOWN')
        }
        if (up() && !left() && !right()) {
            console.log('UP')
        }
    };
}
touchHandle()


function mouseHandle() { // For 3D!
    document.addEventListener('mouseup', handleTouchStart);
    document.addEventListener('mousemove', handleTouchMove);
    document.addEventListener('mousedown', handleMouseDown);
    let photoNumber = 43;
    const magicNumber = 0;
    let xStart = null;
    let yStart = null;
    let isMouseUp = true;
    let isMouseDown = false;
    let step = 1; // !FOR 3D PHOTO
    console.log('here')
    function handleMouseDown(e) {
        isMouseDown = !isMouseDown;
        xStart = e.offsetX;
        yStart = e.offsetY;
        console.log("DOWN")
    }

    function handleTouchStart(e) {
        isMouseDown = !isMouseDown;
        console.log('UPPED')
    };

    function handleTouchMove(e) {
        if (!isMouseDown) { return }
        xMove = e.offsetX;
        yMove = e.offsetY;
        if (xStart > (xMove + step)) { // !FOR 3D photo!
            console.log('-')
            photoNumber === 1 ? photoNumber = 85 : photoNumber--;
            document.getElementById('img').src = `../assets/3D/canon-${photoNumber}.webp`
            xStart = xMove
        }
        if ((xStart + step) < xMove) { // !FOR 3D photo!
            console.log('+')
            photoNumber === 85 ? photoNumber = 1 : photoNumber++;
            document.getElementById('img').src = `../assets/3D/canon-${photoNumber}.webp`
            xStart = xMove
        }
        // setInterval(() => {
        //     photoNumber === 85 ? photoNumber = 1 : photoNumber++;
        //     document.getElementById('img').src = `../assets/3D/canon-${photoNumber}.webp`
        // }, 250);
    };
}
mouseHandle()






