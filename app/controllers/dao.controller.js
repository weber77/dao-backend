const db = require("../models");
const Dao = db.dao;
const SocialMedia = db.socialMedia;

exports.create = (req, res) => {

    // Create a Dao
    const dao = new Dao({

        full_name: req.body.full_name,
        description: req.body.description,
        date_founded: new Date(req.body.date_founded),
        date_created: new Date(req.body.date_created),
        logo_link: req.body.logo_link,
        category: req.body.category,
        governance_token_name: req.body.governance_token_name,
        governance_token_symbol: req.body.governance_token_symbol,
        dao_structure: req.body.dao_structure,
        voting_process: req.body.voting_process,
        TVL: req.body.TVL,
        tech_stack: req.body.tech_stack,
        notes: req.body.notes,
        blockchain: req.body.blockchain,
        headquarters: req.body.headquarters,
        numTwitterFollowers:req.body.numTwitterFollowers,
        AUM: req.body.AUM,
    });

    const social_media = new SocialMedia({
        twitter_handle: "req.body.social_media.twitter_handle",
        github_organization_handle: "req.body.social_media.github_organization_handle",
        telegram_handle: "req.body.social_media.telegram_handle",
        linkedin_company_name: "req.body.social_media.linkedin_company_name",
        discord_link: "req.body.social_media.discord_link",
    })

    dao
        .save()
        .then(data => {
            social_media.save()
                .then(socialData => {
                    data.social_media.push(socialData);
                    data.save()
                    res.send(data);
                })
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the dao."
            });
        });

};

exports.findAll = (req, res) => {
    const name = req.query.type;
    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

    Dao.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving lodge."
            });
        });
};

exports.findById = (req, res) => {
    const id = req.query.id;

    Dao.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Dao with id " + id + " not found " });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Dao with id= " + id });
        });
};

// Update a Dao by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }



    const id = req.query.id;
    Dao.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Dao with id=${id} was not found!`
                });
            } else res.send({ message: "Dao was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Dao with id=" + id
            });
        });
};

exports.addSocialMedia = (req, res) => {
    
    const social_media = new SocialMedia({
        twitter_handle: req.body.twitter_handle,
        github_organization_handle: req.body.github_organization_handle,
        telegram_handle: req.body.telegram_handle,
        linkedin_company_name: req.body.linkedin_company_name,
        discord_link: req.body.discord_link,
    })



    const id = req.query.id;
    Dao.findById(req.query.id)
        .then(data => {
            if(!data)
            res.status(404).send({ message: "Dao with id " + id + " not found " });
            else{
                social_media.save()
                .then(socialData => {
                    data.social_media.push(socialData);
                    data.save()
                    res.send(data);
                })
            }
        });
};

exports.delete = (req, res) => {
    const id = req.query.id;
    console.log(id);
  
    Dao.findByIdAndRemove(id, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Dao with id=${id}. Maybe Dao was not found!`
          });
        } else {
          res.send({
            message: "Dao was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Dao with id=" + id
        });
      });
  };
  