const { model } = require("mongoose");



const post = (model) => async (req, res) => {

    try {

        const data = await model.create(req.body);

        return res.status(201).send({data});

    } catch (err) {

        return res.status(400).send({err});
    }    
}

const get = (model) => async (req, res) => {

    const page = +req.query.page || 1;
    const size = +req.query.limit || 5;
    const offset = (page - 1) * size;

    try {

        const data = await model.find({}).skip(offset).limit(size).lean().exec();

        const pages = Math.ceil((
            await model.find({}).countDocuments().lean().exec()
        )/ size);

        return res.status(200).send({data, pages})

    } catch (err) {

        return res.status(400).send({err});
    }
}

const getOne = (model) => async (req, res) => {

    try {

        const data = await model.findById(req.params.id).lean().exec();

        return res.status(200).send({data});

    } catch (err) {

        return res.status(400).send({err});
    }
}

const updateOne = (model) => async (req, res) => {

    try {

        const data = await model.findByIdAndUpdate(req.params.id, req.body, {new: true});

        return res.status(201).send({data});

    } catch (err) {

        return res.status(400).send({err});
    }
}

const deleteOne = (model) => async (req, res) => {

    try {

        const data = await model.findByIdAndDelete(req.params.id);

        return res.status(200).send({data});

    } catch (err) {

        return res.status(400).send({err});
    }
}



module.exports = {
    post,
    get,
    getOne,
    updateOne,
    deleteOne
}