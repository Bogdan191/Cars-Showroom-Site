const express = require('express'); /* include modulul
express memorand in variabila express obiectul asociat modulului(exportat de modul)*/

var app = express();

var JSAlert = require("js-alert");

//const bodyParser = require('body-parser');
const session = require('express-session');
const formidable = require('formidable');
const fs = require('fs');
const util = require('util');
const nodemailer = require('nodemailer');

const crypto = require('crypto');

/// Initializari secket.io
const http = require('http');
const socket = require('socket.io');
const server = new http.createServer(app);
var io = socket(server);
io = io.listen(server); //asculta pe acelasi port ca si serverul

// Setez o sesiune
app.use(session({
    secret: 'abcdefg', // folosit de exoress session pentru criptarea id-ului de sesiune
    resave: true, 
    saveUninitialized: false
})); 

var conexiune_index;
io.on("connection", (socket) => {
    console.log("Conectare!");
    conexiune_index = socket;
    socket.on('disconnect', () => {conexiune_index = null; console.log('Deconectare!')});
 });

 function getJson(numeFis) {
     let textFis = fs.readFileSync(numeFis);
     return JSON.parse(textFis); /// obtin obiectul asociat json-ului
 }
 function saveJson(obJson, numeFis) {
     let data = JSON.stringify(obJson); ///transform in JSON
     fs.writeFileSync(numeFis, data); ///scriu JSON-ul in fisier(inlocuind datele vechi)   
 }

 
 app.set('view engine', 'ejs');
async function trimiteMail(username, email) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: false, 
        auth: {
          user: "bogdan.auto221@gmail.com", 
          pass: "bogdanAuto"  
        },
            tls: {
                rejectUnauthorized: false // pentru gmail
            }
    });

    ///trimitere mail
    let info = await transporter.sendMail({
        from: '"bogdan.auto221@gmail.com" <bogdan.auto221@gmail.com', 
        to: email, 
        subject: "User nou",
        text: "Felicitar, " + username + "contul a fost creat cu succes",
        html: "<p>Salut, " + username + "</p>"

    });
    console.log("Mesaj trimis: %s", info.messageId);
}
 //Setez folderele statice (cele in care nu am fisiere generate prin node
app.use('/css', express.static('css'));
app.use('/uploads', express.static('uploads'));
app.use('Date_Tehnice', express.static('Date_Tehnice'));
app.use('/javaScript', express.static('javaScript'));
 // cand se face o cerere get catre pagina de index 
app.get('/', function(req, res) {

    /*afiseaza(render) pagina folosind ejs (deoarece este setat ca view engine) */
    res.render('html/index',  {user:req.session.username});
	
	
});


app.get('/logout', function(req, res) {
    req.session.destroy();//distrug sesiunea cand se intra pe pagina de logout
    res.render('html/logout');
});


app.get('/my_account', function(req, res) {    // la cererea paginii "my_account" se redirectioneaza pe ea

    res.render('html/my_account',  {user:req.session.username});
})
//// ####LOGIN
app.post('/my_account', function(req, res) { 
        
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        jsfis = getJson('useri.json')
        var cifru = crypto.createCipher('aes-128-cbc', 'mypassword'); 
        var encrParola = cifru.update(fields.parola, 'utf8', 'hex');
        encrParola += cifru.final('hex');
        let user = jsfis.useri.find(function(x) { ///caut userul dat ca date de logare in lista mea de useri
                  
              return(x.username == fields.username && x.parola == encrParola);
        });
        if(user) {
            console.log("Logare cu succes!");
            console.log(user);
            console.log(user.parola);
            console.log(encrParola);
            req.session.username = user; ///setez userul ca proprietate a sesiunii
        } else {
            console.log("Nu s-a efectuat logarea!")
        }
        console.log(req.session.username);
    
        res.render('html/index', {user:req.session.username});
    });
 

})

app.get('/inregistrare_user', function(req, res) {
    res.render('html/inregistrare_user');
})
app.post('/inregistrare_user', function(req, res) {
    var form = new formidable.IncomingForm(); //obiect de tip form cu care parsez datele venite de la utilizator
    form.parse(req, function(err, fields, files) {

        let rawdata = fs.readFileSync('useri.json');
        let jsfis = JSON.parse(rawdata);
        var cifru = crypto.createCipher('aes-128-cbc', 'mypassword');
        var encrParola = cifru.update(fields.parola, 'utf-8', 'hex');
        encrParola += cifru.final('hex');
        console.log("parola a fost criptata" + fields.parola + " " + encrParola);
        jsfis.useri.push({id:jsfis.lastId, nume:fields.nume, prenume: fields.prenume, username:fields.username, email:fields.email, parola:encrParola });
        jsfis.lastId++;
        res.render('html/inregistrare_user', {user:req.session.username, rsstatus:"ok"});
        saveJson(jsfis, 'useri.json')
        trimiteMail(fields.username, fields.email).catch((err) => {console.log(err)})
    });
});
app.get('/contact', function(req, res) {
    res.render('html/contact',  {user:req.session.username});
});
/// cand se face o cerere catre pagina "newcars.ejs"
app.get('/newcars', function(req, res) {
    // afiseaza(render) pagina folosind ejs(deoarece este setat ca view engine)
    res.render('html/newcars',  {user:req.session.username});

});

app.get('/cere_oferta', function(req, res) {
     /// Afiseaza(render) pagina folosind ejs(deoarece este setat ca view engine)
     res.render('html/cere_oferta',  {user:req.session.username});
});
app.get('/masini', function(req, res) {
    let rawdata = fs.readFileSync('masini.json');
    let jsfis = JSON.parse(rawdata);
    console.log(jsfis.masini);
    res.render('html/masini', {masini:jsfis.masini, user: req.session.username});
});

app.get('/date_tehnice', function(req, res){
    res.render('html/date_tehnice',  {user:req.session.username});
})
app.get('/test_drive', function(req, res) {
    res.render('html/test_drive',  {user:req.session.username});
})


///pagina 404
app.use(function(req, res){
    res.status(404).render('html/404');
})





///la final
 app.listen(8080);
 console.log('Serverul a pornit pe poortul 8080');