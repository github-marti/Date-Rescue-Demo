const db = require("../../models");
const { updateTimer } = require("../calls");
const shortid = require("shortid");

// middleware for comparing any new scheduled calls with the most recent upcoming call in the database
module.exports = function () {
    return function (req, res, next) {
        if (req.body && req.body.call_time) {
            req.shortid = shortid.generate();

            // find the upcoming call from the database
            db.Call.findOne({
                include: [
                    {
                        model: db.Event,
                        attributes: ['event_date'],
                    }
                ],
                order: [
                    ['call_time', 'ASC']
                ]
            })
                .then(results => {
                    const newCall = Date.parse(new Date(`${req.body.event_date}T${req.body.call_time}:00.000`));
                    const phoneNumber = req.user.phoneNumber;

                    // if an upcoming call was found, compare the upcoming call time with the newly saved call time
                    if (results) {
                        const upcomingCall = Date.parse(new Date(`${results.Event.event_date.split('T')[0]}T${results.call_time}:00.000`));
                        const callType = results.call_type;

                        // if the new call is sooner in the future than the upcoming call, update the server-side timer to the new call
                        if (newCall < upcomingCall) {
                            updateTimer(newCall, req.shortid, call_type, phoneNumber);
                        }
                    
                    // if there are no upcoming calls, update the server-side time to the new call
                    } else {
                        updateTimer(newCall, req.shortid, req.body.call_type, phoneNumber);
                    }
                });
        };
        next();
    };
};