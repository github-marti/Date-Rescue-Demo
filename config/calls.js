const db = require("../models");
const accountSid = "AC7a88ff772388157d0ffe6319140b678b";
const authToken = process.env.TWILIO_KEY;
const client = require("twilio")(accountSid, authToken);

// callTimeout made accessible in module scope to clearTimeout
let callTimeout;

const getUpcoming = () => {
  db.Call.findOne({
    include: [
      {
        model: db.Event,
        attributes: ["event_date"],
        include: [
          {
            model: db.User,
            attributes: ["phoneNumber"]
          }
        ]
      }
    ],
    order: [["call_time", "ASC"]]
  })
    .then(results => {
      if (results) {
        const upcomingCall = Date.parse(
          `${results.Event.event_date.split("T")[0]}T${
            results.call_time
          }:00.000`
        );
        const currentTime = Date.parse(new Date());
        const callID = results.shortid;
        const callType = results.calltype;
        const phoneNumber = results.Event.User.phoneNumber;

        // in case of a server interruption, proceed to make calls if it is within 15 minutes scheduled time
        if (upcomingCall - currentTime > -900000) {
          startTimer(upcomingCall, callID, callType, phoneNumber);
        }
      } else {
        console.log("no upcoming calls");
      }
    })
    .catch(err => {
      console.log(err);
    });
};

const makeCall = (callType, phoneNumber) => {

  // change the type of call made based on the user's choice on event creation
  if (callType === "Best Friend Breakup") {
    client.calls
      .create({
        url:
          "https://handler.twilio.com/twiml/EH6a3dcba4b4d91fdfb9c9c2752d90da77",
        to: `+1${phoneNumber}`,
        from: "+19088420029"
      })
      .then(call => console.log(call.sid))
      .catch(err => console.log(err));

  } else if (callType === "Family Emergency") {
    client.calls
      .create({
        url:
          "https://handler.twilio.com/twiml/EH1699dedbdae8cdda05de2245e82af5e4",
        to: `+1${phoneNumber}`,
        from: "+19088420029"
      })
      .then(call => console.log(call.sid))
      .catch(err => console.log(err));
  }
};

const startTimer = (upcomingCall, callID, callType, phoneNumber) => {
  const currentTime = Date.parse(new Date());

  // milliseconds between the current time and the upcoming call
  const delta = upcomingCall - currentTime;

  // at the end of the time out, use Twilio to make the call
  callTimeout = setTimeout(() => {
    makeCall(callType, phoneNumber);

    // delete the db entry after call is made
    db.Call.destroy({
      where: {
        shortid: callID
      }
    });

    // get next call
    getUpcoming();
  }, delta);
};

// update timer function: clears timeout and starts new timer
const updateTimer = (newCall, callID, callType, phoneNumber) => {
  clearTimeout(callTimeout);
  startTimer(newCall, callID, callType, phoneNumber);
};

module.exports = { getUpcoming, startTimer, updateTimer };
