import "./contacts-window.js"
import {GridGalery} from "./grid_galery.js"
import "./hamburger.js";
import "./header.js";
import "./price_cards_hover.js";
import "./show_price_table.js"
import "./switch_lang.js";
import TelegramSendMessage from "./tg_bot.js";
import {ThreeDManager} from "./3D_viewer/3D_Manager"
import { VideoPlayersHandler } from "./video_players_handler.js";
{/* <link rel="stylesheet" href="../styles/css/normalize.css"> */}
{/* <link rel="stylesheet" href="../styles/css/pages/main.css"> */}
import '../styles/css/normalize.css'
import '../styles/sass/pages/main.scss'
import '../assets/images/favicon.jpg'
// import {FullSizeViewer} from "./3D_view.js"

const tg = new TelegramSendMessage("contacts-window__form","contacts-window__user-number","contacts-window__button-send");
const tgFooter = new TelegramSendMessage("contacts-window__form-footer","contacts-window__user-number-footer","contacts-window__button-send-footer");
const b = new ThreeDManager();
const videoPlayersHandler = new VideoPlayersHandler([
    {
        number: 1,
        dataTranslate: 'loft-furniture',
        caption: 'Рекламный видеоролик - Лофт Мебель',
    },
    {
        number: 2,
        dataTranslate: 'shelf-installing',
        caption: 'Видеоролик - Распаковка и установка полки',
    },
    {
        number: 3,
        dataTranslate: 'stroller-review',
        caption: 'Рекламный видеоролик - Обзор детской коляски',
    },
    {
        number: 4,
        dataTranslate: 'dishwasher-review',
        caption: 'Рекламный видеоролик - Обзор посудомоечной машины',
    },
    {
        number: 5,
        dataTranslate: 'hob-review',
        caption: 'Рекламный видеоролик 3D - Обзор варочной панели',
    },
    {
        number: 6,
        dataTranslate: 'oven-review',
        caption: 'Рекламный видеоролик - Обзор духового шкафа',
    },
]);
// const b = new ThreeDViewer();

window.addEventListener("load", () => {
    new GridGalery("portfolio");
});








