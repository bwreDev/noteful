import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import NotefulContext from './NotefulContext';
import NoteList from './notelistmain/noteListMain';
import Header from './header/header';
import SidebarMain from './SidebarMain/SidebarMain';
import SidebarNote from './SidebarNote/SidebarNote';
import Note from './note/note';
import AddFolder from './AddFolder/AddFolder';
import AddNote from './AddNote/AddNote';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';
import './App.css';

class App extends Component {
  state = {
    notes: [],
    folders: []
  };

  componentDidMount() {
    const fetches = [
      fetch('http://localhost:9090/folders'),
      fetch('http://localhost:9090/notes')
    ];
    Promise.all(fetches)
      .then(res => {
        const responses = [res[0].json(), res[1].json()];
        return Promise.all(responses);
      })
      .then(data => {
        this.setState({
          folders: data[0],
          notes: data[1]
        });
      });
  }

  addFolder = folder => {
    fetch(`http://localhost:9090/folders/`, {
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(folder)
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          folders: this.state.folders.concat(data)
        });
      });
  };

  addNote = note => {
    fetch(`http://localhost:9090/notes/`, {
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(note)
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          notes: this.state.notes.concat(data)
        });
      });
  };

  deleteNote = id => {
    fetch(`http://localhost:9090/notes/${id}`, {
      method: 'delete'
    }).then(res => {
      this.setState({
        notes: this.state.notes.filter(note => note.id !== id)
      });
    });
  };

  render() {
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      addFolder: this.addFolder,
      addNote: this.addNote,
      deleteNote: this.deleteNote
    };

    return (
      <NotefulContext.Provider value={contextValue}>
        <div className='App'>
          <Header />
          <aside className='side-nav'>
            <Switch>
              <Route
                path='/notes/:noteId'
                render={routerProps => (
                  <SidebarNote
                    folders={this.state.folders}
                    note={this.state.notes.find(
                      note =>
                        note.id === routerProps.match.params.noteId
                    )}
                  />
                )}
              />
              <Route
                path='/'
                render={() => (
                  <SidebarMain folders={this.state.folders} />
                )}
              />
            </Switch>
          </aside>
          <main className='App-main'>
            <ErrorBoundary>
              <Switch>
                <Route path='/add-folder' component={AddFolder} />
                <Route path='/add-note' component={AddNote} />
                <Route
                  path='/notes/:noteId'
                  render={routerProps => (
                    <Note
                      note={this.state.notes.find(
                        note =>
                          note.id === routerProps.match.params.noteId
                      )}
                    />
                  )}
                />
                <Route
                  path='/folder/:folderId'
                  render={routerProps => (
                    <NoteList
                      notes={this.state.notes.filter(
                        note =>
                          note.folderId ===
                          routerProps.match.params.folderId
                      )}
                    />
                  )}
                />
                <Route
                  path='/'
                  render={() => <NoteList notes={this.state.notes} />}
                />
              </Switch>
            </ErrorBoundary>
          </main>
        </div>
      </NotefulContext.Provider>
    );
  }
}

export default App;
