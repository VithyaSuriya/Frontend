import React from "react";

export default function CommonPriority({ label, name, register, errors }) {
  const levels = ["Low", "Medium", "High"];

  return (
    <div>
      <label className="block font-semibold text-black mb-2">
        {label}
        <span className="text-red-500 ml-1">*</span>
      </label>
      <div className="flex gap-4 mt-3">
        {levels.map((level) => (
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
            <input type="radio" value={level} {...register(name)} />
            <span className="font-medium">{level}</span>
          </label>
        ))}
      </div>
      {errors[name] && (
        <p className="text-red-500 text-sm">{errors[name]?.message}</p>
      )}
    </div>
  );
}
