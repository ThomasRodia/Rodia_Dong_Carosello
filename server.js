const express = require("express");
const http = require("http");
const app = express();
const fs = require('fs');
const multer  = require('multer');
//const server = http.createServer(app);
const bodyParser = require('body-parser');
const path = require('path');
//const mysql = require('mysql2');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/", express.static(path.join(__dirname, "public")));
app.use("/assets", express.static(path.join(__dirname, "Public/Assets")));

const server = http.createServer(app);
server.listen(80, () => {
   console.log("- server running");
});