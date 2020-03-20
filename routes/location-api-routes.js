const { locationsController } = require("../controllers");

module.exports = function(app) {
    app.get("/api/locations/all", locationsController.findAll);
    app.post("/api/locations", locationsController.create);
    app.put("/api/locations/addlike/:id", locationsController.updatelike);
    app.put("/api/locations/adddislike/:id", locationsController.updatedislike);

}