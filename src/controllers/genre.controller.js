const express = require("express");

const router = express.Router();

const Genre = require("../models/genre.model");

const curdController = require("./crud.controller");

router.post("", curdController.post(Genre));
router.get("/:id", curdController.getOne(Genre));
router.patch("/:id", curdController.updateOne(Genre));
router.delete("/:id", curdController.deleteOne(Genre));

router.get("", async (req, res) => {
  try {
    const genres = await Genre.find().select("title").lean().exec();

    return res.status(200).json(genres);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

module.exports = router;
