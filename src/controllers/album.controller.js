const express = require("express");

const router = express.Router();

const Album = require("../models/album.model");

const curdController = require("./crud.controller");

router.post("", curdController.post(Album));
router.patch("/:id", curdController.updateOne(Album));
router.delete("/:id", curdController.deleteOne(Album));

// GET ALL ALBUMS

router.get("", async (req, res) => {
  let genres = req.query?.Genre;

  if (genres !== "" && genres !== undefined && genres !== null) {
    genres = genres.split("%0N");
  } else {
    genres = [];
  }
  let sort = req.query?.Sort;
  if (sort === "NTO") {
    sort = -1;
  } else if (sort === "OTN") {
    sort = 1;
  } else {
    sort = 0;
  }
  const page = +req.query.page || 1;
  const size = +req.query.limit || 5;
  const offset = (page - 1) * size;

  try {
    const data = await Album.find(
      genres.length > 0 ? { genres: { $in: genres } } : {}
    )
      .sort(sort && { year: sort })
      .skip(offset)
      .limit(size)
      .populate({
        path: "artists",
        select: "name profilePic",
      })
      .lean()
      .exec();

    const pages = Math.ceil(
      (await Album.find(genres.length > 0 ? { genres: { $in: genres } } : {})
        .sort(sort && { year: sort })
        .skip(offset)
        .limit(size)
        .countDocuments()
        .lean()
        .exec()) / size
    );

    return res.status(200).send({ data, pages });
  } catch (err) {
    return res.status(400).send({ err });
  }
});

// GET A ALBUM BY ID

router.get("/:id", async (req, res) => {
  try {
    const song = await Album.findById(req.params.id)
      .populate("genres")
      .populate("songs")
      .populate("artists")
      .lean()
      .exec();

    return res.status(200).json(song);
  } catch (err) {
    return res.status(400).json({ ERR: err.message });
  }
});

// DEBOUNCE

router.get("/api/search", async (req, res) => {
  try {
    let q = req.query.q;

    let key = new RegExp(q, "i");

    const albums = await Album.find({ name: { $regex: key } })
      .select("_id name")
      .lean()
      .exec();

    return res.status(200).json({ albums });
  } catch (err) {
    return res.status(400).json({ ERR: err.message });
  }
});

module.exports = router;
