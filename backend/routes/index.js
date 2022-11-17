var express = require("express");
var router = express.Router();

const { task } = require("../services/mysql");

/* GET home page. */
router.get("/", async (req, res) => {
  let taskList = [];
  let error = req.session.error ? req.session.error : "";
  req.session.isValid = true;

  req.session.error = "";

  try {
    taskList = await task.getTasks();
  } catch (ex) {
    console.error(ex);
    error = ex;
  }

  res.render("index", { title: "Simple Todo APP", taskList, error });
});

router.post("/save", async (req, res) => {
  let { description, completed } = req.body;

  completed = completed ? true : false;

  try {
    await task.createTask(description, completed);
    res.redirect("/");
  } catch (ex) {
    console.error(ex);
    req.session.error = ex.message;
    res.redirect("/");
  }
});

router.post("/update", async (req, res) => {
  const { id, completed } = req.body;

  if (!req.session.isValid) {
    res.send({ error: "Invalid request" });
    return;
  }

  try {
    taskList = await task.updateTask(id, completed);
    res.send({ success: "OK" });
  } catch (ex) {
    console.error(ex);
    res.send({ error: ex.message });
  }
});

router.post("/delete", async (req, res) => {
  const { id } = req.body;

  try {
    await task.deleteTask(id);
  } catch (ex) {
    console.error(ex);
    error = ex;
  }

  res.redirect("/");
});

module.exports = router;
