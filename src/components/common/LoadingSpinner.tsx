import React from "react";
import { LuLoader } from "react-icons/lu";

interface LoadingSpinnerProps {
  className?: string;
  size?: number;
  minHeight?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  className = "", 
  size = 32,
  minHeight = "400px"
}) => {
  return (
    <div className={`flex items-center justify-center ${className}`} style={{ minHeight }}>
      <LuLoader 
        className="animate-spin text-brand-500" 
        style={{ width: size, height: size }} 
      />
    </div>
  );
};

export default LoadingSpinner;
