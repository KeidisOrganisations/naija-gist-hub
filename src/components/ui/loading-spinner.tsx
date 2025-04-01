
import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  size?: number;
  className?: string;
  text?: string;
}

export function LoadingSpinner({ size = 24, className = "", text }: LoadingSpinnerProps) {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <Loader2 className={`h-${size} w-${size} animate-spin text-naija-green`} />
      {text && <p className="mt-2 text-sm text-gray-500">{text}</p>}
    </div>
  );
}
