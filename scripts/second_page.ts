import '../styles/css/normalize.css'
import '../styles/sass/pages/main.scss'
import '../assets/images/favicon.jpg'
import "./contacts-window.js"
import "./hamburger.js";
import "./header.js";
import "./switch_lang.js";
import TelegramSendMessage from "./tg_bot.js";
import { Slider } from 'video_slider';


new TelegramSendMessage("contacts-window__form","contacts-window__user-number","contacts-window__button-send");