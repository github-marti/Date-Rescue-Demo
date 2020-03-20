const { eventsController } = require("../controllers");
const shortid = require('shortid');
const mime = require('mime');
const multer = require('multer');
const appRoot = require('app-root-path');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, appRoot + '/client/images')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + shortid.generate() + '.' + mime.getExtension(file.mimetype))
  }
});
const upload = multer({ storage: storage });
const path = require('path');

module.exports = function (app) {
  app.get("/api/users/:userid/events", eventsController.getAll);
  app.get("/api/users/:userid/events/:id", eventsController.getOne);
  app.get("/api/events/:shortid", eventsController.getByShortId);
  app.post("/api/events", eventsController.create);
  app.post("/api/events/:id/images/upload", upload.single('image'), eventsController.uploadImage);
  app.put("/api/events/:id", eventsController.update);
  app.put("/api/events/cancel/:id", eventsController.cancel);
  app.delete("/api/events/:id", eventsController.delete);
}