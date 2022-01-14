const express = require('express');

const router = express.Router();

const Genre = require('../models/genre.model');

const curdController = require('./crud.controller');

router.post('', curdController.post(Genre));
router.get('', curdController.get(Genre));
router.get('/:id', curdController.getOne(Genre));
router.patch('/:id', curdController.updateOne(Genre));
router.delete('/:id', curdController.deleteOne(Genre));

module.exports = router;