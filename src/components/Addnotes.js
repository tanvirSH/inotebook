import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const Addnotes = (props) => {
  const context = useContext(noteContext);
  const { notes, addNote } = context;
  const [note, setnote] = useState({
    title: "",
    description: "",
    tag: "Default",
  });
  const onchange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    addNote(note.title, note.description, note.tag);
    setnote({
      title: "",
      description: "",
      tag: "",
    });
    props.showAlert("Notes added!!!", "success");
  };
  return (
    <div>
      <h1>Add note</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            minLength={5}
            required
            type="text"
            value={note.title}
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
            minLength={5}
            required
            value={note.description}
            type="text"
            className="form-control"
            id="description"
            name="description"
            onChange={onchange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            value={note.tag}
            id="tag"
            name="tag"
            onChange={onchange}
          />
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={handleSubmit}
          disabled={note.title.length < 5 || note.description.length < 5}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Addnotes;
