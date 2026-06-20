"use client";

import { Toaster } from "react-hot-toast";

export const ToasterProvider = () => {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        // Default options for all toasts
        duration: 4000,
        className: "dark:bg-gray-800 dark:text-white dark:border-gray-700",
        style: {
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          color: "#0f172a",
          borderRadius: "16px",
          border: "2px solid #0f172a", // Bold border as per enterprise aesthetic
          padding: "16px 24px",
          fontSize: "14px",
          fontWeight: "700",
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        },
        success: {
          style: {
            border: "2px solid #10b981",
            background: "#f0fdf4",
            color: "#10b981",
          },
        },
        error: {
          style: {
            border: "2px solid #ef4444",
            background: "#fef2f2",
            color: "#ef4444",
          },
        },
      }}
      containerStyle={{
        zIndex: 100000,
        top: 40,
      }}
    />
  );
};

// Dark mode support (Injected via global CSS or handled here)
// For now, let's keep it simple and clean.
