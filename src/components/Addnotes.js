import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";


const Addnotes = () => {
    const context = useContext(noteContext);
    const {notes, addNote} = context;
    const [note, setnote] = useState({title:'', description:'', tag: 'Default'});
    const onchange = (e) => {
        setnote({...note, [e.target.name]: e.target.value});
    }
    const handleSubmit = (e) => {
        addNote(note.title, note.description, note.tag);
    }
  return (
    <div>
      <h1>Add note</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            onChange={onchange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            onChange={onchange}
          />
        </div>

        <button type="button" className="btn btn-primary" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Addnotes;
