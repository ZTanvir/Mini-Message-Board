const noticeRouter = require("express").Router();
const logger = require("../utils/logger");
const db = require("../models/noticeModel");

noticeRouter.get("/all", (req, res) => {
  db.serialize(() => {
    const getNotices = `SELECT * FROM "notices";`;

    db.all(getNotices, [], (err, row) => {
      if (err) {
        res.status(404).json({ error: "notice not found" }).end();
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
      res
        .status(403)
        .json({ error: `Database error on getting ${noticeId}` })
        .end();
    }
    row
      ? res.status(200).json(row)
      : res
          .status(404)
          .json({ error: `notice id ${noticeId} not found` })
          .end();
  });
});
noticeRouter.post("/new", (req, res) => {
  const { user_id, title, description } = req.body;

  db.serialize(() => {
    const insertTable = `INSERT INTO "notices" ("user_id","title","description")
    VALUES(?,?,?)
  `;

    db.run(
      insertTable,
      [Number(user_id), String(title), String(description)],
      (err) => {
        if (err) {
          console.log(err);
          res
            .status(403)
            .json({ error: `Database error adding new notice ${err.message}` })
            .end();
        }
      }
    );

    const getTable = `SELECT * FROM "notices" WHERE "title" = ? AND "description"=?`;
    db.all(getTable, [String(title), String(description)], (err, row) => {
      if (err) {
        res
          .status(403)
          .json({ error: `Database error on getting data ${res.message}` })
          .end();
      }
      row
        ? res.status(200).json(row)
        : res
            .status(404)
            .json({ error: `Notice ${noticeId} not found` })
            .end();
    });
  });
});

noticeRouter.put("/:noticeId", (req, res) => {});
noticeRouter.delete("/:noticeId", (req, res) => {});

module.exports = noticeRouter;
