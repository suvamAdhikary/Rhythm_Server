const express = require("express");

const router = express.Router();

const Song = require("../models/song.model");

const curdController = require("./crud.controller");

router.post("", curdController.post(Song));
router.get("", curdController.get(Song));
router.patch("/:id", curdController.updateOne(Song));
router.delete("/:id", curdController.deleteOne(Song));

router.get("/:id", async (req, res) => {
  try {
    const song = await Song.findById(req.params.id)
      .populate("genres")
      .populate("album")
      .populate("artists")
      .lean()
      .exec();

    return res.status(200).json(song);
  } catch (err) {
    return res.status(400).json({ ERR: err.message });
  }
});

module.exports = router;
