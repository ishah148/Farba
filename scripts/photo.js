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
    console.log(event)
    newCards('portfolio');
})
window.addEventListener('photoDowloaded', () => {
    console.log('yeaaaaaaa');
    const currentTime = elems.video.currentTime;
    // elems.video.pause();
    // let video = new Video()
    elems.source.setAttribute('src', '../assets/video/video_hd.mp4');
    elems.video.load();
    elems.video.play();
    // elems.video.currentTime = currentTime;
})


// *furniture
//elems.buttons[0].dataset.photo
elems.buttons.forEach(button => {
    button.onclick = switchPhotos;
})


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
    console.log()

    if (i === configAtr[dataAtr]) {
        console.log('done!')
        window.dispatchEvent(new CustomEvent('photoDowloaded'))
    }
    const card = document.getElementById(`${id}`)
    card.removeAttribute('onload') // avoid loop!
    let imgH = card.naturalHeight
    let imgW = card.naturalWidth
    let img = new Image()

    img.onload = function () {
        // card.src = `../assets/portfolio/${dataAtr}/${dataAtr}_${page}.jpg`
    }
    img.onerror = function () {
        console.log('error')
    };
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



//// function newCards(dataAtr) { //  dataAtr - our folder!!!
//     // let max = 20; //TODO correct!
//     // if (dataAtr === 'portfolio') { max = 86 }
//     // if (dataAtr === 'furniture') { max = 43 }
//     // if (dataAtr === 'jewerly') { max = 62 }
//     // if (dataAtr === 'prams') { max = 42 }
//     // if (dataAtr === 'technics') { max = 43 }
//     // if (dataAtr === 'clothes') { max = 30 }
////     let temp = getRange(configAtr[dataAtr])
//     // stage 1
////     for (let i = 1; i < configAtr[dataAtr]; i++) {
////         createCard(dataAtr, temp[i]);
////     }

//// }