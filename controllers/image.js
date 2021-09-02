const Clarifai = require ('clarifai');
const app = new Clarifai.App({
    apiKey: 'e668897b9ee94e1dbb6b82bbb7771ffd'
  });
const handleApiCall = (req, res)=>{
    app.models
    .predict(
      Clarifai.FACE_DETECT_MODEL,
      req.body.input).then(image=> {
          res.json(image)
      }).catch(err=> {
          res.status(400).json("unable to connect to internet")
      })
}
const handleImage = (req, res, db) => {
    const { id } = req.body
    db('users')
        .where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0])
        })
        .catch(err => res.status(400).res.json('no entries'))
}
module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}