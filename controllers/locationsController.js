const db = require("../models");

module.exports = {
    
    findAll: function(req, res) {
        db.Location.findAll({})
        //   .sort({ ascend: 1 })
          .then(results => res.json(results))
          .catch(err => res.status(422).json(err));
      },
    filter: function (req, res) {
        db.Location.find({
            where: {
                id: req.params.id, 
                location_city: req.body.location_city
            }
        })
        .then(results => res.json(results))
        .catch(err => res.status(422).json(err))
    },
    create: function (req, res) {
        db.Location.create({
            location_name: req.body.location_name,
            location_address: req.body.location_address,
            location_city: req.body.location_city,
            location_state: req.body.location_state,
            location_zip: req.body.location_zip,
            angel_shot: req.body.angel_shot,
            location_like: req.body.location_like,
            location_dislike: req.body.location_dislike
        })
        .then(results => res.json(results))
        .catch(err => res.status(422).send(err))
    },
    updatelike: function (req, res) {
        db.Location.update({location_like:req.body.likes+1},
            {where: {
                id: req.params.id
            }
        })
        .then(results => res.json(results))
        .catch(err => res.status(422).send(err))
    },
    updatedislike: function (req, res) {
        db.Location.update({location_dislike:req.body.dislikes+1},
            {where: {
                id: req.params.id
            }
        })
        .then(results => res.json(results))
        .catch(err => res.status(422).send(err))
    }     
};
