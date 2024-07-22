const mongoose = require('mongoose')
// const mongoUrl="mongodb://localhost:27017/inotes"
const mongoUrl="mongodb+srv://ak47:random1234@cluster0.ebctdyz.mongodb.net/inotes?retryWrites=true&w=majority"
const connectToMongo= async()=>{
try{ await mongoose.connect(mongoUrl)
console.log("mongodb connencted successfully")}
catch(error){
    console.log("error in stablishing dbs connection "+error.message)
}
}

module.exports=connectToMongo