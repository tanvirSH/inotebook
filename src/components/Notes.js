import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import Addnotes from "./Addnotes";
import Noteitem from "./Noteitem";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, setNotes } = context;
  return (
    <>
      <Addnotes />
      <div className="my-3">
        <h2>Your Notes!</h2>
        <div className="row">
          {notes.map((note, index) => {
            return <Noteitem key={`${note._id + index}`} note={note} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Notes;
