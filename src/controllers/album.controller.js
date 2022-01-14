const express = require('express');

const router = express.Router();

const Album = require('../models/album.model');

const curdController = require('./crud.controller');

router.post('', curdController.post(Album));
router.get('', curdController.get(Album));
router.get('/:id', curdController.getOne(Album));
router.patch('/:id', curdController.updateOne(Album));
router.delete('/:id', curdController.deleteOne(Album));

module.exports = router;