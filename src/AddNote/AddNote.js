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
    this.context
      .addNote(note)
      .then(data => this.props.history.push('/'));
    event.target.reset();
  };
  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <fieldset>
          <label>Add Note</label>
          <input type='text' name='noteName' required />
          <textarea name='content' required></textarea>
          <select name='folderId'>
            {this.context.folders.map(folder => (
              <option value={folder.id}>{folder.name}</option>
            ))}
          </select>
          <button>Save</button>
        </fieldset>
      </form>
    );
  }
}
