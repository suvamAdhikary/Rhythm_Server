const express = require('express');

const router = express.Router();

const Artist = require('../models/artist.model');

const curdController = require('./crud.controller');

router.post('', curdController.post(Artist));
router.get('', curdController.get(Artist));
router.get('/:id', curdController.getOne(Artist));
router.patch('/:id', curdController.updateOne(Artist));
router.delete('/:id', curdController.deleteOne(Artist));

module.exports = router;