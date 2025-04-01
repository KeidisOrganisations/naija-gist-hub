
import { useState, useEffect } from 'react';
import { initializeStorage } from '@/services/storage-service';
import { LoadingSpinner } from './loading-spinner';

export function InitializeStorageLoader() {
  const [isInitializing, setIsInitializing] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initialize = async () => {
      try {
        const success = await initializeStorage();
        setIsSuccess(success);
        if (!success) {
          setError('Storage initialization failed. Some features may be limited.');
        }
      } catch (err) {
        setError('An unexpected error occurred during storage initialization.');
        console.error(err);
      } finally {
        setIsInitializing(false);
      }
    };

    initialize();
  }, []);

  if (!isInitializing && isSuccess) {
    return null; // Don't render anything if initialization was successful
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg z-50 max-w-xs">
      {isInitializing ? (
        <div className="flex flex-col items-center">
          <LoadingSpinner size={6} />
          <p className="mt-2 text-sm">Initializing storage...</p>
        </div>
      ) : error ? (
        <div className="text-red-500 text-sm">{error}</div>
      ) : null}
    </div>
  );
}
