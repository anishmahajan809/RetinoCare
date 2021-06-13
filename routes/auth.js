const user = require('../models/user')

async function authorize (req , res, next){

        if(req.session.userid){
            const data = await user.findOne({username : req.session.userid})
            if(!data){
                res.status(401).redirect('/login');
            }else{          
                next();   
                return;
            }
                
            }
    res.status(401).redirect('/login');
    
}
async function loginredirect (req , res){
        if(req.session.userid){ 
                return 1;
            }
            return 0;
    
}


module.exports.authorize = authorize;
module.exports.loginredirect = loginredirect;