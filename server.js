const express = require("express");
const http = require("http");
const app = express();
const fs = require('fs');
const multer  = require('multer');
const bodyParser = require('body-parser');
const path = require('path');

const conf = JSON.parse(fs.readFileSync('config.json'));

// Configurazione DB
conf.database.ssl.ca = fs.readFileSync(__dirname + '/ca.pem');

const DBManager = require('./DBManager');
db = DBManager(conf.database);

db.createTable();

// Configurazione storage

const storepath = conf.storage;

const data = fs.readFileSync('config.json');
const config = JSON.parse(data);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/", express.static(path.join(__dirname, "public")));
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

var storage = multer.diskStorage({
   destination: function (req, file, callback) {
       callback(null, path.join(__dirname, "files"));
   },
   filename: function (req, file, callback) {
       callback(null, file.originalname);
   }
});
const upload = multer({ storage: storage}).single('file');
app.use("/files", express.static(path.join(__dirname, "files")));
app.post('/img/upload', (req, res) => {
   upload(req, res, async (err) => {   
      if (!req.file) {
         return res.status(400).json({ error: "Nessun file caricato" });
      }
      await db.insert(storepath + req.file.filename);
      res.json({url: storepath + req.file.filename});    
   })
});

app.get('/img/downloadAll', async (req, res) => {
   const queryResult = await db.selectAll();

   res.json(queryResult);
});
app.delete('/img/delete/:index', async (req, res) => {

   const data = await db.selectAll();
   const found = data.find(image => image.id === parseInt(req.params.index, 10));
   const fileToDelete = found.url;

   fs.unlink(fileToDelete, async (err) => {
      if (err) {
          console.error(err);
      }

      await db.delete(req.params.index);

      res.json({response: "immagine eliminata!"});
   });
});


// Autenticazione
app.post('/api/login', async (req, res) => {
   
   const responselog = await fetch(config.credentials.login, {
      method: "POST",
      headers: {
          "content-type": "application/json",
          "key": config.credentials.token
      },
      body: JSON.stringify({
          username: req.body.username,
          password: req.body.password
      }),
   });

   const data = await responselog.json();

   res.json({
      validity: data.result,
   });

});

const server = http.createServer(app);
server.listen(80, () => {
   console.log("- server running");
});