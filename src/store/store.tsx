import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from "./reducers/reducers";

const sagaMiddleware = createSagaMiddleware();
export default createStore(reducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));
