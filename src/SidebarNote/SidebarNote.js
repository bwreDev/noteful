import React from "react";
import { Link } from "react-router-dom";
import './SidebarNote.css';

export default function SidebarNote(props) {
  console.log(props)
  const folder = props.folders.find(folder => folder.id == props.note.folderId) || {}
  return (
    <nav className='sidebar-note'>
      <Link to={"/folder/" + folder.id}>{folder.name}</Link>
      <Link className='back-button' to={"/"}>Back</Link>
    </nav>
  );
}
