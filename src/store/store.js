import { createStore, combineReducers, applyMiddleware, compose } from "redux"; //IMPORTAR applyMiddleware para tareas asincronas
import { authReducer } from "../reducers/authReducer";
import thunk from "redux-thunk"; //IMPORTAR THUNK PARA TAREAS ASINCRONAS
import { uiReducer } from "../reducers/uiReducer";
import { notesReducer } from "../reducers/notesReducer";

//Facilmente se podria poner nuestro reducer en el createStore()
//Pero este solo acepta un reducer y si llegamos a tener mas de uno,
//lo que se debe de hacer es combinar los reducers en una constate, asi ....

//Para tareas asincronas
const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;


//DESPUES DE QUE MI REDUCER YA SE ENCUNTRA EN EL STORE, LO QUE SIGUE ES CREAR LAS ACCIONES EN LA CARPETA ACTIONS
const reducers = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  notes: notesReducer
});

export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk)) //APLICAR EL MIDLEWARE SOLO CUNADO HAY TAREAS ASINCRONAS
);
