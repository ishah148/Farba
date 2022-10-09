import '../styles/css/normalize.css'
import '../styles/sass/pages/main.scss'
import '../assets/images/favicon.jpg'
import "./contacts-window.js"
import "./hamburger.js";
import "./header.js";
import "./switch_lang.js";
import TelegramSendMessage from "./tg_bot.js";
import { VideoSlider } from './video_slider';


new TelegramSendMessage("contacts-window__form","contacts-window__user-number","contacts-window__button-send");
//new VideoSlider('http://localhost:8009/assets/portfolio/portfolio/portfolio_31.webp', 'portfolio', 1, [1, 2, 3, 4, 5, 6]);
new VideoSlider('http://localhost:8009/assets/video-galery/first/video_1_720.webp', 'first', 1, [1, 2, 3, 4, 5, 6]); //! вместо 1 должен быть 0!