const mongoose = require('mongoose');
const Task = require('../models/Task');

const getDashboardStats = async (req, res) => {
  try {
    const stats = await Task.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(req.user.id) } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);

    const formattedStats = {
      totalTasks: 0,
      pendingTasks: 0,
      inProgressTasks: 0,
      completedTasks: 0,
    };

    stats.forEach((stat) => {
      if (stat._id === 'Pending') formattedStats.pendingTasks = stat.count;
      if (stat._id === 'In Progress') formattedStats.inProgressTasks = stat.count;
      if (stat._id === 'Completed') formattedStats.completedTasks = stat.count;
    });

    formattedStats.totalTasks =
      formattedStats.pendingTasks +
      formattedStats.inProgressTasks +
      formattedStats.completedTasks;

    res.json(formattedStats);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = { getDashboardStats };
