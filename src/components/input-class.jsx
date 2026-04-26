import React from "react";

const inputClass = (error, disabled = false) =>
  [
    "w-full px-3 py-2.5 border rounded-md text-sm outline-none transition-colors",
    error ? "border-red-400" : "border-gray-300",
    disabled
      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
      : "bg-white focus:ring-2 focus:ring-green-600 focus:border-green-600",
  ].join(" ");

export default inputClass;
