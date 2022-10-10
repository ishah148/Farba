import '../styles/css/normalize.css'
import '../styles/sass/pages/main.scss'
import '../assets/images/favicon.jpg'
import "./contacts-window.js"
import "./hamburger.js";
import "./header.js";
import "./switch_lang.js";
import TelegramSendMessage from "./tg_bot.js";
import { VideoSlider } from './video_slider';
import { videoGaleryConfig } from './configs/video-configs';


new TelegramSendMessage("contacts-window__form","contacts-window__user-number","contacts-window__button-send");

new VideoSlider('http://localhost:8009/assets/video-galery/promotional/video_1_720.webp', 'promotional', 0 , videoGaleryConfig.promotional);