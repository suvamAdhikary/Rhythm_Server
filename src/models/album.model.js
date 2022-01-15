const mongoose = require("mongoose");

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

const albumSchema = mongoose.Schema(
  {
    name: StrT,
    artists: [{ type: mongoose.Schema.Types.ObjectId, ref: "artist" }],
    genres: [{ type: mongoose.Schema.Types.ObjectId, ref: "genre" }],
    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: "song" }],
    coverPic: StrF,
    photos: [StrF],
    year: NumT,
    date: StrF,
    languages: [StrF],
    noOfSong: { ...NumT, default: 0 },
    lyricists: [StrF],
    audios: [StrF],
    videos: [StrF],
    composers: [StrF],
    info: StrF,
    wiki: StrF,
    links: [StrF],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Album = mongoose.model("album", albumSchema);

module.exports = Album;