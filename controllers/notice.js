const noticeRouter = require("express").Router();

noticeRouter.get("/", (req, res) => {});
noticeRouter.get("/:noticeId", (req, res) => {});
noticeRouter.post("/new", (req, res) => {});
noticeRouter.put("/:noticeId", (req, res) => {});
noticeRouter.delete("/:noticeId", (req, res) => {});

module.exports = noticeRouter;
