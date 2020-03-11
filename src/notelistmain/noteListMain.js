import React from 'react';
import { Link } from 'react-router-dom';

export default function NoteList(props) {
    return (
        <>
        {props.notes.map(note => (
            <li>
                <Link to={"/notes/" + note.id}>
                    {note.name}
                </Link>
            </li>
        ))}
        </>
    )
}