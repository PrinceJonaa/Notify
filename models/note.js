import mongoose from "mongoose";

const Schema = mongoose.Schema;

const noteSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    description: String,
    date: Date,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "Profile" },
  },
  {
    timestamps: true,
    comment: { type: Schema.Types.ObjectId, ref: "Comment" },
    commentAmount: Number,
    isInteresting: { type: Boolean, default: false },
  }
);


const Note = mongoose.model("Note", noteSchema);

export { 
  Note
};