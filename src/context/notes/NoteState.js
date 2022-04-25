import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const initialNote = [
    {
      _id: "6265285c200729a5ae11cf62",
      user: "626526ead0ef87b4afdd263e",
      title: "First Post",
      description: "description description",
      tag: "description tag",
      date: "2022-04-24T10:37:16.497Z",
      __v: 0,
    },
    {
      _id: "62652974200729a5ae11cf65",
      user: "626526ead0ef87b4afdd263e",
      title: "New Note",
      description: "Please play the list",
      tag: "Soul full",
      date: "2022-04-24T10:41:56.952Z",
      __v: 0,
    },
    {
      _id: "62652974200729a5ae11cf65",
      user: "626526ead0ef87b4afdd263e",
      title: "New Note",
      description: "Please play the list",
      tag: "Soul full",
      date: "2022-04-24T10:41:56.952Z",
      __v: 0,
    },
    {
      _id: "62652974200729a5ae11cf65",
      user: "626526ead0ef87b4afdd263e",
      title: "New Note",
      description: "Please play the list",
      tag: "Soul full",
      date: "2022-04-24T10:41:56.952Z",
      __v: 0,
    },
    {
      _id: "62652f2d9555b0b4eac6d4d7",
      user: "626526ead0ef87b4afdd263e",
      title: "New Note updated",
      description: "Please play the list updated",
      tag: "Soul full",
      date: "2022-04-24T11:06:21.064Z",
      __v: 0,
    },
    {
      _id: "62652974200729a5ae11cf65",
      user: "626526ead0ef87b4afdd263e",
      title: "New Note",
      description: "Please play the list",
      tag: "Soul full",
      date: "2022-04-24T10:41:56.952Z",
      __v: 0,
    },
  ];

  const [notes, setNotes] = useState(initialNote);

  //Add a note 
  const addNote = (title, description, tag) => {
    let note = {
      _id: "62652974200729a5ae11cf65",
      user: "626526ead0ef87b4afdd263e",
      title: title,
      description: description,
      tag: tag,
      date: "2022-04-24T10:41:56.952Z",
      __v: 0,
    };
    setNotes(notes.concat(note))
  }
  //Edit a note
  const editNote = (id) => {

  }
  //Delete a note
  const deleteNote = (note) => {}
  return (
    <NoteContext.Provider value={{ notes, setNotes, addNote,editNote, deleteNote}}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
