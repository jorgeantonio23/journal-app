import React from "react";
import { Link } from "react-router-dom";
import validator from "validator"; //importacion para la validacion de formulario
import { removeError, setError } from "../../actions/ui";
import { useDispatch, useSelector } from "react-redux";

import { useForm } from "../hooks/useForm";
import { startRegisterWithEmailPasswordName } from "../../actions/auth";

export const RegisterScreen = () => {
  //PARA OBTENER LOS DATOS QUE SE INGREASRON A LOS INPUTS

  //1.- llamamos a una constante a [formValues y handleInputChange] = useForm()
  //dentro de nuestro useForm se crea un objeto que tendra valores predeterminados de name, email, password, password2
  const [formValues, handleInputChange] = useForm({
    name: "Hernando",
    email: "nando@gmail.com",
    password: "123456",
    password2: "123456",
  });

  //2.-Desestructuramos el name, email, password, password2 de formValues
  const { name, email, password, password2 } = formValues;

  //3.-Los valores obtenidos se pondran en cada uno de los inputs correspondientes value={} y el onChange={handleInputChange}

  //4.-Crear la funcion handleRegister
  const handleRegister = (e) => {
    e.preventDefault();
  //  console .log(name, email, password, password2);

    //validaciones en el formulario
    if (isFormavilid()) {
     dispatch(startRegisterWithEmailPasswordName(email,password,name))
      // console.log("Formulario Correcto");
    }
  };

  //YA QUE TENEMOS LAS ACCIONES AHORA TENEMOS QUE HACER EL DISPATCH DE ESAS ACCIONES

  const dispatch = useDispatch();
  //Obtener informacion del state y poder ocuparla en donde queramos
  const state = useSelector(state => state);
  // console.log(state)

  const { ui } = state;
  // console.log(ui.msgError)

  const isFormavilid = () => {
    if (name.trim().length === 0) {
      dispatch(setError("Name is required"));
      return false;
    } else if (!validator.isEmail(email)) {
      //si no es email entonces..
      dispatch(setError("Email is not valid"));
      return false;
    } else if (password !== password2 || password.length < 5) {
      dispatch(setError("Password should be at least 6 characters and match"));
      return false;
    }

    dispatch(removeError())
    return true;
  };

   

  return (
    <div>
      <h3 className="auth__title">Register</h3>

      <form onSubmit={handleRegister}>
        {ui.msgError && <div className="auth__alert-error">{ ui.msgError }</div>}
        <input
          className="auth__input"
          autoComplete="off"
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          onChange={handleInputChange}
        />

        <input
          className="auth__input"
          autoComplete="off"
          type="text"
          placeholder="Email"
          name="email"
          value={email}
          onChange={handleInputChange}
        />
        <input
          className="auth__input"
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={handleInputChange}
        />

        <input
          className="auth__input"
          type="password"
          placeholder="Confirm Password"
          name="password2"
          value={password2}
          onChange={handleInputChange}
        />

        <button className=" mb-5 btn btn-primary btn-block" type="submit">
          Register
        </button>
        <hr></hr>

        <Link className="link" to="/auth/login">
          Already registered?
        </Link>
      </form>
    </div>
  );
};
