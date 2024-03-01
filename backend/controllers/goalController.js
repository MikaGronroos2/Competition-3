const Goal = require("../models/goalModel");
const User = require("../models/userModel");
const mongoose = require("mongoose");

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getGoals = async (req, res) => {
  try {
    const username = req.params.username;
    console.log(username);

    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const allGoals = await Goal.find({ user: username }).sort({
      createdAt: -1,
    });
    res.status(200).json(allGoals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Set goal
// @route   POST /api/goals
// @access  Private
const setGoal = async (req, res, next) => {
  try {
    const { text, dueDate, priority, user } = req.body;

    let emptyFields = [];

    if (!text) {
      emptyFields.push("text");
    }

    if (!dueDate) {
      emptyFields.push("dueDate");
    }

    if (!priority) {
      emptyFields.push("priority");
    }

    if (emptyFields.length > 0) {
      return res
        .status(403)
        .json({ error: "Please fill all the fields", emptyFields });
    }

    const newGoal = await Goal.create({ text, dueDate, priority, user });
    res.status(200).json(newGoal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Goal" });
  }

  const goal = await Goal.findOneAndReplace({ _id: id }, ...req.body);

  if (!goal) {
    return res.status(400).json({ error: "No such Goal" });
  }

  res.status(200).json(goal);
};

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Goal" });
  }

  const goal = await Goal.findOneAndDelete({ _id: id });

  if (!goal) {
    return res.status(400).json({ error: "No such Goal" });
  }

  res.status(200).json({ message: "Goal deleted" });
};

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
