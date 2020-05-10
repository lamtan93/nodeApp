const mongoose = require('mongoose');

const connectDb = async ()=>{
    let uri = 'mongodb://lamtan:lamtan@localhost:27018/mongoex';
    let options = {
        connectTimeoutMS: 10000,
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    }
    try {
        await mongoose.connect(uri,options);
        console.log(`connexion success à la database`);
    } catch (error) {
        console.log(`erreur de connexion à la database`);
    }
};

connectDb();
module.exports = {mongoose};