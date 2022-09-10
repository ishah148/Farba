import "./contacts-window.js"
import {GridGalery} from "./grid_galery.js"
import "./hamburger.js";
import "./header.js";
import "./price_cards_hover.js";
import "./show_price_table.js"
import "./switch_lang.js";
import TelegramSendMessage from "./tg_bot.js";
import {ThreeDViewer} from "./3D_view.js"
import { VideoPlayersHandler } from "./video_players_handler.js";
{/* <link rel="stylesheet" href="../styles/css/normalize.css"> */}
{/* <link rel="stylesheet" href="../styles/css/pages/main.css"> */}
import '../styles/css/normalize.css'
import '../styles/sass/pages/main.scss'
import '../assets/images/favicon.jpg'
// import {FullSizeViewer} from "./3D_view.js"

const tg = new TelegramSendMessage("contacts-window__form","contacts-window__user-number","contacts-window__button-send");
const tgFooter = new TelegramSendMessage("contacts-window__form-footer","contacts-window__user-number-footer","contacts-window__button-send-footer");

const videoPlayersHandler = new VideoPlayersHandler();
videoPlayersHandler.init();
const b = new ThreeDViewer();

window.addEventListener("load", () => {
    new GridGalery("portfolio");
});








