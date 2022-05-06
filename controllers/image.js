const Clarifai = require('clarifai');
const { handle } = require('express/lib/router');

const app = new Clarifai.App({
    apiKey: process.env.API_CLARIFAI
});

const handleApiCall = (req, res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('unable to API call'))
}
const handleImage = (req, res, pg) => {
    const { id } = req.body;

    pg('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0].entries);
        })
        .catch(err => res.status(400).json('unable to get entries'))


}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}