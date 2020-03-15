import React from "react";

export default function Note(props) {
  return (
    <>
      <h2>{props.note.name}</h2>
      <p>{props.note.content}</p>
      <span>{props.note.modified}</span>
    </>
  );
}
