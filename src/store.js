import {applyMiddleware, createStore} from 'redux';
import thunkMiddleware from "redux-thunk";
import rootReducer from './reducers';


const logMiddleware = ({ getState }) => (next) => (action) => {
    console.log(`%cACTION: ${action.type}`, "color:cyan", getState());
    if (action.type.toLowerCase().includes("error")) {
        console.error(`ACTION_ERROR: ${action.payload}`);
    }
    return next(action);
}

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, logMiddleware));

export default store;