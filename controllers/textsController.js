const db = require("../models");

module.exports = {
    findOne: function (req, res) {
        db.Texts.findOne({where: {id: req.params.id, EventId: req.params.dateid}})
        .then(results => res.json(results))
        .catch(err => res.status(422).json(err))
    },
    create: function (req, res) {
        db.Texts.create(req.body)
        .then(results => res.json(results))
        .catch(err => res.status(422).json(err))
    },
    update: function (req, res) {
        db.Texts.update(req.body, {where: {id: req.params.id, EventId: req.params.dateid}})
        .then(results => res.json(results))
        .catch(err => res.status(422).json(err))
    },
    delete: function (req, res) {
        db.Texts.destroy({where: {id: req.params.id}})
        .then(results => res.json(results))
        .catch(err => res.status(422).json(err))
    }
}