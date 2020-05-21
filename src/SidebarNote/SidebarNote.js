import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './SidebarNote.css';

export default function SidebarNote(props) {
  console.log(props);
  const folder =
    props.folders.find(
      (folder) => folder.id === props.note?.folder_id
    ) || {};
  return (
    <nav className='sidebar-note'>
      <ul className='NoteListNav__list'>
        <Link className='folder-link' to={'/folder/' + folder.id}>
          {folder.title}
        </Link>
        <Link className='back-button' to={'/'}>
          Back
        </Link>
      </ul>
    </nav>
  );
}

SidebarNote.propTypes = {
  folders: PropTypes.array,
};
