import mongoose from "mongoose"

async function ConnectDB() {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Mongo DB has connected ${connectionInstance.connection.host}`);
        
    } catch (error) {
        console.log(`ERROR has occured while connecting to the DataBase`, error)
    }

}

export default ConnectDB;