const jwt = require('jsonwebtoken');

const { validationResult, check } = require('express-validator');

require('dotenv').config();

const Artist = require('../models/artist.model');

const { JWT_SECRET_KEY } = process.env;

const newToken = user => {
    return jwt.sign({user}, JWT_SECRET_KEY);
}

const artistLogin = async (req, res, next) => {

    const errors = validationResult(req);

    let finalErrors = null;

    if(!errors.isEmpty() & !check){
        finalErrors = errors.array().map(err => {
            return {
                param: err.param,
                msg: err.msg,
            };
        });
        return res.status(400).json({errors: finalErrors});
    };

    try{

        const artist = await Artist.findOne({email: req.body.email});

        if(!artist) return res
                            .status(401)
                            .json({
                                    status: "failed",
                                    message: "Your email or password does not match",
                                });

        const match = await artist.checkPassword(req.body.password);

        if(!match) return res
                            .status(401)
                            .json({
                                    status: "failed",
                                    message: "Your email or password does not match"
                                });

        const token = newToken(artist);

        return res.status(200).json({artist, token});

    }
    catch(err){

        return res
                .status(500)
                .json({message: err.message});
    };
};

module.exports = artistLogin;