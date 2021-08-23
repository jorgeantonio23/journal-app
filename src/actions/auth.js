import { firebase, googleAuthProvider } from "../firebase/firebase-config";
import { types } from "../typess/types";
import { finishLoading, startLoading } from "./ui";
import Swal from "sweetalert2";
import { noteLogout } from "./notes";

//ACCION ASINCRONA que dispara una accion cuando se resuelve la tarea asincrona
//ESTA FUNCION REGESA UN CALLBACK, QUE VA A EJECUTAR EL DISPATCH, Y EL DISPATCH VA A EJECUTAR LA ACCION LOGIN DESPUES DE 3SEGUNDOS
export const startLoginEmailPassword = (email, password) => {
  return (dispatch) => {
    dispatch(startLoading());

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
        dispatch(finishLoading());
      })
      .catch((e) => {
        // console.log(e);
        dispatch(finishLoading());
        Swal.fire("Error", e.message, "error");
      });
  };
};
//ACCION ASINCRONA PARA DAR DE ALTA A UN USUUARIO CUNADO SE QUIERA REGISTAR
export const startRegisterWithEmailPasswordName = (email, password, name) => {
  return (dispatch) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        await user.updateProfile({ displayName: name });
        // console.log(user);
        dispatch(login(user.uid, user.displayName)); //SE DISPARA LA ACCION DEL LOGIN
      })
      .catch((e) => {
        // console.log(e);
        Swal.fire("Error", e.message, "error");
      });
  };
};

export const startGoogleLogin = () => {
  return (dispatch) => {
    firebase
      .auth()
      .signInWithPopup(googleAuthProvider)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
        // console.log(userCred);
      });
  };
};

//ESTA ES NUESTRA ACCION DEL LOGIN, RECIBE COMO PARAMETRO EL uid y el displayName
export const login = (uid, displayName) => {
  return {
    type: types.login, //retorna el tipado de los types
    payload: {
      //Y el payload que es un objeto que contiene el uid y el displayName
      uid,
      displayName,
    },
  };
};

//ACCIONES PARA CERRAR SECION
export const startLogout = () => {
  return async (dispatch) => {
    await firebase.auth().signOut();

    dispatch(logout());
    dispatch(noteLogout());

  };
};

export const logout = () => ({
  type: types.logout,
});
