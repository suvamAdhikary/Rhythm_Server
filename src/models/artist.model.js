const mongoose = require("mongoose");

const bcryptjs = require("bcryptjs");

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

const artistSchema = mongoose.Schema(
  {
    name: StrT,
    email: {...StrT, unique: true},
    password: StrT,
    about: StrF,
    logo: StrF,
    profilePic: StrF,
    coverPic: StrF,
    photos: [StrF],
    genres: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "genre",
      },
    ],
    albums: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "album",
      },
    ],
    songs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "song",
      },
    ],
    awards: [StrF],
    wiki: StrF,
    web: StrF,
    birth: StrF,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

artistSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();

  const hash = bcryptjs.hashSync(this.password, 8);

  this.password = hash;

  return next();
});


artistSchema.methods.checkPassword = function (password) {
  const match = bcryptjs.compareSync(password, this.password);

  return match;
};


const Artist = mongoose.model("artist", artistSchema);

module.exports = Artist;
