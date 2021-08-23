import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { startSaveNote, startUploading } from "../../actions/notes";

export const NotesAppBar = () => {

  const dispatch = useDispatch();
   const  {active}  = useSelector((state) => state.notes);

  const handlePictureClick = () => {
    console.log('Picture')
    document.querySelector("#fileSelector").click(); //AL DAR CLICK EN EL BOTON PICTURE SIMULA UN CLICK EN EL INPUT FILE
  }

  const handleFileChange = (e) => {
    //console.log(e.target.files)
    const file = e.target.files[0];
    if (file) {
      dispatch(startUploading(file))
    }
    
  }
  
  const handleSave = () => {
    dispatch(startSaveNote(active));
  };

  return (
    <div className="notes__appbar">
      <span>28 de agosto 2020</span>

      <input type='file' name='file' id='fileSelector' style={{ display: 'none' }} onChange={ handleFileChange }/>

      <div>
        <button className="btn" onClick={handlePictureClick}>Picture</button>
        <button className="btn" onClick={handleSave}>
          Save
        </button>
        <button className="btn">Picture</button>
      </div>
    </div>
  );
};
