import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import './SidebarMain.css';

export default function SidebarMain(props) {
  return (
    <nav className='sidebar-note'>
      <ul className='NoteListNav__list'>
        {props.folders.map(folder => (
          <li className='folder-link' key={folder.id}>
            <NavLink to={'/folder/' + folder.id}>
              {folder.name}
            </NavLink>
          </li>
        ))}
      </ul>
      <NavLink className='add-folder-button' to={'/add-folder'}>
        Add Folder
      </NavLink>
    </nav>
  );
  SidebarMain.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    key: PropTypes.string
  };
}
