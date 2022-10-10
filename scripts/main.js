import "./contacts-window.js"
import {GridGalery} from "./grid_galery.js"
import "./hamburger.js";
import "./header.js";
import "./price_cards_hover.js";
import "./show_price_table.js"
import "./switch_lang.js";
{/* <link rel="stylesheet" href="../styles/css/normalize.css"> */}
{/* <link rel="stylesheet" href="../styles/css/pages/main.css"> */}
import '../styles/css/normalize.css'
import '../styles/sass/pages/main.scss'
import '../assets/images/favicon.jpg'
// import {FullSizeViewer} from "./3D_view.js"
import TelegramSendMessage from "./tg_bot.js";
import {ThreeDManager} from "./3D_viewer/3D_Manager"
import { VideoPlayersHandler } from "./video_players_handler.js";
import { mainPageVideoInfo } from "./configs/video-configs"

new TelegramSendMessage("contacts-window__form","contacts-window__user-number","contacts-window__button-send");
new TelegramSendMessage("contacts-window__form-footer","contacts-window__user-number-footer","contacts-window__button-send-footer");
new ThreeDManager();
new VideoPlayersHandler(mainPageVideoInfo);

window.addEventListener("load", () => {
    document.querySelector(".start-screen__video-source").setAttribute("src", "../assets/video/video_360_clip.mp4");
    new GridGalery("portfolio");
});








