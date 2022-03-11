import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { eventsReducer } from "./eventsReducer";
import { uiReducer } from "./uiReducer";

/* Todos los reducers de mis aplicación que conformar mi store de REDUX. Cada uno de
ellos tendrá sus propias acciones vinculadas a unos types. Las cuales, pueden ser
disparadas a través de los dispatchers. Estos se pueden utilizar en cualquier parte
de nuestra aplicación gracias a REDUX. 
A su vez, cada Reducer genera un state dentro del state de REDUX. A los cuales, accedemos
a través de useSelector(state => state.{nombre_state}) */
export const rootReducer = combineReducers({
    ui: uiReducer,
    events: eventsReducer,
    auth: authReducer
})