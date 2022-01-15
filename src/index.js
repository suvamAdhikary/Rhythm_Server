const express = require('express');

const cors = require('cors');

const app = express();

const { body } = require('express-validator');

app.use(cors());

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

const genreController = require('./controllers/genre.controller');
const artistController = require('./controllers/artist.controller');
const songController = require('./controllers/song.controller');
const albumController = require('./controllers/album.controller');
const artistLogin = require('./controllers/auth.controller');

app.use('/genres', genreController);
app.use('/artists', artistController);
app.use('/songs', songController);
app.use('/albums', albumController);

app.post('/login',
            body('email').isEmail().withMessage('Email is required and should be a valid email address'),
            body('email').custom(val => {
                if(val.indexOf('@rhythm.com') === -1)
                    return Promise.reject('Restricted to verified artist only');
            }),
            body('password').isStrongPassword().withMessage('Password is required and should be a valid password'),
            artistLogin
        );

app.get('/', async (req, res) => {

    try {

        res.status(200).send('Welcome to Rhythm');

    } catch (err) {

        res.status(400).send(err);
    }
})


module.exports = app;