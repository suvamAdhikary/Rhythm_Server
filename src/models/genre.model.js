const mongoose = require("mongoose");

const StrT = {
  type: String,
  required: true,
};

const StrF = {
  type: String,
  required: false,
};

const genreSchema = mongoose.Schema(
  {
    title: StrT,
    logo: StrF,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Genre = mongoose.model("genre", genreSchema);

module.exports = Genre;
