import React from "react";
export default function CommonButton({
  label,
  type = "button",
  disabled,
  onClick,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
     className={`w-full py-3 rounded-xl text-white font-semibold tracking-wide shadow-sm transition-all duration-300
  ${
    disabled
      ? "bg-gray-400 cursor-not-allowed opacity-70"
      : "bg-[linear-gradient(to_right,#2563eb,#1d4ed8)] hover:bg-[linear-gradient(to_right,#1e40af,#1e3a8a)] hover:shadow-md active:scale-95"
  }`}

    >
      {label}
    </button>
  );
}
