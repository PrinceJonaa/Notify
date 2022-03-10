import { Note } from "../models/note.js";
import { Profile } from "../models/profile.js";

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
  req.body.owner = req.user.profile._id
  Profile.findById(req.user.profile._id)
  .then(profile => {
    profile.cats.push(req.body)
    profile.save()
    .then(() => {
      res.redirect(`/profiles/${req.user.profile._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect(`/profiles/${req.user.profile._id}`)
    })
  })
}

function deleteNote(req, res) {
  Profile.findById(req.params.profileId)
    .then((profile) => {
      profile.cats.remove({ _id: req.params.catId });
      profile.save().then(() => {
        res.redirect(`/profiles/${req.user.profile._id}`);
      });
    })
    .catch((err) => {
      console.log(err);
      res.redirect(`/profiles/${req.user.profile._id}`);
    });
}

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