const multer = require('multer')
const uuid = require('uuid').v4;
var unique_id = ''

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
        console.log(unique_id)
      cb(null, `${unique_id}-${file.originalname}`);
    }
  });

var upload = multer({ storage: storage });


module.exports.upload = upload
module.exports.unique_id = this.unique_id;
