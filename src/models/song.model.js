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

const songSchema = mongoose.Schema({
    name: StrT,
    genres: [{type: mongoose.Schema.Types.ObjectId, ref: 'genre'}],
    album: {type: mongoose.Schema.Types.ObjectId, ref: 'album'},
    released: NumF,
    date: StrF,
    languages: [StrF],
    duration: StrT,
    lyricist: StrF,
    lyric: StrF,
    audios: [StrF],
    videos: [StrF],
    composers: [StrF],
    info: StrF,
    wiki: StrF,
    links: [StrF],
}, {
    versionKey: false,
    timestamps: true,
})

const Song = mongoose.model('song', songSchema);

module.exports = Song;