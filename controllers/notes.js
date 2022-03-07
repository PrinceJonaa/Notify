import { Note } from "../models/note.js";

function index(req, res) {
  Note.find({})
    .then((notes) => {
      res.render("tacos/index", {
        notes,
        title: "List of Notes",
      });
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/notes");
    });
}

function create(req, res) {
  res.render("notes/create", { title: "Create a Note" });
}

function deleteNote (req, res) {
  Note.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect("/notes");
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/notes");
    });
}

function show (req, res) {
  Note.findById(req.params.id)
    .then((note) => {
      res.render("notes/show", { note, title: "Note" });
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/notes");
    });
}


export {
  index,
  create,
  deleteNote,
  show,
}