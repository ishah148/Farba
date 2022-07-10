import "./contacts-window.js"
import {GridGalery} from "./grid_galery.js"
import "./hamburger.js";
import "./header.js";
import "./price_cards_hover.js";
import "./show_price_table.js"
import "./switch_lang.js";
import TelegramSendMessage from "./tg_bot.js";
import { VideoPlayer } from "./video_player.js";
const tg = new TelegramSendMessage("contacts-window__form");
const videoPlayer1 = new VideoPlayer();

videoPlayer1.init();

window.addEventListener("load", () => {
    new GridGalery("portfolio");
});








