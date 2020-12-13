class App {

    constructor() {
        this.#init();
    }

    #init() {
       this.#serviceWorker();
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