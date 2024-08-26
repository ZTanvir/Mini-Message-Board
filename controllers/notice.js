const noticeRouter = require("express").Router();
const db = require("../models/noticeSchema");

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
        ? res.status(201).json(row)
        : res
            .status(404)
            .json({ error: `Notice ${noticeId} not found` })
            .end();
    });
  });
});
noticeRouter.put("/:noticeId", (req, res) => {
  const { title, description } = req.body;
  const { noticeId } = req.params;

  db.serialize(() => {
    const updateTable = `UPDATE notices
      SET title=?,description=? 
      WHERE id=?`;

    db.run(
      updateTable,
      [String(title), String(description), Number(noticeId)],
      (err) => {
        if (err) {
          res
            .status(403)
            .json({
              error: `Database error ${err.message} on updating notice ${title} `,
            })
            .end();
        }
      }
    );

    const getTable = `SELECT * FROM "notices" WHERE "id"=? AND "title" = ? AND "description"=?`;
    db.all(
      getTable,
      [Number(noticeId), String(title), String(description)],
      (err, row) => {
        if (err) {
          res
            .status(403)
            .json({ error: `Database error on getting data ${res.message}` })
            .end();
        }
        row
          ? res.status(201).json(row)
          : res
              .status(404)
              .json({ error: `Notice ${noticeId} not found` })
              .end();
      }
    );
  });
});
noticeRouter.delete("/:noticeId", (req, res) => {
  const { noticeId } = req.params;
  db.serialize(() => {
    const getDatabaseRow = `SELECT * FROM "notices" WHERE "id"=?`;
    let isNoticeAvailable = false;
    let tableRow = null;

    db.all(getDatabaseRow, [Number(noticeId)], (err, row) => {
      if (err) {
        res
          .status(403)
          .json({ error: `Database error on getting data ${res.message}` })
          .end();
      }
      if (!row) {
        res
          .status(404)
          .json({ error: `Notice ${noticeId} not found` })
          .end();
      } else if (row) {
        isNoticeAvailable = true;
        tableRow = row;
      }
    });

    const deleteTable = `DELETE FROM notices WHERE id=?`;
    db.run(deleteTable, [Number(noticeId)], (err) => {
      if (err) {
        res
          .status(403)
          .json({
            error: `Database error ${err.message} on deleting notice id ${noticeId} `,
          })
          .end();
      }
      !err
        ? res.status(200).json(tableRow)
        : res
            .status(404)
            .json({ error: `Notice ${noticeId} not found` })
            .end();
    });
  });
});

module.exports = noticeRouter;
