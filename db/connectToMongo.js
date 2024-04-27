import mongoose from 'mongoose'

const connectToMongoDB=async()=>{

    try{
        console.log("Before Connection to mongo");
        await mongoose.connect(process.env.MONGO_URI,{ 
            dbName: 'chatApp'
                  });
        console.log("Connected with MongoDB");
    }
    catch(error){
        console.log("Error in connection with MongoDB error message: "+error.message);
    }

}

export default connectToMongoDB;