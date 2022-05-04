import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const Noteitem = (props) => {
  const { note, updatenote } = props;
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const deleteItem = (id) => {
    deleteNote(id);
  };
  return (
    <div className="col-md-3">
      <div className="card my-3" style={{ width: "17rem" }}>
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between">
            <h5 className="card-title">{note.title}</h5>
            <i
              className="fa-solid fa-pen-to-square"
              onClick={() => {
                updatenote(note);
              }}
            ></i>
            <i
              className="fa-solid fa-trash-can"
              onClick={() => {
                deleteItem(note._id);
                props.showAlert("Notes deleted!!!", "success");
              }}
            ></i>
          </div>
          <p className="card-text">{note.description}</p>
          <p className="card-text">{note.tag}</p>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
