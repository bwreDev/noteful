import React, { Component } from 'react';
import NotefulContext from '../NotefulContext';
import './AddNote.css';

export default class AddNote extends Component {
  static contextType = NotefulContext;
  onSubmit = (event) => {
    event.preventDefault();
    const title = event.target.noteTitle.value;
    const content = event.target.content.value;
    const folder_id = event.target.folder_id.value;
    const note = {
      title,
      content,
      folder_id,
    };
    this.context
      .addNote(note)
      .then((data) => this.props.history.push('/'));
    event.target.reset();
  };
  render() {
    return (
      <form className='addNote' onSubmit={this.onSubmit}>
        <fieldset>
          <label>Add Note</label>
          <input
            placeholder='Note Title'
            type='text'
            name='noteTitle'
            required
          />
          <textarea
            placeholder='Note Content'
            name='content'
            required></textarea>
          <label>Select Folder</label>
          <select name='folder_id'>
            <option value='blank'></option>
            {this.context.folders.map((folder) => (
              <option value={folder.id}>{folder.title}</option>
            ))}
          </select>
          <button>Save</button>
        </fieldset>
      </form>
    );
  }
}
