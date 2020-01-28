const Clarifai = require("clarifai");

const app = new Clarifai.App({
    apiKey: "983d0ea134f940b8b2e1984d59dd010e"
   });
  
const handleApiCall = (req, res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json("unable to work with API"))
}

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db("users").where('id', '=', id)
    .increment("entires", 1)
    .returning("entires")
    .then(entires => {
        res.json(entires[0]);
    })
    .catch(err => res.status(400).json("unable to get entires"))
}

module.exports = {
    handleImage,
    handleApiCall
}