import React from "react";
import { Toaster } from "react-hot-toast";
import TaskForm from "./components/tasks/TaskForm";
import TaskList from "./components/tasks/TaskList";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row items-start justify-center bg-[linear-gradient(135deg,#e0e7ff,#cffafe)] py-10 px-6 gap-8">
      <div className="w-full md:w-1/2 bg-white/60 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/40 p-8">
        <TaskForm />
      </div>

      <div className="w-full md:w-1/2 bg-white/60 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/40 p-8">
        <TaskList />
      </div>

      <Toaster position="top-right" />
    </div>
  );
}
