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
    this.context.addFolder(folder);
  };
  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input type='text' name='folderName' />
        <button>Save</button>
      </form>
    );
  }
}
