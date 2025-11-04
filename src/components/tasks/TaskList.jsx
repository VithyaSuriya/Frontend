import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateTask, deleteTask } from "../tasks/taskSlice";
import { fetchTasks } from "../tasks/taskThunks";
import toast from "react-hot-toast";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks.list || []);
  const dispatch = useDispatch();

  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    description: "",
    deadline: "",
    priority: "",
  });

  //  Fetch backend tasks on load
  useEffect(() => {
  if (!tasks || tasks.length === 0) {
    dispatch(fetchTasks());
  }
}, [dispatch, tasks]);


  // Handle edit
  const handleEdit = (task) => {
    setEditingId(task.id);
    setEditData({
      title: task.title,
      description: task.description,
      deadline: task.deadline
        ? new Date(task.deadline).toISOString().split("T")[0]
        : "",
      priority: task.priority,
    });
  };

  //  Handle save
  const handleSave = (id) => {
    if (!editData.title.trim() || !editData.description.trim()) {
      toast.error("Please fill in title and description");
      return;
    }

    const formattedData = {
      ...editData,
      deadline: editData.deadline
        ? new Date(editData.deadline).toISOString()
        : "",
    };

    dispatch(updateTask({ id, updatedData: formattedData }));
    setEditingId(null);
    toast.success("Task updated successfully!");
  };

  // Handle delete
  const handleDelete = (id) => {
    dispatch(deleteTask(id));
    toast.success("Task deleted!");
  };

  //  Handle Enter key
  const handleKeyPress = (e, id) => {
    if (e.key === "Enter" && e.target.tagName !== "TEXTAREA") {
      e.preventDefault();
      handleSave(id);
    }
  };

  return (
    <div className="w-full mt-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">
        Task List
      </h2>

      {tasks.length === 0 ? (
        <p className="text-gray-500 text-center italic">No tasks added yet.</p>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="border border-gray-300 rounded-xl p-4 shadow-sm bg-white hover:shadow-md transition-all"
            >
              {editingId === task.id ? (
                <form
                  className="space-y-3"
                  onKeyDown={(e) => handleKeyPress(e, task.id)}
                  onSubmit={(e) => e.preventDefault()}
                >
                  <input
                    type="text"
                    value={editData.title}
                    onChange={(e) =>
                      setEditData({ ...editData, title: e.target.value })
                    }
                    placeholder="Task Title"
                    className="border border-gray-300 rounded-xl p-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    autoFocus
                  />

                  <textarea
                    value={editData.description}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        description: e.target.value,
                      })
                    }
                    placeholder="Task Description"
                    className="border border-gray-300 rounded-xl p-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    rows="3"
                  />

                  <input
                    type="date"
                    value={editData.deadline}
                    onChange={(e) =>
                      setEditData({ ...editData, deadline: e.target.value })
                    }
                    className="border border-gray-300 rounded-xl p-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  />

                  <select
                    value={editData.priority}
                    onChange={(e) =>
                      setEditData({ ...editData, priority: e.target.value })
                    }
                    className="border border-gray-300 rounded-xl p-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  >
                    <option value="">Select Priority</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => handleSave(task.id)}
                      className="bg-indigo-500 text-white px-4 py-2 rounded-xl hover:bg-indigo-600 transition-all"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingId(null)}
                      className="bg-gray-400 text-white px-4 py-2 rounded-xl hover:bg-gray-500 transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                // 🟢 Display Mode
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {task.title}
                  </h3>
                  <p className="text-gray-700 mt-1">{task.description}</p>

                  {task.deadline && (
                    <p className="text-sm text-gray-500 mt-1">
                      <span className="font-semibold">Deadline:</span>{" "}
                      {new Date(task.deadline).toLocaleDateString("en-IN")}
                    </p>
                  )}

                  {task.priority && (
                    <p className="text-sm text-gray-500">
                      <span className="font-semibold">Priority:</span>{" "}
                      {task.priority}
                    </p>
                  )}

                  <div className="flex gap-3 mt-3">
                    <button
                      onClick={() => handleEdit(task)}
                      className="bg-yellow-400 text-white p-3 rounded-full hover:bg-yellow-500 hover:scale-110 shadow-md hover:shadow-lg transition-all duration-200"
                      title="Edit Task"
                    >
                      <FaRegEdit size={20} />
                    </button>

                    <button
                      onClick={() => handleDelete(task.id)}
                      className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 hover:scale-110 shadow-md hover:shadow-lg transition-all duration-200"
                      title="Delete Task"
                    >
                      <MdDelete size={20} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
