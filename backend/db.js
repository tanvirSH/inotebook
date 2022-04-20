const mongoose = require('mongoose');
const mongooseURI = 'mongodb://localhost:27017';

const connectToMongo = (req, res) =>{
    mongoose.connect(mongooseURI, () =>{
        console.log('COnnection success');
    })   
}

module.exports = connectToMongo;