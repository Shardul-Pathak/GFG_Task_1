import mongoose from "mongoose";

const connectTitle = async () => {
    if (mongoose.connections[0].readyState) {
        console.log("Titles Loaded");
        return;
    }
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("Titles Loaded");
    } catch (err) {
        console.error("Error connecting to MongoDB Atlas:", err.message);
        throw err;
    }
};

const titleSchema = new mongoose.Schema({
    title: {
        type: String, required: true
    },
    timestamp: {
        type: Date
    }
});

const titleCollection=new mongoose.model("Titles", titleSchema);

export { connectTitle, titleCollection };
