import { Note } from "../models/note.js";
import { Profile } from "../models/profile.js";

function index(req, res) {
  console.log('Show Page')
  Note.find({})
    .then((notes) => {
      res.render("index", {
        notes,
        title: "List of Notes",
        Profile,
      });
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/");
    });
}

export {
  index
}