import mongoose from "mongoose";

const connectDB = async () => {
    if (mongoose.connections[0].readyState) {
        console.log("MongoDB already connected.");
        return;
    }
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("MongoDB Connected to Atlas!");
    } catch (err) {
        console.error("Error connecting to MongoDB Atlas:", err.message);
        throw err;
    }
};

const productSchema = new mongoose.Schema({
    username: { 
        type: String, required: true, unique: true
    },
    email: { 
        type: String, required: true, unique: true 
    },
    password: { 
        type: String, required: true 
    }
});

const collection=new mongoose.model("Data", productSchema);

export { connectDB, collection };
