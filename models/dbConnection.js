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
module.exports = db;
