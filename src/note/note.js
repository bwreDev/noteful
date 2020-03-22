import React, { Component } from 'react';
import NotefulContext from '../NotefulContext';

export default class Note extends Component {
  static contextType = NotefulContext;
  render() {
    return (
      <>
        <h2>{this.props.note.name}</h2>
        <p>{this.props.note.content}</p>
        <span>{this.props.note.modified}</span>
        <button
          onClick={e => this.context.deleteNote(this.props.note.id)}>
          Delete
        </button>
      </>
    );
  }
}
