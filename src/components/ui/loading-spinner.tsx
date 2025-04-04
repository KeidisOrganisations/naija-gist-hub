
import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  size?: number | "sm" | "md" | "lg";
  className?: string;
  text?: string;
}

export function LoadingSpinner({ size = 24, className = "", text }: LoadingSpinnerProps) {
  // Convert string size values to numbers
  let sizeValue = size;
  if (size === "sm") sizeValue = 16;
  if (size === "md") sizeValue = 24;
  if (size === "lg") sizeValue = 32;
  
  // Ensure sizeValue is a number for the h-${size} w-${size} classes
  const numericSize = typeof sizeValue === 'number' ? sizeValue : 24;
  
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <Loader2 className={`h-${numericSize} w-${numericSize} animate-spin text-naija-green`} />
      {text && <p className="mt-2 text-sm text-gray-500">{text}</p>}
    </div>
  );
}
