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
   upload(req, res, (err) => {   
      res.json({url: "./files/" + req.file.filename});    
   })
});

app.get('/img/downloadAll', (req, res) => {
   const directoryPath = path.join(__dirname, "files");
   
   fs.readdir(directoryPath, (err, files) => {
      if (err) {
         return res.status(500).json({ error: "Errore nella lettura della directory." });
      }
      
      const images = files.map(file => ({ nome: file }));
      res.json(images);
   });
});
app.delete('/img/delete/:index', (req, res) => {
   const directoryPath = path.join(__dirname, "files");
   
   fs.readdir(directoryPath, (err, files) => {
       if (err) {
           return res.status(500).json({ error: "Errore nella lettura della directory." });
       }
       
       const index = parseInt(req.params.index, 10);
       if (isNaN(index) || index < 0 || index >= files.length) {
           return res.status(400).json({ error: "Indice non valido." });
       }
       
       const fileToDelete = path.join(directoryPath, files[index]);
       fs.unlink(fileToDelete, (err) => {
           if (err) {
               return res.status(500).json({ error: "Errore nell'eliminazione del file." });
           }
           res.json({ message: "File eliminato con successo." });
       });
   });
});

const server = http.createServer(app);
server.listen(80, () => {
   console.log("- server running");
});