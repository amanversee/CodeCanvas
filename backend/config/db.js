const mongoose = require('mongoose');

const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log("MongoDB connected"))
        .catch(err => {
            console.error("CRITICAL: MongoDB Connection Error ❌");
            console.error("Error Message:", err.message);
            if (err.name === 'MongooseServerSelectionError') {
                console.error("⚠️ WARNING: MongoDB connection failed. Database features will be unavailable.");
                console.error("Check if your IP address is whitelisted on MongoDB Atlas.");
            }
        });
};

module.exports = connectDB;
