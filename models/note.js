import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
  date: Date,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

const Note = mongoose.model("Note", noteSchema);

export { 
  Note
  };