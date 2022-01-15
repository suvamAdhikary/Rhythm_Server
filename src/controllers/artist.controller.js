const express = require("express");

const router = express.Router();

const Artist = require("../models/artist.model");

const curdController = require("./crud.controller");

router.post("", curdController.post(Artist));
router.get("", curdController.get(Artist));
router.patch("/:id", curdController.updateOne(Artist));
router.delete("/:id", curdController.deleteOne(Artist));

router.get("/:id", async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id)
      .populate({
        path: "genres",
        select: "title",
      })
      .populate({
        path: "albums",
      })
      .populate({
        path: "songs",
      })
      .lean()
      .exec();


    return res.status(200).json(artist);
  } catch (err) {
    return res.status(400).json({ ERRR: err.message });
  }
});

module.exports = router;