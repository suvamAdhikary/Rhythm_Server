const express = require("express");

const router = express.Router();

const Album = require("../models/album.model");

const curdController = require("./crud.controller");

router.post("", curdController.post(Album));
router.get("", curdController.get(Album));
router.patch("/:id", curdController.updateOne(Album));
router.delete("/:id", curdController.deleteOne(Album));

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