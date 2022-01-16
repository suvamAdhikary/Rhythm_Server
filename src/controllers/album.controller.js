const express = require("express");

const router = express.Router();

const Album = require("../models/album.model");

const curdController = require("./crud.controller");

router.post("", curdController.post(Album));
router.patch("/:id", curdController.updateOne(Album));
router.delete("/:id", curdController.deleteOne(Album));

router.get("", async (req, res) => {
  const page = +req.query.page || 1;
  const size = +req.query.limit || 5;
  const offset = (page - 1) * size;

  try {
    const data = await Album
                          .find({})
                          .skip(offset)
                          .limit(size)
                          .populate({
                            path: "artists",
                            select: "name profilePic"
                          })
                          .lean()
                          .exec();

    const pages = Math.ceil(
      (await Album.find({}).countDocuments().lean().exec()) / size
    );

    return res.status(200).send({ data, pages });
  } catch (err) {
    return res.status(400).send({ err });
  }
});

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

module.exports = router;
