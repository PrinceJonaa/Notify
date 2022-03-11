import { Note } from "../models/note.js";
import { Profile } from "../models/profile.js";

function index(req, res) {
  Note.find({})
    .then((note) => {
      res.render("notes/index", {
        note,
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
  req.body.owner = req.user.profile._id;
  Note.findById(req.user.profile._id);
  Note.create(req.body)
    .then((notes) => {
      res.redirect("/notes");
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/notes");
    });
}

function deleteNote(req, res) {
  Note.findById(req.params.id)
    .then((note) => {
      if (note.owner.equals(req.user.profile._id)) {
        note.delete().then(() => {
          res.redirect("/notes");
        });
      } else {
        throw new Error("🚫 Not authorized 🚫");
      }
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/notes");
    });
}

// function deleteNote(req, res) {
//   Note.findByIdAndDelete(req.params.id)
//     .then(() => {
//       res.redirect("/notes");
//     })
//     .catch((err) => {
//       console.log(err);
//       res.redirect("/notes");
//     });
// }

function show (req, res) {
  Note.findById(req.params.id)
  .populate('owner')
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