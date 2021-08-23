import { types } from "../typess/types";

//ACCION PARA METER EL ERROR
export const setError = (err) => ({
  type: types.uiSetError,
  payload: err,
});

//ACCION PARA BORARR EL ERROR
export const removeError = () => ({
    type: types.uiRemoveError
})

//ACCIONES PARA HABILITAR Y DESHABILITAR EL BOTON DE REGISTRO
export const startLoading = () => ({
  type:types.uiStartLoading
})

export const finishLoading = () => ({
  type: types.uiFinishLoading
});
//DESPUES DE CREAR LAS ACCIONES NOS VAMOS AL REGISTER QUE ES DONDE LO VAMOS A OCUPAR