import React from "react";

const inputClass = (error) =>
  `w-full px-3 py-2.5 border rounded-md text-sm outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 transition-colors bg-white ${
    error ? "border-red-400" : "border-gray-300"
  }`;

export default inputClass;
