const db = require("../models");
const accountSid = 'AC7a88ff772388157d0ffe6319140b678b';
const authToken = process.env.TWILIO_KEY;
const client = require('twilio')(accountSid, authToken);

module.exports = {
    getUpcoming: function (req, res) {
        db.Call.findAll({
            order: [
                ['scheduled_time', 'ASC']
            ]
        })
            .then(results => console.log(results))
    },
    makeCall: function (req, res) {
        client.calls
            .create({
                url: 'http://demo.twilio.com/docs/voice.xml',
                to: `+${req.params.phonenumber}`,
                from: '+19088420029'
            })
            .then(call => console.log(call.sid))
            .catch(err => console.log(err));
    },
    findOne: function (req, res) {
        db.Call.findOne({ where: { id: req.params.id, EventId: req.params.dateid } })
            .then(results => res.json(results))
            .catch(err => {
                console.log(err);
                res.send(err);
            })
    },
    create: function (req, res) {
        db.Call.create({
            call_time: req.body.call_time,
            call_type: req.body.call_type,
            shortid: req.shortid,
            EventId: req.params.eventid
        })
            .then(results => res.json(results))
            .catch(err => {
                console.log(err);
                res.send(err);
            })
    },
    update: function (req, res) {
        db.Call.update({
            call_time: req.body.call_time,
            call_type: req.body.call_type,
            shortid: req.shortid
        },
            { where: { id: req.params.callid, EventId: req.params.eventid } })
            .then(results => res.json(results))
            .catch(err => {
                console.log(err);
                res.send(err);
            })
    },
    delete: function (req, res) {
        db.Call.destroy({ where: { id: req.params.callid, EventId: req.params.eventid } })
            .then(results => res.json(results))
            .catch(err => {
                console.log(err);
                res.send(err);
            })
    }
}