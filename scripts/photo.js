const elems = {
    buttons: document.querySelectorAll('.buttons-container__button'),
    portfolioContainer: document.querySelector('.portfolio__container'),
    getPortfolioCards: function () {
        return document.querySelectorAll('.portfolio__card');
    },
}

window.addEventListener('load',(event)=>{
    console.log(event)
    newCards('furniture');
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

async function newCards(dataAtr) { //  dataAtr - our folder!!!
    let max = 20; //TODO correct!
    if (dataAtr === 'portfolio') { max = 12 }
    if (dataAtr === 'jewerly' || dataAtr === 'furniture') { max = 43 }
    if( dataAtr === 'prams'){max = 42}
    if( dataAtr === 'technics'){max = 43}
    let temp = getRange(max)
    
    for (let i = 1; i < max; i++) {
        createCard(dataAtr, temp[i]);
    }
    setTimeout(() => { // ! Костыль
        checkStyle(dataAtr)
    }, 1500); //TODO correct it shit!!!!!!!!!!!!
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
    newCard.innerHTML = `<img src="../assets/portfolio/${dataAtr}/${dataAtr}_${page}.jpg" alt="">`;
    elems.portfolioContainer.append(newCard)
}

function checkStyle(dataAtr) {
    elems.getPortfolioCards().forEach(card => {
        addGridStyle(card, dataAtr)
    })

    function addGridStyle(card, dataAtr) {
        let imgH = card.querySelector('img').naturalHeight
        let imgW = card.querySelector('img').naturalWidth

        // if (dataAtr === 'furniture' || dataAtr === 'prams') { // TODO return this
            if(dataAtr){
            if (imgW === 300 && imgH === 615) {
                card.classList.add("g1-2");
            }
            if (imgW === 615 && imgH === 300) {
                card.classList.add("g2-1");
            }
            if (imgW === 300 && imgH === 300 ) {
                card.classList.add("g1-1");
            }
            if (imgW === 615 && imgH === 615) {
                card.classList.add("g2-2");
            }
            if (imgW === 300 && imgH === 200) {
                card.classList.add("g1-0_66"); //1 0.66
            }
            if (imgW === 300 && imgH === 450) {
                card.classList.add("g1-1_5"); //1 0.66
            }
            if (imgW === 615 && imgH === 410) {
                card.classList.add("g2-1_5"); //1 0.66
            }
        }
    }
}




const gridConfig = [
    {
        dataAtr: '',

    },
]