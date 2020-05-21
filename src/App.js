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
import config from './config';
import './App.css';

class App extends Component {
  state = {
    notes: [],
    folders: [],
  };

  componentDidMount() {
    const fetches = [
      fetch(`${config.API_ENDPOINT}/folders`),
      fetch(`${config.API_ENDPOINT}/notes`),
    ];
    return Promise.all(fetches)
      .then((res) => {
        const responses = [res[0].json(), res[1].json()];
        return Promise.all(responses);
      })
      .then((data) => {
        this.setState({
          folders: data[0],
          notes: data[1],
        });
      });
  }

  addFolder = (folder) => {
    return fetch(`${config.API_ENDPOINT}/folders`, {
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(folder),
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          folders: this.state.folders.concat(data),
        });
      });
  };

  addNote = (note) => {
    return fetch(`${config.API_ENDPOINT}/notes`, {
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(note),
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          notes: this.state.notes.concat(data),
        });
      });
  };

  deleteNote = (id, cb) => {
    return fetch(`${config.API_ENDPOINT}/notes/${id}`, {
      method: 'delete',
    })
      .then((res) => {
        if (cb) {
          cb();
        }
        this.setState({
          notes: this.state.notes.filter((note) => note.id !== id),
        });
      })
      .catch((e) => {
        console.log(e);
        throw e;
      });
  };

  render() {
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      addFolder: this.addFolder,
      addNote: this.addNote,
      deleteNote: this.deleteNote,
    };

    return (
      <ErrorBoundary>
        <NotefulContext.Provider value={contextValue}>
          <div className='App'>
            <Header />
            <aside className='side-nav'>
              <Switch>
                <Route
                  path='/note/:noteId'
                  render={(routerProps) => (
                    <SidebarNote
                      folders={this.state.folders}
                      note={this.state.notes.find(
                        (note) =>
                          note.id ===
                          parseInt(routerProps.match.params.noteId)
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
              <Switch>
                <Route path='/add-folder' component={AddFolder} />
                <Route path='/add-note' component={AddNote} />
                <Route path='/note/:noteId' component={Note} />
                <Route
                  path='/folder/:folder_id'
                  render={(routerProps) => (
                    <NoteList
                      notes={this.state.notes.filter((note) => {
                        return (
                          note.folder_id ===
                          parseInt(routerProps.match.params.folder_id)
                        );
                      })}
                    />
                  )}
                />
                <Route
                  path='/'
                  render={() => <NoteList notes={this.state.notes} />}
                />
              </Switch>
            </main>
          </div>
        </NotefulContext.Provider>
      </ErrorBoundary>
    );
  }
}

export default App;
