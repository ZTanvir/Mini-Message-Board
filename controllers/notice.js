const noticeRouter = require("express").Router();
const logger = require("../utils/logger");
const db = require("../models/noticeModel");

noticeRouter.get("/all", (req, res) => {
  db.serialize(() => {
    const getNotices = `SELECT * FROM "notices";`;

    db.all(getNotices, [], (err, row) => {
      if (err) {
        res.status(404).end();
      }
      res.status(200).json(row);
    });
  });
});
noticeRouter.get("/:noticeId", (req, res) => {
  const query = `SELECT * FROM "notices" WHERE "id" = ?`;
  const { noticeId } = req.params;
  db.get(query, [Number(noticeId)], (err, row) => {
    if (err) {
      res.status(404).end();
    }
    res.status(200).json(row);
  });
});
noticeRouter.post("/new", (req, res) => {});
noticeRouter.put("/:noticeId", (req, res) => {});
noticeRouter.delete("/:noticeId", (req, res) => {});

module.exports = noticeRouter;
