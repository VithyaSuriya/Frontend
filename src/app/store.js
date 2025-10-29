import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "../components/tasks/taskSlice"
export const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
});
