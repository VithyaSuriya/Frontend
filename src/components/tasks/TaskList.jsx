import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, updateTask } from "./taskSlice";
import { FaEdit, FaTrashAlt, FaSave, FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";
import { fetchTasks } from "./taskThunks";

export default function TaskList() {
  const { list } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ title: "", description: "" });
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleEdit = (task) => {
    setEditingId(task.id);
    setEditData({ title: task.title, description: task.description });
  };

  const handleSave = (id) => {
    if (!editData.title.trim() || !editData.description.trim()) {
      toast.error("Please fill in both fields");
      return;
    }
    dispatch(updateTask({ id, ...editData }));
    setEditingId(null);
    toast.success("Task updated successfully!");
  };

  const handleCancel = () => setEditingId(null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[linear-gradient(135deg,#e0e7ff,#cffafe)] py-10 px-4">
      <div className="w-full max-w-3xl bg-white/60 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/40 p-8 transition-transform duration-300 hover:scale-[1.01] hover:shadow-indigo-200">
        {/* Title */}
        <h2 className="text-3xl font-extrabold mb-8 text-center bg-black bg-clip-text text-transparent tracking-tight drop-shadow-sm">
          Task List{" "}
        </h2>

        {list.length === 0 ? (
          <p className="text-gray-600 text-center italic">
            No tasks added yet.
          </p>
        ) : (
          <div className="space-y-5">
            {list.map((task) => (
              <div
                key={task.id}
                className="bg-white/80 shadow-md rounded-2xl p-5 border border-gray-200 transition-all duration-300 hover:shadow-indigo-100"
              >
                {editingId === task.id ? (
                  <>
                    <input
                      type="text"
                      value={editData.title}
                      onChange={(e) =>
                        setEditData({ ...editData, title: e.target.value })
                      }
                      className="border border-gray-300 rounded-xl p-2 w-full mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                      placeholder="Edit task title"
                    />
                    <textarea
                      value={editData.description}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          description: e.target.value,
                        })
                      }
                      className="border border-gray-300 rounded-xl p-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-300"
                      placeholder="Edit description"
                      rows={3}
                    />
                    <div className="flex gap-3 mt-3">
                      <button
                        onClick={() => handleSave(task.id)}
                        className="bg-indigo-500 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-indigo-600 transition-all"
                      >
                        <FaSave /> Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="bg-gray-400 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-gray-500 transition-all"
                      >
                        <FaTimes /> Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800">
                        {task.title}
                      </h3>
                      <p className="text-gray-600 mt-1">{task.description}</p>
                    </div>
                    <div className="flex gap-4 mt-4 sm:mt-0">
                      <button
                        onClick={() => handleEdit(task)}
                        className="text-indigo-500 hover:text-indigo-700 transition-all"
                        title="Edit Task"
                      >
                        <FaEdit size={18} />
                      </button>
                      <button
                        onClick={() => {
                          dispatch(deleteTask(task.id));
                          toast.success("Task deleted!");
                        }}
                        className="text-red-500 hover:text-red-700 transition-all"
                        title="Delete Task"
                      >
                        <FaTrashAlt size={18} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
