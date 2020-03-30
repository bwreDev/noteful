import React, { Component } from 'react';
import NotefulContext from '../NotefulContext';

export default class AddFolder extends Component {
  static contextType = NotefulContext;
  onSubmit = event => {
    event.preventDefault();
    const name = event.target.folderName.value;
    const key = Math.floor(Math.random() * 100);
    const folder = {
      name,
      key
    };
    this.context
      .addFolder(folder)
      .then(data => this.props.history.push('/'));
    event.target.reset();
  };
  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <fieldset>
          <label>Add Folder</label>
          <input
            type='text'
            name='folderName'
            id='folderName'
            required
          />
          <button>Save</button>
        </fieldset>
      </form>
    );
  }
}
