import React from "react";
import { useForm } from "react-hook-form";
import CommonInput from "./common/commonInput";
import CommonSelect from "./common/CommonSelect";
import CommonButton from "./common/CommonButton";
import CommonError from "./common/CommonError";

export default function TaskForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { status: "Pending" },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Create Task</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CommonInput
          label="Task Title"
          name="title"
          register={register}
          rules={{ required: "Task Title is required" }}
          error={errors.title}
        />

        <div className="mb-4">
          <label className="block mb-1 font-medium">Task Description</label>
          <textarea
            {...register("description", {
              required: "Description is required",
              minLength: { value: 20, message: "Minimum 20 characters required" },
            })}
            className="w-full border p-2 rounded"
          />
          <CommonError error={errors.description} />
        </div>

        <CommonSelect
          label="Task Type"
          name="type"
          register={register}
          options={["React", "Redux", "Hooks", "API Integration"]}
          rules={{ required: "Task Type is required" }}
          error={errors.type}
        />

        <CommonInput
          label="Deadline"
          type="date"
          name="deadline"
          register={register}
        />

        <div className="mb-4">
          <label className="block mb-1 font-medium">Priority</label>
          <div className="flex gap-4">
            {["Low", "Medium", "High"].map((level) => (
              <label key={level}>
                <input type="radio" value={level} {...register("priority")} />
                <span className="ml-1">{level}</span>
              </label>
            ))}
          </div>
        </div>

        <input type="hidden" {...register("status")} />

        <CommonButton label="Submit" />
      </form>
    </div>
  );
}
