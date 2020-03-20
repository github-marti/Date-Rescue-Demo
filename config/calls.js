const db = require('../models');
const accountSid = 'AC7a88ff772388157d0ffe6319140b678b';
const authToken = process.env.TWILIO_KEY;
const client = require('twilio')(accountSid, authToken);

let callTimeout;

const getUpcoming = () => {
    db.Call.findOne({
        include: [
            {
                model: db.Event,
                attributes: ['event_date'],
                include: [
                    {
                        model: db.User,
                        attributes: ['phoneNumber']
                    }
                ]
            }
        ],
        order: [
            ['call_time', 'ASC']
        ]
    })
        .then(results => {
            if (results) {
                let upcomingCall = Date.parse(`${results.Event.event_date.split('T')[0]}T${results.call_time}:00.000`);
                let currentTime = Date.parse(new Date());
                let callid = results.shortid;
                console.log("shortid in getupcoming", callid);
                let phoneNumber = results.Event.User.phoneNumber;
                if (upcomingCall - currentTime > -900000) {
                    startTimer(upcomingCall, callid, phoneNumber);
                };
            } else {
                console.log('no upcoming calls');
            }
        })
        .catch(err => {
            console.log(err);
        });
};

const startTimer = (upcomingCall, callid, phoneNumber) => {
    console.log("STARTING TIMER!!!\n\n")
    console.log("shortid in startTimer", callid);
    let currentTime = Date.parse(new Date());
    let delta = upcomingCall - currentTime;
    console.log('upcomingCall', upcomingCall, 'currentTime', currentTime);
    console.log("DELTA", delta);
    callTimeout = setTimeout(() => {
        client.calls
            .create({
                url: 'http://demo.twilio.com/docs/voice.xml',
                to: `+1${phoneNumber}`,
                from: '+19088420029'
            })
            .then(call => console.log(call.sid))
            .catch(err => console.log(err));
        db.Call.destroy({
            where: {
                shortid: callid
            }
        });
        getUpcoming();
    }, delta);
};

const updateTimer = (newCall, callid, phoneNumber) => {
    clearTimeout(callTimeout);
    startTimer(newCall, callid, phoneNumber);
};

module.exports = { getUpcoming, startTimer, updateTimer };