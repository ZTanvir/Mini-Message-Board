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

commentRouter.post("/new", (req, res) => {
  // get userId,noticeId,description
  const { noticeId } = req.params;
  const { userId, description } = req.body;

  db.serialize(() => {
    const createCommentQuery = `
      INSERT INTO 
        comments ("user_id","notice_id","description")
        VALUES(?,?,?);`;

    db.run(
      createCommentQuery,
      [Number(userId), Number(noticeId), description],
      function (err) {
        if (err) {
          logger.error(`Error when adding comment to db`, err);
          return res
            .status(500)
            .json({ error: "Database error, check dev console" });
        }

        // when new comment create successfully
        const getComment = `SELECT * FROM "user_comment" WHERE "id" = ?;`;
        const commentId = this.lastID;

        db.all(getComment, [commentId], (err, row) => {
          if (err) {
            return res
              .status(500)
              .json({ error: "Database error, check dev console" });
          }
          // if database contain comments
          if (row.length > 0) {
            return res.status(200).json(row);
          } else if (row.length === 0) {
            return res.status(200).json({ message: "no comments" });
          }
        });
      }
    );
  });
});

commentRouter.delete("/:commentId", (req, res) => {
  const { commentId } = req.params;

  db.serialize(() => {
    const getCommentQuery = `SELECT * FROM "comments" 
      WHERE "id"=?`;

    db.get(getCommentQuery, [Number(commentId)], (err, row) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "database error check dev console" });
      }
      // is comment in the db
      if (!row) {
        // comment not found
        return res.status(404).json({ message: "Comment not found" });
      }
      // comment found
      const deleteTableQuery = `DELETE FROM "comments" WHERE "id"=?;`;
      db.run(deleteTableQuery, [Number(commentId)], (err) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "database error check dev console" });
        }
        return res.status(200).json(row);
      });
    });
  });
});

module.exports = commentRouter;
