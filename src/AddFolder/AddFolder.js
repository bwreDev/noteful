import React, { Component } from 'react';
import NotefulContext from '../NotefulContext';

export default class AddFolder extends Component {
  static contextType = NotefulContext;
  onSubmit = (event) => {
    event.preventDefault();
    const title = event.target.folderTitle.value;
    const folder = {
      title,
    };
    this.context
      .addFolder(folder)
      .then((data) => this.props.history.push('/'));
    event.target.reset();
  };
  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <fieldset>
          <label>Add Folder</label>
          <input
            type='text'
            name='folderTitle'
            id='folderTitle'
            required
          />
          <button>Save</button>
        </fieldset>
      </form>
    );
  }
}
