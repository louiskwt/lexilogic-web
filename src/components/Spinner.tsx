import React from "react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary" | "white";
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({size = "md", color = "primary"}) => {
  const sizeClass = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  const colorClass = {
    primary: "border-blue-500",
    secondary: "border-gray-500",
    white: "border-white",
  };

  return (
    <div className="flex items-center justify-center">
      <div className={`animate-spin rounded-full border-4 ${sizeClass[size]} ${colorClass[color]}`}></div>
    </div>
  );
};

export default LoadingSpinner;
