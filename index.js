const express = require("express");
const app = express()
const multer = require('multer');
const path = require('path');
require('dotenv').config({path : '.env'})
const port = process.env.PORT;
const session = require('express-session');
const cookieParser = require('cookie-parser');
const ejsmate = require('ejs-mate')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo');


app.use(session({
    secret : process.env.SECRET_KEY ,
    resave: false,
    saveUninitialized: false,
    // cookie: {maxAge: 60000}, 
    store: new MongoStore({
        mongoUrl: 'mongodb://localhost:27017/session-database',
        autoRemove: 'disabled',
        ttl :14*60*60*24
    })
    
}));


// routes
require('./database/mongoose');
const uploadImage = require('./routes/uploadImage')
const login = require('./routes/login')
const allSubmissiions = require('./routes/allSubmissiions')
const patient = require('./routes/viewpatient')
const extraroute = require('./routes//extraroutes')



//setting the uses
app.engine('ejs' , ejsmate)
app.use(cookieParser());
app.set('view engine' , 'ejs');
app.set('views' , 'views')
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(express.static(__dirname + '/extras/css'));
app.use(express.static(__dirname + '/fonts'));
app.use(express.static(__dirname + '/extras'));
app.use(express.static(__dirname + '/extras/js'));
app.use(express.static(__dirname + '/extras/html'));
app.use(express.static(__dirname + '/extras/images'));
app.use(express.static(__dirname + '/images'));
app.use(express.static('images'));
app.use(login)
app.use(uploadImage)
app.use(allSubmissiions)
app.use(patient)
app.use(extraroute)



app.get('*' , (req,res) => {
    res.send("there no such page")
});
app.listen(port , () => {
    console.log("we are now online")
})
