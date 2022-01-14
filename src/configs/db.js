const mongoose = require("mongoose");

require('dotenv').config();

const { DB_PASS } = process.env;

module.exports = () => {
    return mongoose.connect(`mongodb+srv://masaiRhythm:${DB_PASS}@rhythmdb.vuf1d.mongodb.net/rhythm?retryWrites=true&w=majority`);
};