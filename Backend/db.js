const mongoose = require('mongoose');

const connectDB = async()=>{
    try {
        const URL = process.env.DB_URL;
        const conn = await mongoose.connect(`${URL}/todo-practise`);
        if(conn) console.log("MongoDB Connected...");

    } catch (error) {
        console.error("MongoDB connection error",error.message);
    }
}

const todoSchema = new  mongoose.Schema({
    title: { type : String , required : true },
    description : {type :String},
    completed : {type : Boolean, default : false}
});




module.exports = {
    Todo : mongoose.model("Todos",todoSchema),
    connectDB

};