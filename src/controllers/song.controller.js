const express = require('express');

const router = express.Router();

const Songs = require('../models/song.model');

const curdController = require('./crud.controller');

router.post('', curdController.post(Songs));
router.get('', curdController.get(Songs));
router.get('/:id', curdController.getOne(Songs));
router.patch('/:id', curdController.updateOne(Songs));
router.delete('/:id', curdController.deleteOne(Songs));

module.exports = router;