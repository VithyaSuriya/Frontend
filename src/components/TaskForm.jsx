import React from "react";
import { useForm } from "react-hook-form";

export default function TaskForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      status: "Pending",
    },
  });
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Create Task</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block mb-1">Task Title</label>
          <input
            type="text"
            {...register("title", { required: "Task Title is required" })}
            className="w-full border p-2 rounded"
          />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-1">Task Description</label>
          <textarea
            {...register("description", {
              required: "Description is required",
              minLength: {
                value: 20,
                message: "Minimum 20 characters required",
              },
            })}
            className="w-full border p-2 rounded"
          />
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-1">Task Type</label>
          <select
            {...register("type", { required: "Task Type is required" })}
            className="w-full border p-2 rounded"
          >
            <option value="">Select Type</option>
            <option value="React">React</option>
            <option value="Redux">Redux</option>
            <option value="Hooks">Hooks</option>
            <option value="API Integration">API Integration</option>
          </select>
          {errors.type && <p className="text-red-500">{errors.type.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block mb-1">DeadLine</label>
          <input
            type="date"
            {...register("deadline")}
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Priority</label>
          <div className="flex gap-4">
            <label>
              <input type="radio" value="Low" {...register("priority")} />
              Low
            </label>
            <label>
              <input type="radio" value="Medium" {...register("priority")} />
              Medium
            </label>
            <label>
              <input type="radio" value="High" {...register("priority")} />
              High
            </label>
          </div>
        </div>

        <input type="hidden" {...register("status")} />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
