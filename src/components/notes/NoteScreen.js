import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { NotesAppBar } from "./NotesAppBar";
import { useDispatch } from "react-redux";
import { useForm } from "../hooks/useForm";
import { activeNote, startDeleting } from "../../actions/notes";

export const NoteScreen = () => {
  const { active: note } = useSelector((state) => state.notes);
  // console.log(note);

  const [formValues, handleInputChange, reset] = useForm(note);
  const { body, title, id } = formValues;

  const activeId = useRef(note.id);

  useEffect(() => {

    if (note.id !== activeId.current) {
      reset(note);
      activeId.current = note.id;
    }
  }, [note, reset]);

  const dispatch = useDispatch();

  useEffect(() => {
   dispatch(activeNote(formValues.id, {...formValues}))
  }, [formValues, dispatch])


  const handleDelete = () => {
    // console.log('Delete')
    console.log(id)
     dispatch(startDeleting(id));
  }
  

  return (
    <div className="notes__main-content">
      <NotesAppBar />
      <div className="notes__content">
        <input
          name="title"
          type="text"
          placeholder="Some awesome title"
          className="notes__title-input"
          autoComplete="off"
          value={title}
          onChange={handleInputChange}
        />
        <textarea
          name="body"
          placeholder="What happened today"
          className="notes__textarea"
          value={body}
          onChange={handleInputChange}
        ></textarea>

        {note.url && (
          <div className="notes__image">
            <img
              src={note.url}
              alt="imagen"
            ></img>
          </div>
        )}
      </div>
      <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
    </div>
  );
};
