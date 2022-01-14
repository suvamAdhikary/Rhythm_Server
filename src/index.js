const express = require('express');

const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

const genreController = require('./controllers/genre.controller');
const artistController = require('./controllers/artist.controller');
const songController = require('./controllers/song.controller');
const albumController = require('./controllers/album.controller');

app.use('/genres', genreController);
app.use('/artists', artistController);
app.use('/songs', songController);
app.use('/albums', albumController);

app.get('/', async (req, res) => {

    try {

        res.status(200).send('Welcome to Rhythm');

    } catch (err) {

        res.status(400).send(err);
    }
})


module.exports = app;