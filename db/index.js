require('dotenv').config();

const mongoose = require('mongoose');

const dbConnect = async () => {
    try {
        await mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`);
        console.log("DB connected successfully");
    } catch (error) {
        console.error("DB connection failed:", error);
    }
};

module.exports = dbConnect;
