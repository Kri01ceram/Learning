const mongoose = require('mongoose');
// mongoose schema and modle oibject

const userSchema  = new mongoose.Schema({
    username: String,
    password: String
});

const todoSchema = new mongoose.Schema({
    title: String,
    description: String,
    userId: mongoose.Types.ObjectId
});

const userModel = mongoose.model("User", userSchema);
const todoModel = mongoose.model("Todo", todoSchema);

module.exports = {
    userModel : userModel,
    todoModel : todoModel
}