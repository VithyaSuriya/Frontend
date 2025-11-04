import React from "react";
import CommonInput from "./CommonInput";
import CommonButton from "./CommonButton";
import { CiCircleMinus } from "react-icons/ci"; // ✅ valid icon

export default function CommonDynamicField({
  fields,
  append,
  remove,
  register,
  errors,
  selectedType,
}) {
  return (
    <div>
      {/* Label changes dynamically */}
      <label className="block text-sm font-semibold mb-3 text-gray-700">
        {selectedType === "Frontend Task"
          ? "Frontend Details"
          : "Backend Details"}
      </label>

      <div className="space-y-3">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex flex-col sm:flex-row items-center gap-3 bg-gray-50/70 p-3 rounded-xl border border-gray-200"
          >
            <CommonInput
              label={`Field ${index + 1}`}
              name={`tags.${index}.name`}
              placeholder={
                selectedType === "Frontend Task"
                  ? "Enter UI component name or task"
                  : "Enter API or DB work details"
              }
              register={register}
              errors={errors}
            />

            {/* Remove button */}
            {fields.length > 1 && (
              <button
                type="button"
                onClick={() => remove(index)}
                title="Remove Field"
                className="text-rose-500 hover:text-rose-600 transition-all"
              >
                <CiCircleMinus size={26} />
              </button>
            )}
          </div>
        ))}

        {/* Add button */}
        <CommonButton
          type="button"
          label={`+ Add ${
            selectedType === "Frontend Task" ? "Frontend" : "Backend"
          } Field`}
          onClick={() => append({ name: "" })}
          className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 mt-2"
        />
      </div>
    </div>
  );
}
