const { callsController } = require("../controllers");

module.exports = function (app) {
    app.get("/api/calls/upcoming", callsController.getUpcoming);
    app.post("/api/dates/:eventid/calls", callsController.create);
    app.route("/api/dates/:eventid/call/:callid")
        .put(callsController.update)
        .delete(callsController.delete)
}