import { createSlice } from "@reduxjs/toolkit";
import { fetchTasks } from "./taskThunks";

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    list: [],
    loading: false,
    error: null,
    editingTask: null,
    userField: "",
  },
  reducers: {
    addTask: (state, action) => {
      const newTask = { ...action.payload, id: Date.now() };
      state.list.push(newTask);
    },
    deleteTask: (state, action) => {
      state.list = state.list.filter((task) => task.id !== action.payload);
    },
    setEditingTask: (state, action) => {
      state.editingTask = action.payload;
    },
    updateTask: (state, action) => {
      const { id, updatedData } = action.payload;
      const existingTask = state.list.find((task) => task.id === id);
      if (existingTask) {
        Object.assign(existingTask, updatedData);
      }
    },
    setUserField: (state, action) => {
      state.userField = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addTask, deleteTask, updateTask, setEditingTask, setUserField } =
  taskSlice.actions;
export default taskSlice.reducer;
