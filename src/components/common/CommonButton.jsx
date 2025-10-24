import React from "react";

export default function CommonButton({ label, type = "submit" }) {
  return (
    <button
      type={type}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      {label}
    </button>
  );
}
