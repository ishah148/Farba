const elems = {
    buttons: document.querySelectorAll('.buttons-container__button'),
    portfolioContainer: document.querySelector('.portfolio__container'),
    getPortfolioCards: function () {
        return document.querySelectorAll('.portfolio__card');
    },
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
    // elems.getPortfolioCards().forEach(card => console.log(card))
}

function newCards(dataAtr) { //  dataAtr - our folder!!!
    // ! correct
    // dataAtr = 'jewerly'
    // console.log(dataAtr)
    let max = 20; //TODO correct!
    if (dataAtr === 'portfolio') { max = 12 }
    if (dataAtr === 'jewerly' || dataAtr === 'furniture') { max = 43 }
    let temp = getRange(max)
    for (let i = 1; i < max; i++) {
        createCard(dataAtr, temp[i]);
    }
}

function createCard(dataAtr, page) {
    let newCard = document.createElement('div');

    newCard.classList.add("portfolio__card");
    newCard.classList.add(`${dataAtr}_${page}`);
    newCard.innerHTML = `<img src="../assets/portfolio/${dataAtr}/${dataAtr}_${page}.jpg" alt="">`;
    elems.portfolioContainer.append(newCard)
    let imgH = newCard.querySelector('img').naturalHeight;
    let imgW = newCard.querySelector('img').naturalWidth;
    // console.log(newCard.querySelector('img').naturalWidth)
    // console.log(newCard.querySelector('img').naturalHeight)
    if (imgH === 615 && imgW === 300) {
        newCard.classList.add("g1-2");
    }
    if (imgH === 300 && imgW === 615) {
        newCard.classList.add("g2-1");
    }
    if (imgH === 300 && imgW === 300) {
        newCard.classList.add("g1-1");
    }
}

