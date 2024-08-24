const express = require("express");
const app = express();
const noticeRouter = require("./controllers/notice");
const middleware = require("./utils/middleware");
const db = require("./models/noticeModel");
const logger = require("./utils/logger");

app.use(express.json());

app.use(middleware.requestLogger);
app.use("/api/notice", noticeRouter);

app.use(middleware.unknownEndpoint);

// db.close((err) => {
//   err ? logger.info(err.message) : logger.error("Closed database connection");
// });

module.exports = app;
