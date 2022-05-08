import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import noteContext from "../context/notes/noteContext";
import Addnotes from "./Addnotes";
import Noteitem from "./Noteitem";

const Notes = (props) => {
  const navigate = useNavigate();
  const context = useContext(noteContext);
  const { notes, fetchAllNote, editNote } = context;
  useEffect(() => {
    if(localStorage.getItem("token")){
      fetchAllNote();
    }else{
      navigate("/login");
    }
    
    // eslint-disable-next-line
  }, [])
  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setnote] = useState({
    _id: "",
    title: "",
    description: "",
    tag: "Default",
  });
  const updatenote = (currentNote) => {
    setnote(currentNote);
    ref.current.click();
  };
  const onchange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };
  const handleSubmit = (id) => {
    editNote(note._id, note.title, note.description, note.tag);
    refClose.current.click();
    props.showAlert("Notes updated!!!", "success");
  };
  return (
    <>
      <Addnotes showAlert={props.showAlert} />
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    minLength={5}
                    required="required"
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={note.title}
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
                    required="required"
                    type="text"
                    className="form-control"
                    id="description"
                    name="description"
                    value={note.description}
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
                    id="tag"
                    name="tag"
                    value={note.tag}
                    onChange={onchange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  handleSubmit(note.id);
                }}
                disabled={note.title.length < 5 || note.description.length < 5}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="my-3">
        <h2>Your Notes!</h2>
        {notes.length === 0 && "No notes to display!!!"}
        {notes.length != 0 && 
        <div className="row">
          {notes.map((note, index) => {
            return (
              <Noteitem
                key={`${note._id + index}`}
                updatenote={updatenote}
                note={note}
                showAlert={props.showAlert}
              />
            );
          })}
        </div>
        }
      </div>
    </>
  );
};

export default Notes;
