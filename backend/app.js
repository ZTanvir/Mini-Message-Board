const express = require("express");
const app = express();
const cors = require("cors");
const noticeRouter = require("./controllers/notice");
const commentRouter = require("./controllers/comment");
const middleware = require("./utils/middleware");
const db = require("./models/noticeSchema");
const logger = require("./utils/logger");

app.use(express.json());
app.use(cors());

app.use(middleware.requestLogger);
app.use("/api/notice", noticeRouter);
app.use("/api/notice/:noticeId/comment", commentRouter);

app.use(middleware.unknownEndpoint);

// db.close((err) => {
//   err ? logger.info(err.message) : logger.error("Closed database connection");
// });

module.exports = app;
