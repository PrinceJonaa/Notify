import mongoose from "mongoose";

const Schema = mongoose.Schema;

const commentSchema = new mongoose.Schema({
  content: String,
  date: Date,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "Profile" },
  note: { type: mongoose.Schema.Types.ObjectId, ref: "Note" },
});

const noteSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    description: String,
    date: Date,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "Profile" },
    comments: [commentSchema],
    commentAmount: Number,
    isInteresting: { type: Boolean, default: false },
    
  },
  {
    timestamps: true,
  }
);


const Note = mongoose.model("Note", noteSchema);

export { 
  Note
};