import React from "react";
import { Link } from "react-router-dom";
import "./noteListMain.css";

export default function NoteList(props) {
  return (
    <ul className='NoteListMain'>
      {props.notes.map(note => (
        <li className='note-name' key={note.id}>
          <Link to={"/notes/" + note.id}>{note.name}</Link>
          <span className='modified-date'>{note.modified}</span>
          <div className='button-container'>
            <button className='add-note-button'>Delete</button>
          </div>
        </li>
      ))}
      <button>Add Note</button>
    </ul>
  );
}
