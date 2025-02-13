import { createTable } from "./components/tabella.js";
import { createTableCarosello }from "./components/carosello.js"
import { createNavigator } from "./components/navigator.js";
import { createModalForm } from "./components/modalForm.js";
const navigator = createNavigator(document.querySelector("#container"));

let cb=function(){

}
let cbc=function(){

}
const tabella = document.getElementById("Tabella");
let componenteTabella = createTable(tabella);
componenteTabella.load();
componenteTabella.setcallback(cb);

const carosello = document.getElementById("Carosello");
let componenteCarosello = createTableCarosello(carosello);
componenteCarosello.load();
componenteCarosello.setcallback(cbc);

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

login.onsubmit(document.getElementById("accesso"), (labels) => {
    console.log(labels);
});

login.render();