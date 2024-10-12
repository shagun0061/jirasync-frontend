import mongoose from "mongoose";

export async function connect(){
try {
    mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;

    connection.on('connect',()=>{
        console.log('MongoDB connected sucessfully 😍✌️');
    })

    connection.on('error',(err)=>{
        console.log('Please make sure MogoDB is Running 😒😒', err);
        process.exit(); 
    })
} catch (error) {
    console.log('something wrong😔', error)
}
}