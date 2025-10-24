import React from "react";
import CommonError from "./CommonError";

export default function CommonSelect({ label, name, register, options, rules, error }) {
  return (
    <div className="mb-4">
      <label className="block mb-1 font-medium">{label}</label>
      <select {...register(name, rules)} className="w-full border p-2 rounded">
        <option value="">Select</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <CommonError error={error} />
    </div>
  );
}
