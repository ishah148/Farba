import '../styles/css/normalize.css'
import '../styles/sass/pages/video.scss'
import '../assets/images/favicon.jpg'
import "./contacts-window.js"
import "./hamburger.js";
import "./header.js";
import "./switch_lang.js";  //почему не включает в commonModules при сборке?
import TelegramSendMessage from "./tg_bot.js";
import { VideoGaleryPagination } from './video-galery-pagination.js';


new TelegramSendMessage("contacts-window__form","contacts-window__user-number","contacts-window__button-send");

new VideoGaleryPagination();


if (module.hot) {
  module.hot.accept();
}