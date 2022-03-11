import { Note } from "../models/note.js";
import { Profile } from "../models/profile.js";

function index(req, res) {
  Note.find({})
  .populate('owner')
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
  Note.findById(req.user.profile._id)
  .populate('owner')
  Note.create(req.body)
    .then((notes) => {
      res.redirect("/notes");
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/notes");
    });
}

function createComment(req, res) {
  req.body.owner = req.user.profile._id;
  Note.findById(req.params.id, function (err, note) {
    
    note.comments.push(req.body);
    note.save(function (err) {
      res.redirect(`/notes/${note._id}`);
    });
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


function show (req, res) {
  Note.findById(req.params.id)
  .populate('owner')
  .populate('comments.owner')
    .then((note) => {
      res.render("notes/show", { note, title: "Note"});
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/notes");
    });
}

function edit(req, res) {
  Note.findById(req.params.id)
    .then((note) => {
      console.log(note)
        res.render("notes/edit", {
          note,
          title: "Edit Note",
        });
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/notes");
    });
}

// function update(req, res) {
//   for (let key in req.body) {
//     if (req.body[key] === "") delete req.body[key];
//   }
//   Note.findByIdAndUpdate(req.params.id, req.body, function (err, note) {
//     res.redirect(`/notes/${note._id}`);
//   });
// }

function update(req, res) {
  Note.findById(req.params.id)
    .then((note) => {
      if (note.owner.equals(req.user.profile._id)) {
        note.updateOne(req.body, { new: true }).then(() => {
          res.redirect(`/notes/${note._id}`);
        });
      } else {
        throw new Error("🚫 Not authorized 🚫");
      }
    })
    .catch((err) => {
      console.log(err);
      res.redirect(`/notes`);
    });
}


export {
  index,
  create,
  deleteNote as delete,
  show,
  newNote as new,
  edit,
  createComment, 
  update, 
}