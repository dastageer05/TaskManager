const Task = require("../models/task");
const User = require('../models/user');

exports.addtask = async (req, res) => {
  const user = await User.findById(req.params.id).populate("_id");
  return res.render("addTask", {
    user: user,
  });
};

// exports.addtask = async (req, res ) => {
//     const {title, description} = req.body;
//     const task = await Task.create({
//         title,
//         description,
//     })
//     console.log(req.body)
//     return res.redirect(`/cuser`)
// };

exports.Addtask = async (req, res) => {
  const user = await User.findById(req.params.id).populate("_id");
  const { title, description, typeoftask, duedate } = req.body;
  await Task.create({ title, description, typeoftask, duedate,
    createdBy: user._id,
   });
  return res.redirect(`/task/mytask/${user._id}`);
};

exports.mytask = async (req, res) => {
  const user = await User.findById(req.params.id).populate("_id");
  const alltasks = await Task.find({createdBy: req.params.id}).populate('_id');
  res.render('mytask', {
      user: user,
      tasks: alltasks,
});
};
exports.regulartask = async (req, res) => {
  const user = await User.findById(req.params.id).populate("_id");
  const alltasks = await Task.find({createdBy: req.params.id}).populate('_id');
  res.render('RegularTask', {
      user: user,
      tasks: alltasks,
});
};

exports.EditTask = async (req, res) =>{
    const task = await Task.findById(req.params.id).populate("_id");
    const { title, description } = req.body;
    await Task.findOneAndUpdate(
      {_id: task._id},
      {$set: {
        title: title,
        description: description,
      }}
    )
    return res.redirect(`/task/mytask/${task.createdBy}`);
}
exports.editTask = async (req, res) => {
   const task = await Task.findById(req.params.id).populate("_id");
   return res.render('editTask', {
      user: req.user,
      task: task,
   })
}

exports.delete = async (req, res) => {
  const task = await Task.findById(req.params.id).populate("_id");
  await Task.deleteOne({_id: task._id});
  return res.redirect(`/task/mytask/${task.createdBy}`)
}

exports.status = async (req, res) => {
  const task = await Task.findById(req.params.id).populate("_id");
  const newStatus = task.status === 'Complete' ? 'Incomplete' : 'Complete';
  await Task.findOneAndUpdate(
    {_id: task._id},
    {$set: {
      status: newStatus,
    }}
  )
  return res.redirect(`/task/mytask/${task.createdBy}`);

}