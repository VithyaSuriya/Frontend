import React from "react";

export default function CommonError({ error }) {
  return (
    error && <p className="text-red-500 text-sm mt-1">{error.message}</p>
  );
}
