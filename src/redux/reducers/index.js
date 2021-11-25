import { combineReducers } from "redux";
import todoReducer from "./todo";
import authReducer from "./auth";

const rootReducer = combineReducers({
  todoReducer,
  authReducer
});

export default rootReducer;