import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Toaster } from "react-hot-toast";
import TaskForm from "./components/TaskForm";

function App() {
  return (
    <div className="App">
      <TaskForm />

      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}

export default App;
