const express = require("express");
const app = express();
const noticeRouter = require("./controllers/notice");

app.use(express.json());

app.use("/api/notice", noticeRouter);

module.exports = app;
