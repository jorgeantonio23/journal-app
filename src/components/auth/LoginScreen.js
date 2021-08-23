import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { startGoogleLogin, startLoginEmailPassword } from "../../actions/auth";
import { useForm } from "../hooks/useForm";

export const LoginScreen = () => {
  
  const dispatch = useDispatch(); // useDispatch nos permite disparar acciones en Redux
  const {loading} = useSelector(state => state.ui)

  const [formValues, handleInputChange] = useForm({
    email: "nando@gamil.com",
    password: "123456",
  });

  const { email, password } = formValues;
  // console.log(email, password)

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(startLoginEmailPassword(email, password)); //Dispacth se va a disparar cuando nosotros demos click en el boton del formulario, y lo que hara
    // console.log(email, password); //Es cambiar nuestro estado del uid, y displayName  a los argumentos que nosotros le mandamos
  };

  const handleGoogleLogin = () => {
    dispatch(startGoogleLogin());
  };

  return (
    <div>
      <h3 className="auth__title">Login</h3>

      <form onSubmit={handleLogin}>
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
          placeholder="password"
          name="password"
          value={password}
          onChange={handleInputChange}
        />

        <button disabled={loading} className="btn btn-primary btn-block" type="submit">
          Login
        </button>
        <hr></hr>

        <div className="auth__social-networks">
          <p>Login with social networks</p>

          <div className="google-btn" onClick={handleGoogleLogin}>
            <div className="google-icon-wrapper">
              <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="google button"
              />
            </div>
            <p className="btn-text">
              <b>Sign in with google</b>
            </p>
          </div>
        </div>

        <Link className="link" to="/auth/register">
          Create new account
        </Link>
      </form>
    </div>
  );
};
