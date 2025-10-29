import React from "react";

export default function CommonTextArea({ label, name, register, errors, placeholder, rows = 3 }) {
  return (
    <div>
      <label className="block font-semibold text-black mb-2">
        {label}
        <span className="text-red-500 ml-1">*</span>
      </label>
      <textarea
        {...register(name)}
        placeholder={placeholder}
        rows={rows}
        className="w-full rounded-2xl border border-gray-200 bg-white/70 backdrop-blur-sm px-4 py-3 text-gray-800 
focus:outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 
placeholder:text-gray-400 shadow-[0_2px_6px_rgba(0,0,0,0.05)] transition-all duration-300 ease-in-out 
hover:border-indigo-300 hover:shadow-[0_3px_8px_rgba(99,102,241,0.15)] resize-none"
      />
      {errors[name] && (
        <p className="text-red-500 text-sm">{errors[name]?.message}</p>
      )}
    </div>
  );
}
