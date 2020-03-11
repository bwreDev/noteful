import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import NoteList from "./notelistmain/noteListMain";
import Header from "./header/header";
import STORE from './STORE/STORE';
import SidebarMain from './SidebarMain/SidebarMain';
import SidebarNote from './SidebarNote/SidebarNote';
import Note from './note/note';
import "./App.css";

class App extends Component {
  state={
    ...STORE
  }
  render() {
    return (
      <>
        <Header />
        <aside>
          <Switch>
            <Route
              path='/notes/:noteId'
              render={routerProps => <SidebarNote />}
            />
            <Route path="/" render={() => <SidebarMain 
              folders={this.state.folders} />} />
          </Switch>
        </aside>
        <main>
          <Switch>
            <Route path="/notes/:noteId" render={routerProps => (
            <Note note={this.state.notes.find(note => note.id == routerProps.match.params.noteId)} />
            )} />
            <Route path="/folder/:folderId" render={routerProps => (
            <NoteList notes={this.state.notes.filter(note => note.folderId == routerProps.match.params.folderId)} />
            )} />
            <Route path="/" render={() => <NoteList notes={this.state.notes} />} />
          </Switch>
        </main>
      </>
    );
  }
}

export default App;
