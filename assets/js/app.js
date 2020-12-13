class App {

    constructor() {
        this.#serviceWorker();
        this.#init();
    }

    #init() {
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