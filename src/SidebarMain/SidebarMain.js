import React from "react";
import { Link } from "react-router-dom";

export default function SidebarMain(props) {
  return (
    <nav className='sidebar-note'>
      {props.folders.map(folder => (
        <li>
          <Link to={"/folder/" + folder.id}>{folder.name}</Link>
        </li>
      ))}
      <Link to={"/add-folder"}>Add Folder</Link>
    </nav>
  );
}
