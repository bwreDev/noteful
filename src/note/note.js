import React, { Component } from 'react';
import NotefulContext from '../NotefulContext';
import PropTypes from 'prop-types';
import './note.css';

export default class Note extends Component {
  static contextType = NotefulContext;
  render() {
    const note =
      this.context.notes.find(
        (note) => note.id === parseInt(this.props.match.params.noteId)
      ) || {};
    return (
      <>
        <h2 className='note_title'>{note.title}</h2>
        <p className='note_content'>{note.content}</p>
        <span className='date_published'>{note.date_published}</span>
        <button
          className='delete_note'
          onClick={(e) =>
            this.context.deleteNote(note.id, (data) =>
              this.props.history.push('/')
            )
          }>
          Delete
        </button>
      </>
    );
  }
}

Note.propTypes = {
  note: PropTypes.any,
};
