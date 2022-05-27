const elems = {
    buttons: document.querySelectorAll('.buttons-container__button'),
    portfolioContainer: document.querySelector('.portfolio__container'),
    video:document.querySelector('video'),
    source:document.querySelector('source'),
    getPortfolioCards: function () {
        return document.querySelectorAll('.portfolio__card');
    },
}

const configAtr = {
    'portfolio': 86,
    'furniture': 43,
    'jewerly': 62,
    'prams': 42,
    'technics': 43,
    'clothes': 30,
}

window.addEventListener('load', (event) => {

    newCards('portfolio');
})
window.addEventListener('photoDowloaded', () => {

    const currentTime = elems.video.currentTime;
    // elems.video.pause();
    // let video = new Video()
    elems.source.setAttribute('src', '../assets/video/video_fullHD_clip.mp4');
    elems.video.load();
    elems.video.play();
    // elems.video.currentTime = currentTime;
})


//elems.buttons[0].dataset.photo
elems.buttons.forEach(button => {
    button.onclick = switchPhotos;
})

document.getElementById('jpg').onclick = function (){
    let reg = /\.\w+$/m
    document.querySelectorAll('.portfolio__card img').forEach( img => img.src = img.src.replace(reg,'.jpg') )
    if(document.querySelector('.modal-window__container img')){
        document.querySelector('.modal-window__container img').src = document.querySelector('.modal-window__container img').src.replace(reg,'.jpg')
    }
}
document.getElementById('webp').onclick = function (){
    let reg = /\.\w+$/m
    document.querySelectorAll('.portfolio__card img').forEach( img => img.src = img.src.replace(reg,'.webp') )
    if(document.querySelector('.modal-window__container img')){
        document.querySelector('.modal-window__container img').src = document.querySelector('.modal-window__container img').src.replace(reg,'.webp')
    }
}

function switchPhotos(event) {
    removeCards()
    newCards(event.currentTarget.dataset.photo)
}

function removeCards() {
    elems.getPortfolioCards().forEach(card => card.remove())
}

function newCards(dataAtr) {
    let temp = getRange(configAtr[dataAtr])
    for (let i = 1; i < configAtr[dataAtr]; i++) {
        createCard(dataAtr, temp[i]);
    }

}

function getRange(max) {
    let arr = []
    for (let i = 1; i <= max; i++) {
        arr.push(i)
    }
    function shuffleArr(arr) {
        return arr.sort(() => Math.random() - 0.5)
    }
    return shuffleArr(arr)
}

function createCard(dataAtr, page) {
    let newCard = document.createElement('div');
    newCard.classList.add("portfolio__card");
    newCard.classList.add(`${dataAtr}_${page}`);
    newCard.innerHTML = `<img src="../assets/portfolio/${dataAtr}/${dataAtr}_${page}.webp" id = "${dataAtr}_${page}-img" onload="addGridStyleOnload('${dataAtr}_${page}-img','${dataAtr}','${page}')" alt="" ">`; //onload="addGridStyle('${dataAtr}_${page}-img')
    newCard.addEventListener('click', (event) => {   // TODO повесеить на родителя, а не добавлять каждому элементу
        openFullSizePhoto(newCard.firstChild.getAttribute('src'));
    })
    elems.portfolioContainer.append(newCard)
}
let i = 1



async function addGridStyleOnload(id, dataAtr, page) {
    i++;
    if (i === configAtr[dataAtr]) {
    
        window.dispatchEvent(new CustomEvent('photoDowloaded'))
    }
    const card = document.getElementById(`${id}`)
    card.removeAttribute('onload') // avoid loop!
    let imgH = card.naturalHeight
    let imgW = card.naturalWidth
    // let img = new Image()

    // img.onload = function () {
    //     // card.src = `../assets/portfolio/${dataAtr}/${dataAtr}_${page}.jpg`
    // }
    // img.onerror = function () {
    //     console.log('error')
    // };
    // img.src = `../assets/portfolio/${dataAtr}/${dataAtr}_${page}.jpg`

    // if (dataAtr === 'furniture' || dataAtr === 'prams') { // TODO return this
    if (1) {
        if (imgW === 300 && imgH === 615) {
            card.parentElement.classList.add("g1-2");
        }
        if (imgW === 615 && imgH === 300) {
            card.parentElement.classList.add("g2-1");
        }
        if (imgW === 300 && imgH === 300) {
            card.parentElement.classList.add("g1-1");
        }
        if (imgW === 615 && imgH === 615) {
            card.parentElement.classList.add("g2-2");
        }
        if (imgW === 300 && imgH === 200) {
            card.parentElement.classList.add("g1-0_66"); //1 0.66
        }
        if (imgW === 300 && imgH === 450) {
            card.parentElement.classList.add("g1-1_5"); //1 0.66
        }
        if (imgW === 615 && imgH === 410) {
            card.parentElement.classList.add("g2-1_5"); //1 0.66
        }
    }
}

