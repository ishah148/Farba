
import "./hamburger.js";
import "./header.js";
import "./price_cards_hover.js";
import "./switch_lang.js";
import "./show_price_table.js"
import "./contacts-window.js"
import {GridGalery} from "./grid_galery.js"
import TelegramSendMessage from "./tg_bot.js";
const tg = new TelegramSendMessage("contacts-window__form");
window.addEventListener("load", () => {
    const gg = new GridGalery("portfolio")
    // gg.init()
    gg.showFirstPart()
    document.getElementById('show-all').onclick = () => {
        console.log('cl')
        gg.showSecondPart()
    }
});








