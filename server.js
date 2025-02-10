const express = require("express");
const http = require("http");
const app = express();
const fs = require('fs');
const multer  = require('multer');
//const server = http.createServer(app);
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql2');

const server = http.createServer(app);
server.listen(80, () => {
   console.log("- server running");
});