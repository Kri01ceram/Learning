const mongoose = require("mongoose");

const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/todo";

mongoose.connect(mongoUri, {
    serverSelectionTimeoutMS: 5000
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.error("MongoDB connection failed:", error.message);
});

const UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

const TodoSchema = new mongoose.Schema({
    title: String,
    description: String,
    userId: mongoose.Types.ObjectId
});

const userModel = mongoose.model("users", UserSchema);
const todoModel = mongoose.model("todos", TodoSchema);

module.exports = {
    userModel: userModel,
    todoModel: todoModel
}