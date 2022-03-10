import { Note } from "../models/note.js";
import { Profile } from "../models/profile.js";
import { User } from "../models/user.js";

function index(req, res) {
  Note.find({})
    .then((notes) => {
      res.render("notes/index", {
        notes,
        title: "List of Notes",
        Profile,
      });
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/notes");
    });
}

function newNote(req, res) {
  Note.find({})
  .then(notes => {
  res.render('notes/new', {
    title: 'New Note',
  });
  })
  .catch(err => {
  console.log(err);
  res.redirect('/notes')
  }
  );
}

function create(req, res) {
  req.body.owner = req.user.profile.id;
  Note.create(req.body)
    .then((notes) => {
      res.redirect("/notes/new");
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/notes");
    });
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
  deleteNote as delete,
  show,
  newNote as new,
}