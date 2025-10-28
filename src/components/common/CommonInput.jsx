import React from "react";

export default function CommonInput({
  label,
  type = "text",
  register,
  name,
  placeholder,
  error,
}) {
  return (
    <div>
      <label className="block font-medium ">
        {label}
        <span className="text-red-500 ml-1">*</span>
      </label>
      <input
        type={type}
        {...register(name)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-gray-200 bg-white/70 backdrop-blur-sm px-4 py-3 text-gray-800 
shadow-[0_2px_6px_rgba(0,0,0,0.05)] placeholder:text-gray-400 
focus:outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 
transition-all duration-300 ease-in-out hover:border-indigo-300 hover:shadow-[0_3px_8px_rgba(99,102,241,0.15)]"


      />
    </div>
  );
}
