const express = require('express');
const {authorize} = require('./auth');
const {patients} = require('../models/patient_and_doctor');
const router = express.Router();

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get('/viewpatient/:id' ,authorize, async (req,res) =>{
    const pid = req.params.id;
        const data = await patients.find({}, {patients: {$elemMatch: {pid: pid }}})
        var singlepatient = data[0].patients[0]
        // console.log(singlepatient)
        if(!data){
            return res.status(404).redirect('/login');
        }else{
            // console.log(singlepatient.name)
            res.render('patient_details' , {singlepatient});   
            // res.end();
        }
})

module.exports = router;