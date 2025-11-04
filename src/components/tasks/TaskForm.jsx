import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { formSchema } from "../../Validations/FormSchema";
import CommonInput from "../common/CommonInput";
import CommonSelect from "../common/CommonSelect";
import CommonButton from "../common/CommonButton";
import toast from "react-hot-toast";
import { addTask } from "./taskSlice";
import CommonTextArea from "../common/CommonTextArea";
import CommonPriority from "../common/CommonPriority";
import { useDispatch, useSelector } from "react-redux";
import CommonDynamicField from "../common/CommonDynamicField";
export default function TaskForm() {
  const dispatch = useDispatch();
  const { editTask } = useSelector((state) => state.tasks);
  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: { tags: [{ name: "" }] },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "tags" });
  const selectedType = watch("type");

  if (editTask && !watch("title")) {
    Object.keys(editTask).forEach((key) => setValue(key, editTask[key]));
  }

  const onSubmit = async (data) => {
    try {
      if (editTask) {
        dispatch(updateTask({ id: editTask.id, updatedData: data }));
        toast.success("Task updated successfully!");
      } else {
        dispatch(addTask(data));
        toast.success("Task added successfully!");
      }
      reset();
    } catch (error) {
      toast.error("Something went wrong. Please try again!");
    }
  };

  const onError = (errors) => {
    console.log("Validation Errors:", errors);
    toast.error("Please fill all required fields correctly!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[linear-gradient(135deg,#e0e7ff,#cffafe)] py-10 px-4">
      <div className="w-full max-w-2xl bg-white/60 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/40 p-10 transition-transform duration-300 hover:scale-[1.01] hover:shadow-indigo-200">
        {/* Title */}
        <h2 className="text-3xl font-extrabold mb-8 text-center bg-black bg-clip-text text-transparent tracking-tight drop-shadow-sm">
          Manage Tasks using Redux Toolkit
        </h2>

        <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-8">
          {/* Task Title */}
          <div>
            <CommonInput
              label="Task Title"
              name="title"
              placeholder="Enter task title"
              register={register}
              errors={errors}
            />
          </div>

          {/* Description */}
          <CommonTextArea
            label="Description"
            name="description"
            placeholder="Enter description (Min 20 characters)"
            register={register}
            errors={errors}
          />

          {/* Type */}
          <CommonSelect
            label="Task Type"
            name="type"
            register={register}
            options={["API Integration", "Frontend Task", "Backend Task"]}
            errors={errors}
          />

          {/* API Endpoint */}
          {selectedType === "API Integration" && (
            <div>
              <CommonInput
                label="API Endpoint"
                name="apiEndpoint"
                placeholder="https://example.com/api"
                register={register}
                errors={errors}
              />
            </div>
          )}
          {/* Dynamic User Fields */}
          {["Frontend Task", "Backend Task"].includes(selectedType) && (
            <CommonDynamicField
              fields={fields}
              append={append}
              remove={remove}
              register={register}
              errors={errors}
              selectedType={selectedType}
            />
          )}

          {/* Deadline */}
          <div>
            <CommonInput
              label="Deadline"
              type="date"
              name="deadline"
              register={register}
              errors={errors}
            />
          </div>
          

          {/* Priority */}
          <CommonPriority
            label="Priority"
            name="priority"
            register={register}
            errors={errors}
          />

          {/* Email */}
          <div>
            <CommonInput
              label="Email"
              type="email"
              name="email"
              placeholder="example@email.com"
              register={register}
              errors={errors}
            />
          </div>

          {/* Submit */}
          <div className="text-center">
            <CommonButton
              label={isSubmitting ? "Submitting..." : "Submit Task"}
              type="submit"
              disabled={isSubmitting}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
