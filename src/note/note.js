import React, { Component } from 'react';
import NotefulContext from '../NotefulContext';
import PropTypes from 'prop-types';

export default class Note extends Component {
  static contextType = NotefulContext;
  render() {
    return (
      <>
        <h2>{this.props.note.name}</h2>
        <p>{this.props.note.content}</p>
        <span>{this.props.note.modified}</span>
        <button
          onClick={e =>
            this.context.deleteNote(this.props.note.id, data =>
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
  note: PropTypes.shape
};
