import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import bucket from "./modules/bucket";
//리덕스 데브 툴쓰는거야
import { composeWithDevTools } from 'redux-devtools-extension';
// root 리듀서를 만들어줍니다.
const middlewares = [thunk];

const enhancer = composeWithDevTools(applyMiddleware(...middlewares));
const rootReducer = combineReducers({ bucket });
// 스토어를 만듭니다.
const store = createStore(rootReducer,enhancer);
export default store;