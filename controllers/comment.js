const commentRouter = require("express").Router({ mergeParams: true });
const db = require("../models/noticeSchema");
const logger = require("../utils/logger");

commentRouter.get("/all", (req, res) => {
  const { noticeId } = req.params;
  // get all comments that match the noticeId
  const getComments = `SELECT * FROM "user_comment" WHERE "notice_id"=?`;
  db.all(getComments, [Number(noticeId)], (err, row) => {
    if (err) {
      logger.error(
        `Error on getting all comments for noticeId:${noticeId}`,
        err.message
      );
      return res
        .status(404)
        .json({ error: "Database error check dev console" });
    }
    // if database contain comments
    if (row.length > 0) {
      return res.status(200).json(row);
    } else if (row.length === 0) {
      return res.status(200).json({ message: "no comments" });
    }
  });
});

commentRouter.post("/new", (req, res) => {});

module.exports = commentRouter;
