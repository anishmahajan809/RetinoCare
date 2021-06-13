const mongoose = require('mongoose');
const validator = require('validator')

const userSchema = mongoose.Schema({
    username : {
        type:String,
        required : true,
        unique : true,
        trim:true,
        lowercase : true
    },
    name : {
        type:String,
        required : true,
        trim:true,
        lowercase : true
    },
    phno : {
        type : Number,
        // required : true,
        // unique : true,
    },
    email : {
        type: String,
        default : 'anish@spec.com',
        trim:true,
        lowercase : true
        // required : true,
    },
    address : {
        type : String,
        // default : 'Not provided'
    },
    dob : {
        type : Date,
        default : Date.now
    },
    pass : {
        type:String,
        required : true,
        trim : true
    }
});

const user = mongoose.model('user' , userSchema);
module.exports = user;
// module.exports.userSchema = userSchema;




















// validate(value) { 
//     if(!validator.isMobilePhone(str)){
//         throw new Error('phone number is not valid');
//     }
// }