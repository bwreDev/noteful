import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NotefulContext from '../NotefulContext';
import './noteListMain.css';

export default class NoteList extends Component {
  static contextType = NotefulContext;
  render() {
    return (
      <ul className='NoteListMain'>
        {this.props.notes.map(note => (
          <li className='note-name' key={note.id}>
            <Link to={'/notes/' + note.id}>{note.name}</Link>
            <span className='modified-date'>{note.modified}</span>
            <div className='button-container'>
              <button
                onClick={e => this.context.deleteNote(note.id)}
                className='delete-note-button'>
                Delete
              </button>
            </div>
          </li>
        ))}
        <Link className='add-note-button' to='/add-note'>
          Add Note
        </Link>
      </ul>
    );
  }
}
