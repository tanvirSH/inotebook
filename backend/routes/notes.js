const express = require("express");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");

const router = express.Router();

//Route 1: Fetch all notes : GET 'api/notes/fetchallnotes' - login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  const notes = await Notes.find({ user: req.user.id });
  res.json(notes);
});

//Route 2: Add a new note : POST 'api/notes/addnote' - login required
router.post(
  "/addnote", fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: "3" }),
    body("description", "Description must be at least 5 characters").isLength({
      min: "5",
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      // If error return bad request
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const saveNote = await note.save();
      res.json(note);
    } catch (error) {
      console.error(error.message);
      //Respond if something happen to server
      res.status(500).send("Internal server error");
    }
  }
);

//Route 3: update note: PUT 'api/notes/updatenote' - login required
router.put(
  "/updatenote/:id", fetchuser,
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      //Create new note object
      const newNote = {};
      if(title){newNote.title = title;}
      if(description){newNote.description = description;}
      if(tag){newNote.tag = tag;}

      //Find the note to be update
      let note = await Notes.findById(req.params.id);
    
      if(!note){return res.status(400).send("Not found")}

      //Do not allow user to update if user is different
      if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed");
      }
      
      // Update note
      note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true});
      res.json(note);
    } catch (error) {
      console.error(error.message);
      //Respond if something happen to server
      res.status(500).send("Internal server error");
    }
  }
);

//Route 4: Delete note: DELETE 'api/notes/deletenote' - login required
router.delete(
  "/deletenote/:id", fetchuser,
  async (req, res) => {
    try {
      //Find the note to be delete 
      let note = await Notes.findById(req.params.id);
    
      if(!note){return res.status(400).send("Not found")}

      //Do not allow user to delete note if user is different
      if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed");
      }
      
      // Delete note
      note = await Notes.findByIdAndDelete(req.params.id);
      res.json({"Succes!": "Note has been deleted",  note:note});
    } catch (error) {
      console.error(error.message);
      //Respond if something happen to server
      res.status(500).send("Internal server error");
    }
  }
);

module.exports = router;
