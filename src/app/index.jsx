import { combineReducers } from "@reduxjs/toolkit";
import taskReducer from "../components/tasks/taskSlice";

 export const rootReducer = combineReducers({
  tasks: taskReducer,
});
