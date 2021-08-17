const db = require("../models");
const SocialMedia = db.socialMedia;

exports.findById = (req, res) => {
    const id = req.query.id;

    SocialMedia.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "SocialMedia with id " + id + " not found " });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving SocialMedia with id= " + id });
        });
};