import React from "react";
import { Link } from "react-router-dom";

export default function SidebarNote() {
  return (
    <nav className='sidebar-note'>
      <Link to={"/folder/:folderId"}>{""}</Link>
      <Link to={"/add-folder"}>Add Folder</Link>
    </nav>
  );
}
