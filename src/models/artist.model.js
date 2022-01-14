const mongoose = require('mongoose');

const StrT = {
    type: String,
    required: true,
};

const StrF = {
    type: String,
    required: false,
};

const NumT = {
    type: Number,
    required: true,
};

const NumF = {
    type: Number,
    required: false,
};

const artistSchema = mongoose.Schema({
    name: StrT,
    email: StrT,
    password: StrT,
    about: StrF,
    genres: [{type: mongoose.Schema.Types.ObjectId, ref: 'genre', required: true}],
    albums: [{type: mongoose.Schema.Types.ObjectId, ref: 'album'}],
    songs: [{type: mongoose.Schema.Types.ObjectId, ref: 'songs'}],
    awards: [StrF],
    wiki: StrF,
    web: StrF,
    birth: StrF
}, {
    versionKey: false,
    timestamps: true,
});

const Artist = mongoose.model('artist', artistSchema);

module.exports = Artist;