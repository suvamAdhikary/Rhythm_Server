const mongoose = require('mongoose');

const StrT = {
    type: String,
    required: true,
};

const genreSchema = mongoose.Schema({
    title: StrT,
},{
    versionKey: false,
    timestamps: true,
});

const Genre = mongoose.model('genre', genreSchema);

module.exports = Genre;