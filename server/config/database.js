const mongoose = require('mongoose');
const { environments } = require('../utils/consts');
const { logMessages, exitCodes } = require('./configConsts');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`${logMessages.mongoConnected} ${conn.connection.host}`);
        
        return conn;
    } catch (err) {
        console.error(`${logMessages.mongoError} ${err.message}`);
        
        // Don't exit process in production/serverless environment
        if (process.env.NODE_ENV === environments.development) {
            process.exit(exitCodes.failure);
        }
        
        throw err;
    }
};

module.exports = connectDB;
