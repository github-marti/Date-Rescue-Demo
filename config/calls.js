const db = require('../models');
const accountSid = 'AC7a88ff772388157d0ffe6319140b678b';
const authToken = process.env.TWILIO_KEY;
const client = require('twilio')(accountSid, authToken);

// callTimeout made accessible in module scope to clearTimeout
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
                const upcomingCall = Date.parse(`${results.Event.event_date.split('T')[0]}T${results.call_time}:00.000`);
                console.log('UPCOMING CALL', upcomingCall);
                const currentTime = Date.parse(new Date());
                const callid = results.shortid;
                const phoneNumber = results.Event.User.phoneNumber;

                // in case of a server interruption, proceed to make calls if it is within 15 minutes scheduled time
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
    const currentTime = Date.parse(new Date());

    // milliseconds between the current time and the upcoming call
    const delta = upcomingCall - currentTime;

    // at the end of the time out, use Twilio to make the call
    callTimeout = setTimeout(() => {
        client.calls
            .create({
                url: 'http://demo.twilio.com/docs/voice.xml',
                to: `+1${phoneNumber}`,
                from: '+19088420029'
            })
            .then(call => console.log(call.sid))
            .catch(err => console.log(err));

        // delete the db entry after call is made
        db.Call.destroy({
            where: {
                shortid: callid
            }
        });

        // get next call
        getUpcoming();
    }, delta);
};

// update timer function: clears timeout and starts new timer
const updateTimer = (newCall, callid, phoneNumber) => {
    clearTimeout(callTimeout);
    startTimer(newCall, callid, phoneNumber);
};

module.exports = { getUpcoming, startTimer, updateTimer };