//connecting to moongoose
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/doctor', {useNewUrlParser: true, useUnifiedTopology: true })
.then(data => {
    console.log("connected to the database");
})
.catch(err => {
    console.log('not able to connect to databbase');
    console.log(err);
});

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
