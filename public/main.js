import { createTable } from "./scripts/components/tabella.js";
import { createTableCarosello } from "./scripts/components/carosello.js"
import { createNavigator } from "./scripts/components/navigator.js";
import { createModalForm } from "./scripts/components/modalForm.js";
import { createMiddleware } from "./scripts/components/middleware.js";
import { createPubSub } from "./scripts/dp/pubsub.js";

const pubsub = createPubSub();
const navigator = createNavigator(document.querySelector("#container"));

const tabella = document.getElementById("Tabella");
let componenteTabella = createTable(tabella, pubsub);
componenteTabella.setMiddleware(createMiddleware());
componenteTabella.render();

const carosello = document.getElementById("Carosello");
let componenteCarosello = createTableCarosello(carosello, pubsub);
componenteCarosello.setMiddleware(createMiddleware());
componenteCarosello.render();
//componenteCarosello.load();

// form modale login
const login = createModalForm(document.getElementById("modal-bd"));

login.setLabels({
    "username": [
        "text",
        null,
    ],
    "password": [
        "text",
        null
    ],
});

if (Cookies.get("isLogged")) {
    const adminPage = document.getElementById("adminPage");
    adminPage.href = "#pagina2";
    document.getElementById("adminPageButton").removeAttribute("data-bs-target", "");
}

login.onsubmit(document.getElementById("accesso"), async (labels) => {
    const resp = await fetch("/api/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: labels[0],
            password: labels[1],
        })
    });

    const data = await resp.json();

    // validità dati
    if (data.validity) {
        Cookies.set("isLogged", "true", {
            expires: 0.5
        });
        window.location.href = '#pagina2';
        const adminPage = document.getElementById("adminPage");
        adminPage.href = "#pagina2";
        document.getElementById("adminPageButton").removeAttribute("data-bs-target", "");
        document.getElementById("login-close").click();
    } else {
        document.getElementById("prompt").innerHTML = "Credenziali non corrette!";
    }
});

login.render();