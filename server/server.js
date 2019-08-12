const fs = require('fs');
const DB = JSON.parse(fs.readFileSync('./database/contas.json'));

const body = require('body-parser');

var editDB = () => {
    fs.writeFileSync('./database/contas.json',JSON.stringify(DB,null,4));
}

const express = require('express');

var app = express();

var ids = () => Object.keys(DB.Users).length;

app.listen(3000);

app.use(body.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post("/users",function(req,res) {
    var {email,senha} = req.body;
    if (typeof DB.Users[email] == 'object') {
        console.log(email,senha);
        if (DB.Users[email].senha == senha) {
            res.send('Sucess');
        }
    } else {
        res.status(404);
    }
});

app.post('/newuser', function (req, res) {
    var {username,senha,email} = req.body;
    if (typeof DB.Users[email] != 'object') {
        console.log(username);
        DB.Users[email] = {
            Nome: username,
            senha: senha,
            id: ids()
        };
        editDB();
        res.send({
            sucess: true,
            id: DB.Users[email].id,
            email: email,
            Nome: username
        });
    } else {
        res.send({
            sucess: false
        });
    }
});
