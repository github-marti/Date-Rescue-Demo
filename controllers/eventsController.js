const db = require("../models");
const shortid = require('shortid');

module.exports = {
    getAll: function (req, res) {
        db.Event.findAll({
            include: [
                { model: db.Call }
            ],
            where: {
                UserId: req.user.id
            },
            order: [
                ['event_date', 'ASC'],
                ['event_time', 'ASC']
            ]
        })
            .then(results => res.json(results))
            .catch(err => {
                console.log(err);
                res.send(err);
            })
    },
    getOne: function (req, res) {
        db.Event.findOne({
            where: {
                id: req.params.id, UserId: req.params.userid
            }
        })
            .then(results => res.json(results))
            .catch(err => res.status(422).json(err))
    },
    getByShortId: function (req, res) {
        db.Event.findOne({
            where: {
                shortid: req.params.shortid
            }
        })
            .then(results => {
                // get the createdAt date from the results
                let eventDate = Date.parse(`${results.dataValues.event_date.split('T')[0]}T${results.dataValues.event_time}`);

                // get the current time and set it to UTC time
                let currentDate = Date.parse(new Date());

                // compare the createdAt date and current time
                if (results.dataValues.active && eventDate + 43200000 > currentDate) {
                    res.send(results);
                } else {
                    res.send("This page is no longer active!")
                }
            })
            .catch(err => {
                console.log(err);
                res.send(err);
            })
    },
    create: function (req, res) {
        db.Event.create({
            event_date: req.body.event_date,
            event_time: req.body.event_time,
            event_name: req.body.event_name,
            event_location: req.body.event_location,
            event_note: req.body.event_note,
            event_date_picture: req.body.event_date_picture,
            shortid: shortid.generate(),
            createdAt: new Date(),
            updatedAt: new Date(),
            UserId: req.user.id
        })
            .then(results => res.json(results))
            .catch(err => {
                console.log(err);
                res.send(err);
            })
    },
    uploadImage: function (req, res) {
        if (req.file) {
            console.log("req.file detected");
            let filename = req.file.filename;
            db.Event.update({ event_date_picture: `/images/${filename}` }, { where: { id: req.params.id } })
                .then(() => res.send(`/images/${filename}`))
                .catch(err => {
                    console.log(err);
                    res.send(err);
                })
        } else {
            res.send("File was not uploaded.")
        }
    },
    update: function (req, res) {
        db.Event.update(req.body, { where: { id: req.params.id } })
            .then(results => res.json(results))
            .catch(err => {
                console.log(err);
                res.send(err);
            })
    },
    cancel: function (req, res) {
        db.Event.update({ shortid: shortid.generate(), active: false }, { where: { id: req.params.id } })
            .then(results => res.json(results))
            .catch(err => {
                console.log(err);
                res.send(err);
            })
    },
    delete: function (req, res) {
        db.Event.destroy({ where: { id: req.params.id } })
            .then(results => res.json(results))
            .catch(err => {
                console.log(err);
                res.send(err);
            })
    }
}