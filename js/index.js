import "../assets/scss/fonts.scss";
import "../assets/scss/main.scss";

import appData from "./data/appData.js";
import App from "./classes/App.js";

const lang = localStorage.getItem("lang") || "en";
const name = localStorage.getItem("name") || "";
const city = localStorage.getItem("city") || "Minsk";

const app = new App(lang, name, city, appData, appData.HTMLElements);
app.startApp();
