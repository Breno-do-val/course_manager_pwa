import HtmlService from './HtmlService.js';
import CourseService from './CourseService.js';

class App {

    constructor() {
        this.#serviceWorker();
        this.#init();
    }

    #init() {
        new HtmlService(new CourseService());
        console.log('auhauh')
    }

    #serviceWorker() {
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker
                .register("sw.js")
                .then(_ => console.log("[Service Worker] Registered!"))
                .catch(_=> console.error("[Service Worker] Failed"))
        }
    }
}

new App();