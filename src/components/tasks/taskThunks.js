import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  return [
    { id: 1, title: "Frontend Integration" },
    { id: 2, title: "Backend API Setup" },
  ];
});
