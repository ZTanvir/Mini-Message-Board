const noticeRouter = require("express").Router();

noticeRouter.get("/", (req, res) => {});
noticeRouter.post("/", (req, res) => {});
noticeRouter.put("/:noticeId", (req, res) => {});
noticeRouter.delete("/:noticeId", (req, res) => {});

module.exports = noticeRouter;
