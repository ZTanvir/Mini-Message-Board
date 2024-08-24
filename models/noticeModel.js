const sqlite3 = require("sqlite3").verbose();
const logger = require("../utils/logger");
const db = new sqlite3.Database(
  "./models/noticebord.db",
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) {
      logger.error("Error while connecting to database", err.message);
    }
    logger.info("Connected to database.");
  }
);

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
        "description" TEXT,
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
        "description" TEXT,
        PRIMARY KEY ("id"),
        FOREIGN KEY ("user_id") REFERENCES "users"("id"),
        FOREIGN KEY ("notice_id") REFERENCES "notices"("id")
    );`;

  db.run(createCommentsTable, (err) => {
    err
      ? logger.error("Error on creating comments table", err.message)
      : logger.info("Comments table created successfully");
  });
  const query = `INSERT INTO "notices"("user_id","title","description")
        VALUES(?,?,?);
  `;
  // db.run(query, [10, "Vacation time", "Dec 10 - january 10"], (err, row) => {
  //   if (err) {
  //     logger.error("Item not added");
  //   } else {
  //     logger.info("New data added");
  //   }
  // });
});

module.exports = db;
