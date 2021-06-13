const express = require('express')
const router = express.Router()
const by = require('bcryptjs')
const user = require("../models/user");
// const jwt = require('jsonwebtoken')
const {authorize} = require("./auth");
const {loginredirect} = require("./auth");


router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get('/',(req,res) => {
    res.redirect('/index');
})

router.get('/index' ,async (req,res) =>{
    var value = await loginredirect(req,res);
    
    res.render('landingpage',{value});
})

router.get('/login',async (req,res) => {
    var value = await loginredirect(req,res);
    if(value == 1){
        res.redirect('/patients')
    }
    else{
        res.render('login');
    }
})

router.post('/login' , async (req , res) => {
    const body = req.body;
    try {
        const data = await user.findOne({username : body.username})      
        if(!data){
            res.status(404).send('username or password not valid')
        }else{
            const compare = await by.compare(body.pass , data.pass)
            if(compare){
                req.session.userid = data.username
                console.log(req.session.userid)
                // res.send("your password and username are correct")
                res.redirect('/upload')
            }
            else{
                res.send('username or password not valid');
            }
        }
    } catch (error) {
        console.log(error);
        res.send('error');
    }
    
});


router.get('/logout' , (req , res)=>{
    req.session.destroy() ;
    res.redirect('/login')
})

module.exports = router;