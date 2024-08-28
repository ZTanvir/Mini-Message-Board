const logger = require("../utils/logger");
const db = require("./dbConnection");

db.serialize(() => {
  let createUsersTable = `CREATE TABLE IF NOT EXISTS "users"(
        "id" INTEGER,
        "first_name" TEXT NOT NULL,
        "last_name" TEXT NOT NULL,
        PRIMARY KEY ("id")
    );`;

  db.run(createUsersTable, (err) => {
    err
      ? logger.error("Error on creating users table", err.message)
      : logger.info("User table created successfully");
  });

  let createNoticeTable = `CREATE TABLE IF NOT EXISTS "notices"(
        "id" INTEGER,
        "user_id" INTEGER NOT NULL,
        "title" TEXT NOT NULL,
        "notice" TEXT,
        "date" DEFAULT CURRENT_DATE,
        PRIMARY KEY ("id"),
        FOREIGN KEY ("user_id") REFERENCES "users"("id")
    );`;

  db.run(createNoticeTable, (err) => {
    err
      ? logger.error("Error on creating notices table", err.message)
      : logger.info("Notices table created successfully");
  });

  let createCommentsTable = `CREATE TABLE IF NOT EXISTS "comments"(
        "id" INTEGER,
        "user_id" INTEGER NOT NULL,
        "notice_id" INTEGER NOT NULL,
        "date" DEFAULT CURRENT_DATE,
        "comment" TEXT,
        "old_comment" TEXT,
        PRIMARY KEY ("id"),
        FOREIGN KEY ("user_id") REFERENCES "users"("id"),
        FOREIGN KEY ("notice_id") REFERENCES "notices"("id")
    );`;

  db.run(createCommentsTable, (err) => {
    err
      ? logger.error("Error on creating comments table", err.message)
      : logger.info("Comments table created successfully");
  });

  const userCommentView = `CREATE VIEW IF NOT EXISTS user_comment AS
  SELECT "comments"."id","first_name","last_name","notice_id","date","comment","old_comment"
  FROM "users" JOIN "comments" ON "users"."id" = "comments"."user_id";
  `;
  db.run(userCommentView, (err) => {
    if (err) {
      logger.error("user_comment view not created", err.message);
    } else {
      logger.info("user_comment view created successfull");
    }
  });

  // const query = `INSERT INTO "users"("first_name","last_name")
  //       VALUES(?,?);
  // `;
  // db.run(query, ["altaf", "hossen"], (err, row) => {
  //   if (err) {
  //     logger.error("Item not added");
  //   } else {
  //     logger.info("New data added");
  //   }
  // });

  // const query = `INSERT INTO "comments"("user_id","notice_id","description")
  //       VALUES(?,?,?);
  // `;
  // db.run(query, ["altaf", "hossen"], (err, row) => {
  //   if (err) {
  //     logger.error("Item not added");
  //   } else {
  //     logger.info("New data added");
  //   }
  // });
  // copy table to comment
  // alter table add column old_comment with default 0
  // delete comments table
  // new table with update schema
  // insert data from comment table to comments table
});

module.exports = db;
