const express = require("express");
const app = express();
const noticeRouter = require("./controllers/notice");
const middleware = require("./utils/middleware");

app.use(express.json());

app.use(middleware.requestLogger);
app.use("/api/notice", noticeRouter);

app.use(middleware.unknownEndpoint);

module.exports = app;
