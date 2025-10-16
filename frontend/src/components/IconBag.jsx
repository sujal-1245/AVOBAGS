import React from "react";

export default function IconBag({ className = "w-5 h-5" }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 8h14l-1 12H6L5 8z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 8V6a3 3 0 116 0v2"
      />
    </svg>
  );
}
