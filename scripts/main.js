let priceCards = document.querySelectorAll('.prices__card')
console.log(priceCards)

priceCards.forEach((card)=>{
    card.querySelector('.prices__button').addEventListener('mouseover', ()=>{
        card.classList.add('hover');
        card.querySelector('.prices__card-title').classList.add('hover');
    })
    card.querySelector('.prices__button').addEventListener('mouseout', ()=>{
        card.classList.remove('hover');
        card.querySelector('.prices__card-title').classList.remove('hover');
    })
})