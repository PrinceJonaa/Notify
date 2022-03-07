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

export {
  index
}