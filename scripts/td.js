const el = {
    wrapper: document.querySelector('.td-wrapper'),
    isMouseUp: true,
    isMouseDown: false,
    direction: '',
    lastX: -2,
    lastY: -2,
}

// document.addEventListener('drag',(e)=>{
//     console.log(e)
// })
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







enum Direction {
    forward,
    back,
    right,
    left,
}

interface Movable {
    move(direction: Direction): void;
}

abstract class Animal implements Movable {
    abstract move(direction: Direction): void;
}

class Paw implements Movable {
    public move(direction: Direction): void {
        // TODO
    }
}

class Wings {
    public wave(): void {
        // TODO
    }
}

class Tail implements Movable {
    public move(direction: Direction): void {
        // TODO
    }
}

class Dog extends Animal {
    private tail = new Tail();
    private paws: Paw[] = [
        new Paw(),
        new Paw(),
        new Paw(),
        new Paw(),
    ];

    public move(direction: Direction): void {
        this.paws.forEach((paw) => paw.move(direction));
    }
}

class Spider extends Animal {
    private paws: Paw[] = [
        new Paw(),
        new Paw(),
        new Paw(),
        new Paw(),
        new Paw(),
        new Paw(),
        new Paw(),
        new Paw(),
    ];

    public move(direction: Direction): void {
        this.paws.forEach((paw) => paw.move(direction));
    }
}

class Bird extends Animal {
    private tail = new Tail();
    private wings = new Wings();

    public move(direction: Direction): void {
        this.wings.wave();
        this.tail.move(direction);
    }
}

abstract class Vehicle implements Movable {
    abstract move(direction: Direction): void;
}

class Engine {
    public switch(on: boolean): void {
        // TODO
    }

    public changeRotationSpeed(speed: number): void {
        // TODO
    }
}

class Transmission {
    public setSpeed(speed: number): void {
        // TODO
    }
}

class Car extends Vehicle {
    private engine = new Engine();
    private transmission = new Transmission();

    public move(direction: Direction): void {
        this.engine.switch(true);
        this.engine.changeRotationSpeed(100500);
        this.transmission.setSpeed(1);
    }
}

const moveDirection = Direction.forward;

const dog = new Dog();
const spider = new Spider();
const bird = new Bird();
const car = new Car();

dog.move(moveDirection);
spider.move(moveDirection);
bird.move(moveDirection);
car.move(moveDirection);