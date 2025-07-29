import mongoose from "mongoose";

const connectChat = async () => {
    if (mongoose.connections[0].readyState) {
        console.log("Chats Loaded");
        return;
    }
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("Chats Loaded");
    } catch (err) {
        console.error("Error connecting to MongoDB Atlas:", err.message);
        throw err;
    }
};

const productSchema = new mongoose.Schema({
    userMessage: {
        type: String, required: true
    },
    botMessage: { 
        type: String, required: true 
    },
    timestamp: {
        type: Date
    }
});

const chatCollection=new mongoose.model("Chats", productSchema);

export { connectChat, chatCollection };
