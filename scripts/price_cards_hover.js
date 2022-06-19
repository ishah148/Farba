let priceCards = document.querySelectorAll(".prices__card-wrapper");

priceCards.forEach((card) => {
    card.querySelector(".price-card__button").addEventListener(
        "mouseover",
        () => {
            card.classList.add("hover");
            card.querySelector(".price-card__title").classList.add("hover");
        }
    );
    card.querySelector(".price-card__button").addEventListener(
        "mouseout",
        () => {
            card.classList.remove("hover");
            card.querySelector(".price-card__title").classList.remove("hover");
        }
    );
});