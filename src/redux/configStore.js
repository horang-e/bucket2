import { combineReducers, createStore } from "redux";
import bucket from "./modules/bucket";
import { composeWithDevTools } from 'redux-devtools-extension';
// root 리듀서를 만들어줍니다.

const rootReducer = combineReducers({ bucket });
// 스토어를 만듭니다.
const store = createStore(rootReducer, composeWithDevTools());
export default store;