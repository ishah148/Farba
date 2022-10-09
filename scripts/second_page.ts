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
new VideoSlider('http://localhost:8009/assets/portfolio/portfolio/portfolio_31.webp', 'portfolio', 1, [55, 31, 34, 4, 46, 77, 53, 27, 68, 33, 57, 75, 3, 70, 84, 65, 24, 39, 48, 16, 28, 22, 44, 19, 17, 71, 50, 21, 79, 81, 38, 36, 9, 5, 29, 80, 58, 49, 52, 83, 60, 12, 59, 47, 15, 69, 82, 85, 7, 32, 78, 43, 64, 74, 8, 35, 72, 18, 11, 61, 63, 51, 2, 62, 37, 1, 54, 41, 67, 26, 40, 10, 66, 20, 23, 6, 45, 56, 76, 13, 42, 14, 25, 30]);