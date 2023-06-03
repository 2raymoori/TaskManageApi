const TaskModel = require("../MODELS/TaskModel");
const { validationResult } = require("express-validator/check");
const addTask = async (req, res) => {
  try {
    const { description, title,priority,dateDue } = req.body;
    const validationRes = validationResult(req);
    if (validationRes.errors.length > 0) {
      return res
        .status(400)
        .json({ status: "Error", data: validationRes.errors });
    }
    const priorityVals = [1,2,3];
    if(!priorityVals.includes(priority)){
        return res.status(400).json({status:"Error",data:[{msg:"Sorry priority must be 1,2 or 3"}]});
    }
    const newTask = new TaskModel({
      description,
      title,
      dateDue,
        priority,
      state:false, // any new task is not completed meaning state is false
        status:0, // status 0 means task is not started
      user: req.user.id,
    });
    await newTask.save();
    return res.status(200).json({
      status: "Success",
      data: [{ msg: "Post Successfully added", data: newTask }],
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ status: "Failure", data: "Error..." });
  }
};
const deleteTask = async (req, res) => {
  try {
    const taskToDelete = await TaskModel.findById(req.params.id);
    if (taskToDelete.user == req.user.id) {
      await taskToDelete.delete();
      return res.status(200).json({
        status: "success",
        data: [{ msg: "Task Successfully Deleted", data: taskToDelete }],
      });
    } else {
      return res
        .status(400)
        .json({ status: "Failure", data: [{ msg: "Task Delete Failed" }] });
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ status: "Failure", data: "Error..." });
  }
};
const allTask = async (req, res) => {
  try {
    const allPost = await TaskModel.find().populate("user", [
      "firstName",
      "lastName",
      "email",
      "profileImg",
    ]);
    return res
      .status(200)
      .json({ status: "Success", data: [{ msg: allPost }] });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ status: "Failure", data: "Error..." });
  }
};
const modifyTask = async (req, res) => {
  try {
    const { description, title } = req.body;
    const modifyPost = await PostModel.findById(req.params.id);
    if (modifyPost.user == req.user.id) {
      if (title) {
        modifyPost.title = title;
      }
      if (description) {
        modifyPost.description = description;
      }
      await modifyPost.save();
      return res.status(200).json({
        status: "Success",
        data: [{ msg: "Post Successfully added", data: modifyPost }],
      });
    } else {
      return res
        .status(400)
        .json({ status: "Failure", data: [{ msg: "Post Update Failed" }] });
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ status: "Failure", data: "Error..." });
  }
};
const myTasks = async (req, res) => {
  try {
    const myTasks = await TaskModel.find({ user: req.user.id});
    return res
      .status(200)
      .json({ status: "Success", data: [{ msg: "My Tasks", data: myTasks }] });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ status: "Failure", data: "Error..." });
  }
};
const task = async (req, res) => {
  try {
    console.log(req.params.id);
    console.log(req.user.id);
    const post = await TaskModel.findById(req.params.id);
    return res
      .status(200)
      .json({ status: "Success", data: [{ msg: "post", data: post }] });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ status: "Failure", data: "Error..." });
  }
};



module.exports = {
  addTask,
  deleteTask,
  modifyTask,
  myTasks,
  task,
};

