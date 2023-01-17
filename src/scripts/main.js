import "./contacts-window.js"
import { GridGalery } from "./grid_galery.js"
import "./hamburger.js";
import "./header.js";
import "./price_cards_hover.js";
import "./show_price_table.js"
import "./switch_lang.js";
{/* <link rel="stylesheet" href="../styles/css/normalize.css"> */ }
{/* <link rel="stylesheet" href="../styles/css/pages/main.css"> */ }
import '../styles/css/normalize.css'
import '../styles/sass/pages/main.scss'
import '../assets/images/favicon.jpg'
// import {FullSizeViewer} from "./3D_view.js"
import TelegramSendMessage from "./tg_bot.js";
import { ThreeDManager } from "./3D_viewer/3D_Manager"
import { VideoPlayersHandler } from "./video_players_handler.js";
import { mainPageVideoInfo } from "./configs/video-configs"

const startTime = Date.now();
new TelegramSendMessage("contacts-window__form", "contacts-window__user-number", "contacts-window__button-send");
new TelegramSendMessage("contacts-window__form-footer", "contacts-window__user-number-footer", "contacts-window__button-send-footer");
new ThreeDManager();
new VideoPlayersHandler(mainPageVideoInfo);

window.addEventListener("load", () => {
    document.querySelector(".start-screen__video-source").setAttribute("src", "./assets/video/video_360_clip.mp4");
    new GridGalery("portfolio");
});


(function handleScrollToAnchors() {
    let isScrollDone = false;
    window.addEventListener("photoDowloaded", () => {
        const endTime = Date.now();
        if (endTime - startTime <= 10000 && !isScrollDone) {
            isScrollDone = true;
            // таймер нужен по нескольким причинам
            // 1. юзабилити - если фотки будут грузиться долго - нужно отменять, поскольку пользователь явно сам начнет листать
            // 2. ивент photoDowloaded испускается при нажатии на любую кнопку в галерее
            const section = (document.URL.match(/.*#([\w-]+)/) || [])[1];
            if (section === 'portfolio-section'
                || section === 'threeD-section'
                || section === 'video-section'
                || section === 'price-section'
                || section === 'contacts-section') {
                document.getElementById(section)?.scrollIntoView();
            }
        }
    });
})();



if (module.hot) {
    module.hot.accept();
}