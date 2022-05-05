const elems = {
    buttons: document.querySelectorAll('.buttons-container__button'),
    portfolioContainer: document.querySelector('.portfolio__container'),
    portfolioCards: document.querySelectorAll('.portfolio__card')
}
//elems.buttons[0].dataset.photo
elems.buttons.forEach(button => {
    button.onclick = switchPhotos;
})

function switchPhotos(event) {
    removeCards()
    newCards(event.currentTarget.dataset.photo)
}

function removeCards() {
    elems.portfolioCards.forEach(card => card.remove())
}
function newCards(dataAtr) { //  dataAtr - our folder!!!
    // ! correct
    dataAtr = 'jewerly'
    for (let i = 1; i < 30; i++) {
        createCard(`${dataAtr}_${i}`);
    }
}

function createCard(fileName) {
    let newCard = document.createElement('div');
    newCard.innerHTML = `
    <div class="portfolio__card">
         <img src="../assets/portfolio/jewerly_mini/${fileName}.jpg" alt="">
    </div>
    `
    elems.portfolioContainer.append(newCard)
}

