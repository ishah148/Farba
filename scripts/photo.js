const elems = {
    buttons: document.querySelectorAll('.buttons-container__button'),
    portfolioContainer: document.querySelector('.portfolio__container'),
    getPortfolioCards: function (){
        return document.querySelectorAll('.portfolio__card');
    },
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
    console.log(dataAtr)
    let max = 0
    if(dataAtr === 'portfolio'){max = 12}
    if(dataAtr === 'jewerly'){max = 43}
    for (let i = 1; i < max; i++) {
        createCard(dataAtr,i);
    }
}

function createCard(dataAtr,page) {
    let newCard = document.createElement('div');
    newCard.classList.add("portfolio__card");
    newCard.innerHTML = `<img src="../assets/portfolio/${dataAtr}/${dataAtr}_${page}.jpg" alt="">`
    elems.portfolioContainer.append(newCard)
}

