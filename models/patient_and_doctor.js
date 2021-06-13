const mongoose = require('mongoose');

var patient_detail = new mongoose.Schema ({
    name:{
        type:String,
        required : true
    },
    age:{
        type:Number,
        required:true
    },
    bg:{
        type : String,
        required : true
    },
    image_name: String,
    pid : String,
    class : {
        type : Number,
        default : 10
    }

});
const schema = new mongoose.Schema({
    name:{
        type:String,
        required : true
    },

    patients: [ patient_detail ]
});

const patients = mongoose.model('movie' , schema);

module.exports.patients = patients;
module.exports.patient_detail = patient_detail;
// module.exports = schema;