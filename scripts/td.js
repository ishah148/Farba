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
        if(el.lastX < e.offsetX){
            // console.log('right')
        }
        
        if(el.lastX > e.offsetX){
            // console.log('left')
        }
        // console.log(e);
        // console.group()
        // console.log(e.offsetX)
        // console.log(e.offsetY)
        // console.groupEnd()
        el.lastX =  e.offsetX 
        el.lastY = e.offsetX 
    }
    if(e.offsetX === -1 || e.offsetY === -1){
        el.wrapper.dispatchEvent(new Event('mouseup'))
        console.log('UP!')
    }
}