import React, { useState, useEffect } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const initialNote = [];

  const [notes, setNotes] = useState(initialNote);

  useEffect(() => {
    fetchAllNote();
    // eslint-disable-next-line
  }, [])
  
  //fetch All Note
  const fetchAllNote = async () => {
    // API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI2NTI2ZWFkMGVmODdiNGFmZGQyNjNlIn0sImlhdCI6MTY1MDc5NjI2Nn0.N0CH4-FCGgSHzlJ0uNl07JloARq77h8yxhCrBZMxMTg'
      }
    });
    const json = await response.json();
    setNotes(json);
  };

  //Add a note
  const addNote = async (title, description, tag) => {
    // API call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI2NTI2ZWFkMGVmODdiNGFmZGQyNjNlIn0sImlhdCI6MTY1MDc5NjI2Nn0.N0CH4-FCGgSHzlJ0uNl07JloARq77h8yxhCrBZMxMTg'
      },
      body: JSON.stringify({title, description, tag}) 
    });
    const note = await response.json();
    setNotes(notes.concat(note));
  };

  //Edit a note
  const editNote = async (id, title, description, tag) => {
    debugger;
    // API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI2NTI2ZWFkMGVmODdiNGFmZGQyNjNlIn0sImlhdCI6MTY1MDc5NjI2Nn0.N0CH4-FCGgSHzlJ0uNl07JloARq77h8yxhCrBZMxMTg'
      },
      body: JSON.stringify({title, description, tag}) 
    });
    const res = await response.json();
    console.log(res);

    let newNotes = JSON.parse(JSON.stringify(notes));
    newNotes.forEach(function (newNote) {
       if(newNote._id == id){
        newNote.title = title;
        newNote.description = description;
        newNote.tag = tag;
      }
     });
    setNotes(newNotes);
  };

  //Delete a note
  const deleteNote = async (id) => {
    // API call

    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI2NTI2ZWFkMGVmODdiNGFmZGQyNjNlIn0sImlhdCI6MTY1MDc5NjI2Nn0.N0CH4-FCGgSHzlJ0uNl07JloARq77h8yxhCrBZMxMTg'
      }
    });
    const res = await response.json();
    fetchAllNote();
  };


  return (
    <NoteContext.Provider
      value={{ notes, setNotes, addNote, editNote, deleteNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
