import {createTable} from "./tabella.js";
import {createTableCarosello }from "./carosello.js"

let cb=function(){

}
let cbc=function(){

}
const tabella=document.getElementById("Tabella");
let componenteTabella=createTable(tabella);
componenteTabella.load();
componenteTabella.setcallback(cb);
const carosello= document.getElementById("Carosello");
let componenteCarosello=createTableCarosello(carosello);
componenteCarosello.load();
componenteCarosello.setcallback(cbc);

