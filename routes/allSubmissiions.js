const express = require('express')
const router = new express.Router()
const {patients} = require('../models/patient_and_doctor');
const {authorize} = require("./auth");

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get('/patients' , authorize, async(req ,res) => {

    try {
        const doctor = await patients.findOne({name : req.session.userid})
        // console.log(doctor)
        if(doctor){
            res.render('display_patients' , {data : {pat : doctor.patients , doctor_name : doctor.name }});
        }
        else{ res.status(404).send() }
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
});

module.exports = router;