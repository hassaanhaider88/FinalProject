import mongoose from "mongoose";

async function ConnectToDB() {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/LMS`);
        console.log("DB is connected ✔");
    } catch (error) { 
        console.error("❌ Error connecting to DB:", error.message);
        process.exit(1);
    }
}
 
export default ConnectToDB
