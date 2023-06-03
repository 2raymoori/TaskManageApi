const express = require("express");
const { check } = require("express-validator/check");
const authenticate = require("../MiddleWare/auth");
const {
    addTask,
    deleteTask,
    modifyTask,
    myTasks, task,
} = require("../CONTROLLERS/TaskCtrl");
const Router = express.Router();
// Router.get("/allTasks", authenticate, allTask);
Router.get("/mytasks", authenticate, myTasks);
Router.get("/mytasks/:id", authenticate, task);
// Router.get("/post/:id", authenticate, post);
Router.post("/add",
  [
    [
      check("description", "Sorry Description is required").not().isEmpty(),
      check("title", "Sorry Title is required").not().isEmpty(),
        check("dateDue", "Sorry Due Date is required").not().isEmpty(),
    ],
    authenticate,
  ],
  addTask
);
Router.delete("/:id", authenticate, deleteTask);
Router.put("/:id", authenticate, modifyTask);;

module.exports = Router;
