import "./contacts-window.js"
import {GridGalery} from "./grid_galery.js"
import "./hamburger.js";
import "./header.js";
import "./price_cards_hover.js";
import "./show_price_table.js"
import "./switch_lang.js";
import TelegramSendMessage from "./tg_bot.js";

import { VideoPlayersHandler } from "./video_players_handler.js";

// import {FullSizeViewer} from "./3D_view.js"

const tg = new TelegramSendMessage("contacts-window__form");

const videoPlayersHandler = new VideoPlayersHandler();
videoPlayersHandler.init();

window.addEventListener("load", () => {
    new GridGalery("portfolio");
});








