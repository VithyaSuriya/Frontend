import React from "react";
import CommonError from "./CommonError";

export default function CommonInput({ label, type = "text", name, register, rules, error }) {
  return (
    <div className="mb-4">
      <label className="block mb-1 font-medium">{label}</label>
      <input
        type={type}
        {...register(name, rules)}
        className="w-full border p-2 rounded"
      />
      <CommonError error={error} />
    </div>
  );
}
