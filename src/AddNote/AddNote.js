import React, { Component } from 'react';
import NotefulContext from '../NotefulContext';

export default class AddNote extends Component {
  static contextType = NotefulContext;
  onSubmit = event => {
    event.preventDefault();
    const name = event.target.noteName.value;
    const content = event.target.content.value;
    const folderId = event.target.folderId.value;
    const key = Math.floor(Math.random() * 100);
    const modified = '2020-03-20T21:30:00.000Z';
    const note = {
      name,
      content,
      folderId,
      key,
      modified
    };
    this.context.addNote(note);
  };
  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input type='text' name='noteName' />
        <textarea name='content'></textarea>
        <select name='folderId'>
          {this.context.folders.map(folder => (
            <option value={folder.id}>{folder.name}</option>
          ))}
        </select>
        <button>Save</button>
      </form>
    );
  }
}
