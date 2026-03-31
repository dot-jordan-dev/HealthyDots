const mongoose = require("mongoose");
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.URL_DB);
        console.log(" Connected to MongoDB Atlas successfully");
    } catch (err) {
              console.error(" Database connection error:", err.message);
     
    }
};

module.exports = connectDB;


