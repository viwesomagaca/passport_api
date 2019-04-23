const mongoose = require('mongoose');
const mongo_url = 'mongodb://viwesomagaca:viwesomagaca95@ds261155.mlab.com:61155/passport_api'

mongoose.connect(
    mongo_url,
    {useNewUrlParser: true}
)

let db = mongoose.connection;
db.once('open', ()=> console.log("database connection established"));
db.on('error', console.error.bind(console,'Database connection error'))
mongoose.set('useFindOneAndUpdate', false);