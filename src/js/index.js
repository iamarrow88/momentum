import "../assets/scss/fonts.scss";
import "../assets/scss/main.scss";

import appConfig from "./data/appConfig.js";
import App from "./components/App.js";

const lang = localStorage.getItem("lang") || "en";
const name = localStorage.getItem("name") || "";
const city = localStorage.getItem("city") || "Minsk";

const app = new App(lang, name, city, appConfig, appConfig.HTMLElements);
app.startApp();
