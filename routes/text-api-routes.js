const { textsController } = require("../controllers");

module.exports = function (app) {
    app.post("/api/dates/:dateid/texts", textsController.create);
    app.route("/api/dates/:dateid/texts/:id")
        .get(textsController.findOne)
        .put(textsController.update)
        .delete(textsController.delete)
}