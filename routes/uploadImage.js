const router = require("express").Router()
const express = require('express')
const multer = require('multer')
const {authorize} = require("./auth");
// const mongoose = require('mongoose');
const { spawn } = require('child_process');
const path = require('path');
const uuid = require('uuid').v4;
const {patients} = require('../models/patient_and_doctor')
var {patient_detail} = require('../models/patient_and_doctor');
const { count } = require("../models/user");



router.use(express.urlencoded({ extended: true }));
router.use(express.json());

const prediction_file = spawn('python',['./python/trial.py']);

prediction_file.stderr.on('data', (data) => {
console.error(`stderr: ${data}`);
});

prediction_file.stdout.on('data', (output) => {
            console.log('Output :')
            console.log(output)
            patient_detail.class = output;
            
            patients.findOneAndUpdate({name : pname} , { $push :{ patients : patient_detail } } , {new : true})
            .then(data => {
                return res_for_prediction.redirect(`/viewpatient/${patient_detail.pid}`);
            })
            .catch(err => {
                console.log(err);
                return;
            })

});

var unique_id = ''
var pname='';
var res_for_prediction;

var storage = multer.diskStorage({
    destination: 'images',
    limits:{
        fileSize:10000000
    },
    fileFilter(res , file , cb){
        if(!file.originalname.match(/\.(jpeg|png|jpg)$/)){
            cb(new Error('file must be an image'))
        }
        else{
            cb(undefined , true);
        }
    },
    filename: function (req, file, cb) {
        unique_id = uuid()
        // console.log(unique_id)
      cb(null, `${unique_id}-${file.originalname}`);
    }
  });

var upload = multer({ storage: storage });


router.get('/upload', authorize ,(req, res) => {   
    res.render('uploadpage')
});


    router.post('/upload', authorize,  upload.single('avatar'), (req, res) => {
        console.log(req.body)
        pname = req.session.userid
        res_for_prediction = res
        patient_detail.image_name = `${unique_id}-${req.file.originalname}`;
        patient_detail.pid = req.body.pid;
        patient_detail.name = req.body.name;
        patient_detail.age = req.body.age;
        patient_detail.bg = req.body.bg;
        prediction_file.stdin.write(`${unique_id}-${req.file.originalname}\n`);
        
    })

module.exports = router;