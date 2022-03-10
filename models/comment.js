import mongoose from "mongoose";

const Schema = mongoose.Schema;

const commentSchema = new mongoose.Schema({
  content: String,
  date: Date,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  note: { type: mongoose.Schema.Types.ObjectId, ref: "Note" }
});

const Comment = mongoose.model("Comment", commentSchema);

export {
  Comment
}