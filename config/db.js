const mongoose = require('mongoose');
const mongo_url = process.env.MONGO_URL;

mongoose.connect(
    mongo_url,
    {useNewUrlParser: true}
)

let db = mongoose.connection;
db.once('open', ()=> console.log("database connection established"));
db.on('error', console.error.bind(console,'Database connection error'))
mongoose.set('useFindOneAndUpdate', false);