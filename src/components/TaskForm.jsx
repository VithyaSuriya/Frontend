import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { formSchema } from "../Validations/FormSchema";
import CommonInput from "./common/CommonInput";
import CommonSelect from "./common/CommonSelect";
import CommonButton from "./common/CommonButton";
import toast from "react-hot-toast";
export default function TaskForm() {
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

  const onSubmit = async (data) => {
    try {
      console.log("Form Data:", data);
      await new Promise((res) => setTimeout(res, 800));
      toast.success("Task submitted successfully!");
      reset();
    } catch (error) {
      toast.error("Something went wrong.Please try again!");
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
        <h2 className="text-4xl font-extrabold mb-8 text-center bg-black bg-clip-text text-transparent tracking-tight drop-shadow-sm">
          Task Information Form
        </h2>

        <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-8">
          {/* Task Title */}
          <div>
            <CommonInput
              label="Task Title"
              name="title"
              placeholder="Enter task title"
              register={register}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block font-semibold text-black mb-2">
              Description
              <span className="text-red-500 ml-1">*</span>
            </label>
            <textarea
              {...register("description")}
              placeholder="Enter description (Min 20 characters)"
              className="w-full rounded-2xl border border-gray-200 bg-white/70 backdrop-blur-sm px-4 py-3 text-gray-800 
focus:outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 
placeholder:text-gray-400 shadow-[0_2px_6px_rgba(0,0,0,0.05)] transition-all duration-300 ease-in-out 
hover:border-indigo-300 hover:shadow-[0_3px_8px_rgba(99,102,241,0.15)] resize-none"
              rows={3}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Type */}
          <CommonSelect
            label="Task Type"
            name="type"
            register={register}
            options={["API Integration", "Frontend Task", "Backend Task"]}
          />
          {errors.type && (
            <p className="text-red-500 text-sm">{errors.type.message}</p>
          )}

          {/* API Endpoint */}
          {selectedType === "API Integration" && (
            <div>
              <CommonInput
                label="API Endpoint"
                name="apiEndpoint"
                placeholder="https://example.com/api"
                register={register}
              />
            </div>
          )}

          {/* Deadline */}
          <div>
            <CommonInput
              label="Deadline"
              type="date"
              name="deadline"
              register={register}
            />
            {errors.deadline && (
              <p className="text-red-500 text-sm">{errors.deadline.message}</p>
            )}
          </div>

          {/* Priority */}
          <div>
            <label className="block font-semibold text-black mb-2">
              Priority
              <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="flex gap-4 mt-3">
              {["Low", "Medium", "High"].map((level) => (
                <label
                  key={level}
                  className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl border 
text-sm font-medium transition-all duration-300 ease-in-out cursor-pointer select-none 
shadow-sm hover:shadow-md backdrop-blur-sm
${
  level === "High"
    ? "border-gray-300 bg-gradient-to-r from-rose-50 to-rose-100 hover:from-rose-100 hover:to-rose-200 focus:ring-2 focus:ring-rose-300 focus:border-rose-400"
    : level === "Medium"
    ? "border-gray-300 bg-gradient-to-r from-amber-50 to-amber-100 hover:from-amber-100 hover:to-amber-200 focus:ring-2 focus:ring-amber-300 focus:border-amber-400"
    : "border-gray-300 bg-gradient-to-r from-emerald-50 to-emerald-100 hover:from-emerald-100 hover:to-emerald-200 focus:ring-2 focus:ring-emerald-300 focus:border-emerald-400"
}`}
                >
                  <input type="radio" value={level} {...register("priority")} />
                  <span className="font-medium">{level}</span>
                </label>
              ))}
            </div>
            {errors.priority && (
              <p className="text-red-500 text-sm">{errors.priority.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <CommonInput
              label="Email"
              type="email"
              name="email"
              placeholder="example@email.com"
              register={register}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
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
