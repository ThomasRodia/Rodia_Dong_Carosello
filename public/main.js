import { createTable } from "tabella.js";
const tabella=document.getElementById("Tabella");
let componenteTabella=createTable(tabella);
componenteTabella.load();
componenteTabella.setcallback(cb);
let cb=function(){
    
}