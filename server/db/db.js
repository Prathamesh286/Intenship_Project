import mongoose from "mongoose";

const connectToMongoDB = async ()=>{
    try{
        await mongoose.connect("mongodb://localhost:27017/gym_app",
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                serverSelectionTimeoutMS: 5000
            }
        );
        console.log("Connected to MongoDB")

    }catch(error){
        console.log("Error connecting to MongoDB",error.message)
        throw new Error("MongoDB connection failed: " + error.message)

    }
}

export default connectToMongoDB;