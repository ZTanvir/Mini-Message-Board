const noticeRouter = require("express").Router();
const logger = require("../utils/logger");
const db = require("../models/noticeModel");

noticeRouter.get("/all", (req, res) => {
  db.serialize(() => {
    const getNotices = `SELECT * FROM "notices";`;

    db.all(getNotices, [], (err, row) => {
      if (err) {
        res.status(404).json({ error: "Error on getting notices" });
      }
      logger.info("row", row);
      res.status(200).json(row);
    });
  });
});
noticeRouter.get("/:noticeId", (req, res) => {});
noticeRouter.post("/new", (req, res) => {});
noticeRouter.put("/:noticeId", (req, res) => {});
noticeRouter.delete("/:noticeId", (req, res) => {});

// db.close((err) => {
//   err ? logger.info(err.message) : logger.error("Closed database connection");
// });

module.exports = noticeRouter;
